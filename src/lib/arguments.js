/**
 * @description Arguments Utils
 * @fileOverview Arguments Utils
 * @author RycXEpd
 * @version 1.0.0 20220918
 */
"use strict"
function ParseArguments(str){
    let raw;
    let args={};
    let key="";
    let arr=false;
    raw=str.trim().replaceAll("\n"," ").split(" ");
    for(let item of raw){
        if(item.startsWith("-")||item.startsWith("+")) {
            key = item;
            args[key]=true;
            continue;
        }
        if(!arr)
            args[key]=item;
        else
            args[key].push(item);
        if(item.startsWith('"')){
            args[key]=[];
            args[key].push(item);
            arr=true;
        }
        if(item.endsWith('"')){
            args[key]=args[key].join(" ").slice(1,-1);
            arr=false;
        }
    }
    return args;
}
function StringifyArguments(args){
    let ret='';
    Object.keys(args).forEach(key=>{
        let value=args[key];
        if(value.indexOf(" ")!==-1)
            value='"'+value+'"';
        ret+=key+" "+value.toString()+"\n";
    });
    return ret;
}
exports=module.exports={parse:ParseArguments,stringify:StringifyArguments};