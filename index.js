const Server=require('./src/server');
const Checker=require('./src/checker');

const ServerPaths = [
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2",
    "D:\\Program Files (x86)\\Origin Games\\Titanfall2"
]
const servers = []

for(let server of ServerPaths){
    servers.push(new Server(server));
}
for(let server of servers){
    server.Start();
}
const checker=new Checker();
checker.on('update',list=>{
    for(let server of servers){
        if(!Object.keys(list).includes(server.GetName())){
            server.Restart();
        }
    }
});
