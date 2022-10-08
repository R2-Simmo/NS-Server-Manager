/**
 * @description
 * @fileOverview
 * @author RycXEpd
 * @version x.x.x 20221008
 */

const {EmptyLogger} = require('../src/lib/log/Logger');
const util = require("util");

class TestLogger extends EmptyLogger{
    messages=[];
    constructor(options) {
        super();
    }
    log(format, ...args){
        let param = args.slice();
        param.unshift(format);
        this.messages.push({type:1,message:param});
    }
    error(format, ...args){
        let param = args.slice();
        param.unshift(format);
        throw new Error(util.format.apply(this,param));
    }
    warn(format, ...args){
        let param = args.slice();
        param.unshift(format);
        this.messages.push({type:2,message:param});
    }
    info(format, ...args){
        let param = args.slice();
        param.unshift(format);
        this.messages.push({type:1,message:param});
    }
    debug(format, ...args){
        let param = args.slice();
        param.unshift(format);
        this.messages.push({type:0,message:param});
    }
    fatal(format, ...args){
        let param = args.slice();
        param.unshift(format);
        throw new Error(util.format.apply(this,param));
    }
    RegisterModule(name){
        return new TestLogger();
    }
    GetNextMessage(){
        return this.messages.shift()
    }
}
exports=module.exports=TestLogger;
