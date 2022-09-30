const Server=require('./src/server');
const Checker=require('./src/checker');

const fs=require('node:fs');
const util=require('node:util');

const ServerPaths = [
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2"
]
const servers = []

for(let server of ServerPaths){
    server=new Server(server);
    server.Init();
    if(fs.existsSync(util.format('./pid/%s.lock', server.GetName()))){
        server.Attach(parseInt(fs.readFileSync(util.format('./pid/%s.lock', server.GetName())).toString()));
    }else{
        server.Start();
    }
    servers.push(server);
}
const checker=new Checker();
checker.on('update',list=>{
    for(let server of servers){
        if(!Object.keys(list).includes(server.GetName())){
            server.Restart();
        }
    }
});
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
function SavePID(){
    removeIfExists('./pid');
    fs.mkdirSync('./pid');
    for(let server of servers){
        fs.writeFileSync(util.format('./pid/%s.lock', server.GetName()), server.GetPID().toString());
    }
    process.exit();
}
process.on('exit',SavePID);
process.on('SIGINT',SavePID)
