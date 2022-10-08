/**
 * @description
 * @fileOverview
 * @author RycXEpd
 * @version x.x.x 20221007
 */
const Server = require('../src/server');
const Logger=require('./TestLogger');

const path=require('node:path');
const fs=require('node:fs');

function removeIfExists(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
                removeIfExists(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

let server=new Server();
let logger=new Logger();
server.UseLogger(logger);

test("Server:Create server with path",()=>{
    let server1=new Server(path.join(__dirname,'not/exists'));
    server1.UseLogger(logger);
    expect(()=>server1.Init()).toThrow('No such file or directory');
});
test("Server:Set path with not exists",()=>{
    expect(()=>server.SetPath(path.join(__dirname,'not/exists'))).toThrow('No such file or directory');
})
test("Server:Empty path check",()=>{
    expect(()=>server.Init()).toThrow();
});
test("Server:Profile path not exists check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    expect(()=>server.Init()).toThrow();
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Config path not exists check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    expect(()=>server.Init()).toThrow();
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Arguments path not exists check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers/mod/cfg','autoexec_ns_server.cfg'),'');
    expect(()=>server.Init()).toThrow();
    removeIfExists(path.join(__dirname,'resources'));
})
test("Server:Random port check", () => {
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers/mod/cfg','autoexec_ns_server.cfg'),'');
    const port=Math.round(Math.random() * 65535);
    fs.writeFileSync(path.join(__dirname,'resources/ns_startup_args_dedi.txt'),'-port '+port.toString());
    server.Init();
    expect(server.GetPort()).toBe(port);
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Random auth port check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources/ns_startup_args_dedi.txt'),'');
    const port=Math.round(Math.random() * 65535);
    fs.writeFileSync(path.join(__dirname,'resources/R2Northstar/mods/Northstar.CustomServers/mod/cfg/autoexec_ns_server.cfg'),'ns_player_auth_port '+port.toString());
    server.Init();
    expect(server.GetAuthPort()).toBe(port);
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Server name check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources/ns_startup_args_dedi.txt'),'');
    const name="This is Test Name";
    fs.writeFileSync(path.join(__dirname,'resources/R2Northstar/mods/Northstar.CustomServers/mod/cfg/autoexec_ns_server.cfg'),'ns_server_name "'+name+'"');
    server.Init();
    expect(server.GetName()).toBe(name);
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Version check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    server.SetPath(path.join(__dirname,'resources'));
    const version=[];
    version.push(Math.round(Math.random() * 99));
    version.push(Math.round(Math.random() * 99));
    version.push(Math.round(Math.random() * 99));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.Client'));
    fs.writeFileSync(path.join(__dirname,'resources/R2Northstar/mods/Northstar.Client/mod.json'), JSON.stringify({Version:version.join('.')}));
    expect(server.GetVersion()).toBe(version.join('.'));
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Change profile check",()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    server.SetPath(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources','OtherProfile'));
    server.SetProfile('OtherProfile');
    fs.mkdirSync(path.join(__dirname,'resources','OtherProfile','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','OtherProfile','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','OtherProfile','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','OtherProfile','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources/ns_startup_args_dedi.txt'),'');
    const name="This is Test Name";
    fs.writeFileSync(path.join(__dirname,'resources/OtherProfile/mods/Northstar.CustomServers/mod/cfg/autoexec_ns_server.cfg'),'ns_server_name "'+name+'"');
    server.Init();
    expect(server.GetName()).toBe(name);
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Try start with FakeServer",async ()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    fs.copyFileSync(path.join(__dirname,'FakeServer','target','release','FakeServer.exe'),path.join(__dirname,'resources','NorthstarLauncher.exe'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources','ns_startup_args_dedi.txt'),'');
    fs.writeFileSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg','autoexec_ns_server.cfg'),'');
    server.SetPath(path.join(__dirname,'resources'));
    server.SetProfile('R2Northstar');
    server.Init();
    server.Start();
    await new Promise((r) => setTimeout(r, 500));// wait for process exit
    expect(server.GetPID()).toBe(parseInt(fs.readFileSync(path.join(__dirname,'resources','pid.txt')).toString()));
    expect(()=>server.Start()).toThrow('Another instance of the server is already running');
    server.Stop();//clear pid
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Try stop with FakeServer",async ()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    fs.copyFileSync(path.join(__dirname,'FakeServer','target','release','FakeServer.exe'),path.join(__dirname,'resources','NorthstarLauncher.exe'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources','ns_startup_args_dedi.txt'),'');
    fs.writeFileSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg','autoexec_ns_server.cfg'),'');
    server.SetPath(path.join(__dirname,'resources'));
    server.SetProfile('R2Northstar');
    server.Init();
    expect(()=>server.Stop()).toThrow('Server not running');
    server.Start();
    server.Stop();
    removeIfExists(path.join(__dirname,'resources'));
});
test("Server:Try to attach with FakeServer",async ()=>{
    removeIfExists(path.join(__dirname,'resources'));
    fs.mkdirSync(path.join(__dirname,'resources'));
    fs.copyFileSync(path.join(__dirname,'FakeServer','target','release','FakeServer.exe'),path.join(__dirname,'resources','NorthstarLauncher.exe'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod'));
    fs.mkdirSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg'));
    fs.writeFileSync(path.join(__dirname,'resources','ns_startup_args_dedi.txt'),'');
    fs.writeFileSync(path.join(__dirname,'resources','R2Northstar','mods','Northstar.CustomServers','mod','cfg','autoexec_ns_server.cfg'),'');
    server.SetPath(path.join(__dirname,'resources'));
    server.SetProfile('R2Northstar');
    server.Init();
    server.Start();
    await new Promise((r) => setTimeout(r, 500));// wait for process exit
    const pid=server.GetPID();
    expect(()=>server.Attach(pid)).toThrow('Another server process is already running');
    server.Stop();//clear pid
    server.Attach(pid);
    server.Stop();
    removeIfExists(path.join(__dirname,'resources'));
});
