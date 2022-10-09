const Server=require('./src/server');
const Checker=require('./src/checker');

const fs=require('node:fs');
const util=require('node:util');
const Logger=require('./src/lib/log');
let exited=false;

const logger=new Logger.Simple({root:__dirname});
logger.info("System Startup");

const ServerPaths = [
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2",
    // "D:\\Program Files (x86)\\Origin Games\\Titanfall2"
];
logger.debug("Mounted Servers Count: %d",ServerPaths.length);
const servers = [];

for(let index in ServerPaths){
    let server=ServerPaths[index];
    logger.info("Loading Server From \"%s\" (%d/%d)",server,parseInt(index)+1,ServerPaths.length);
    server=new Server(server);
    server.UseLogger(logger.RegisterModule(util.format("Server-%d",parseInt(index)+1)));
    logger.debug("Server-%d Loaded",parseInt(index)+1);
    server.Init();
    logger.debug("Server-%d(%s) Initialized",parseInt(index)+1,server.GetName());
    if(fs.existsSync(util.format('./pids/%s.pid', server.GetName()))){
        logger.info("Found PID Lock File,Attach to process...");
        server.Attach(parseInt(fs.readFileSync(util.format('./pids/%s.pid', server.GetName())).toString()));
    }else{
        logger.info("No PID Lock File Found,Start...");
        server.Start();
    }
    logger.debug("Add to Server List");
    servers.push(server);
}
logger.info("Create Online Checker");
const checker=new Checker();
checker.UseLogger(logger.RegisterModule("Checker"));
checker.on('update',list=>{
    logger.info("received Online Checker status update event");
    for(let server of servers){
        if(!Object.keys(list).includes(server.GetName())){
            logger.info("Server(%s) invalid,restart...",server.GetName());
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
    if(exited)
        return
    exited=true;
    removeIfExists('./pids');
    fs.mkdirSync('./pids');
    for(let server of servers){
        if(server.GetPID()===0)
            continue;
        fs.writeFileSync(util.format('./pids/%s.pid', server.GetName()), server.GetPID().toString());
        logger.info("Save PID(%d) for Server(%s)",server.GetPID(),server.GetName());
    }
    logger.info("System Exited");
    process.exit(0);
}
process.on('exit',SavePID);
process.on('SIGINT',SavePID);
process.on("uncaughtException",error => logger.fatal(error));
process.on("unhandledRejection",reason => logger.fatal(reason));
