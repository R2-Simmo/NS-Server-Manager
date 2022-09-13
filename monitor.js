/**
 * @description Server Monitor
 * @fileOverview Server Daemon Thread with Auto Online Check
 * @author RycXEpd
 * @version 0.1.0 20220827
 */
const worker = require("node:worker_threads")
const fs = require("node:fs")
const path = require("node:path")
const https = require("node:https")
const http = require("node:http")
const child_process = require("node:child_process")
const { REQUEST_RETRY, NORTHSTAR_RESPAWN,FAILED_AFTER_RETRY,NORTHSTAR_CONSOLE_CLOSED } = require(".")
require("./src/unicode")
const Config=require("./src/config")

let request = (new URL(worker.workerData.host).protocol.includes("https")) ? https : http
//获取服务器设置名称
let g_path = worker.workerData.path;
let config_path = path.join(g_path, "\\R2Northstar\\mods\\Northstar.CustomServers\\mod\\cfg\\autoexec_ns_server.cfg");
//段:解析CFG
let config=Config.parse(fs.readFileSync(config_path));
//启动Northstar
let northstar = SpawnNorthstar();
northstar.on('exit',ExitHandler)
//主循环
setInterval(() => {
    CheckAlive(0)
}, worker.workerData.delay)
CheckAlive(0)
function RespawnNorthstar() {
    worker.parentPort.postMessage({
        type:NORTHSTAR_RESPAWN,
        data:{}
    });
    northstar.kill("SIGINT")
    return SpawnNorthstar()
}
function SpawnNorthstar() {
    let northstar=child_process.spawn(path.join(g_path, "NorthstarLauncher.exe"), ["-dedicated", "-multiple"], {
        cwd: g_path,
        detached: true,
    })
    northstar.on('exit',ExitHandler)
    return northstar
}
function CheckAlive(retrys){
    let req = request.get(worker.workerData.host, res => {
        let data = ""
        res.on("data", chunk => {
            data += chunk
        })
        res.on('end', () => {
            data = JSON.parse(data);
            let live = false;
            for (let server of data) {
                if(server.name===config["ns_server_name"]){
                    live=true;
                    break;
                }
            }
            if(live===false){
                northstar=RespawnNorthstar()
            }
        })
    });
    req.on('error', (err) => {
        if(retrys===worker.workerData.retry){
            worker.parentPort.postMessage({
                type:FAILED_AFTER_RETRY,
                data:{
                    retrys,
                    err
                }
            });
            return
        }
        worker.parentPort.postMessage({
            type: REQUEST_RETRY,
            data: {
                now: retrys + 1,
                total: worker.workerData.retry,
                err
            }
        });
        CheckAlive(retrys+1);
    });
}
function ExitHandler(){
    worker.parentPort.postMessage({
        type:NORTHSTAR_CONSOLE_CLOSED,
        data:{
            name:config["ns_server_name"]
        }
    });
    northstar=SpawnNorthstar()
}