/**
 * @description Simple Logger
 * @fileOverview Simple Logger Class
 * @author RycXEpd
 * @version 1.2.0 20220930
 */

const {EmptyLogger} = require('./Logger');
const fs=require('node:fs');
require('../date_extend');
const util = require('node:util');
const path=require('node:path');

class SimpleLogger extends EmptyLogger {
    #root = null;
    #path = 'main';

    constructor(options) {
        super();
        this.#root = options.root || __dirname;
        if(!fs.existsSync(path.join(this.#root,'logs'))){
            fs.mkdirSync(path.join(this.#root,'logs'));
        }
        this.#path=options.path||'main';
    }

    #format(format, args){
        let param = args.slice();
        param.unshift(format);
        let timeline=new Date().format('yyyy-MM-dd hh:mm:ss.S');
        let normal = util.format.apply(this, param);
        param.unshift({colors:true});
        let color = util.formatWithOptions.apply(this, param);
        return {color,normal,timeline};
    }

    log(format, ...args) {
        let {color,normal,timeline}=this.#format(format,args);
        console.log('[%s] \x1b[0;32m[Info]\x1b[0m [%s] %s',timeline,this.#path,color);
        fs.appendFileSync(path.join(this.#root,'logs',new Date().format('yyyy-MM-dd.log')),
            util.format('[%s] [Info] [%s] %s\n',timeline,this.#path,normal));
    }

    error(format, ...args) {
        let {color,normal,timeline}=this.#format(format,args);
        console.log('[%s] \x1b[0;31m[Error]\x1b[0m [%s] %s',timeline,this.#path,color);
        fs.appendFileSync(path.join(this.#root,'logs',new Date().format('yyyy-MM-dd.log')),
            util.format('[%s] [Error] [%s] %s\n',timeline,this.#path,normal));
    }

    warn(format, ...args) {
        let {color,normal,timeline}=this.#format(format,args);
        console.log('[%s] \x1b[0;33m[Warning]\x1b[0m [%s] %s',timeline,this.#path,color);
        fs.appendFileSync(path.join(this.#root,'logs',new Date().format('yyyy-MM-dd.log')),
            util.format('[%s] [Warning] [%s] %s\n',timeline,this.#path,normal));
    }

    info(format, ...args) {
        let param = args.slice();
        param.unshift(format);
        this.log.apply(this,param);
    }

    debug(format, ...args) {
        if(!('DEBUG_MODE' in process.env))
            return;
        let {color,normal,timeline}=this.#format(format,args);
        console.log('[%s] \x1b[0;36m[Debug]\x1b[0m [%s] %s',timeline,this.#path,color);
        fs.appendFileSync(path.join(this.#root,'logs',new Date().format('yyyy-MM-dd.log')),
            util.format('[%s] [Debug] [%s] %s\n',timeline,this.#path,normal));
    }

    fatal(format, ...args) {
        let {color,normal,timeline}=this.#format(format,args);
        console.log('[%s] \x1b[0;31m[Fatal Error]\x1b[0m [%s] %s',timeline,this.#path,color);
        fs.appendFileSync(path.join(this.#root,'logs',new Date().format('yyyy-MM-dd.log')),
            util.format('[%s] [Fatal Error] [%s] %s\n',timeline,this.#path,normal));
        process.exit(-1);
    }

    RegisterModule(name){
        let options={root:this.#root,path:this.#path+'.'+name};
        if(this.#path==='main'){
            options.path=name;
        }
        return new SimpleLogger(options);
    }
}

exports = module.exports = SimpleLogger;
