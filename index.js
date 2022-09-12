const constants = {
    REQUEST_RETRY: 1,
    NORTHSTAR_RESPAWN: 2,
    FAILED_AFTER_RETRY: 4,
    NORTHSTAR_CONSOLE_CLOSED: 8,
    ALIVE_CHECK: 16
}

const worker = require("node:worker_threads")

const MasterServerUrl = "https://nscn.wolf109909.top"//Master Server
const RequestUrl = new URL(MasterServerUrl)
RequestUrl.pathname = "/client/servers"//API path

const ServerPaths = [
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2",
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2"
]
const monitors = {}

function CreateWorker(server, retry) {
    let monitor = new worker.Worker(__dirname + "/monitor.js", {
        workerData: {
            path: server,
            host: RequestUrl.toString(),
            retry: 3,
            delay: 5 * 60 * 1000
        }
    })
    monitors[server] = monitor
    monitor.on('message', function WorkerMessageHandler(value) {
        switch (value.type) {
            case constants.REQUEST_RETRY:
                console.log("[Warn]Worker-%d:cannot got server list.retry %d/%d", monitor.threadId, value.data.now, value.data.total)
                break
            case constants.NORTHSTAR_RESPAWN:
                console.log("[Info]Worker-%d:northstar invalid,reloading", monitor.threadId)
                break;
            case constants.FAILED_AFTER_RETRY:
                console.log("[Error]Worker-%d:cannot got server list after %d times retry", monitor.threadId, value.data.retrys)
                break
            case constants.NORTHSTAR_CONSOLE_CLOSED:
                console.log("[Info]Worker-%d:Northstar server \"%s\" exited,reloading", monitor.threadId, value.data.name)
        }
    })
    monitor.on('error', function WorkerErrorHandler(err) {
        console.log("[Error]Worker-%d:%s", this.threadId, err)
        this.terminate()
        if (retry <= 0) {
            delete monitors[server]
            return;
        }
        console.log("Worker Retry:%s", server)
        CreateWorker(server, retry - 1)
    })
    monitor.on('exit', function WorkerExitHandler() {
        delete monitors[server]
    })
}

if (worker.isMainThread) {
    for(let server of ServerPaths){
        CreateWorker(server,3)
    }
}

exports = module.exports = constants