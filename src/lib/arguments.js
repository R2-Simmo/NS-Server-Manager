/**
 * @description Arguments Utils
 * @fileOverview Arguments Utils
 * @author RycXEpd
 * @version 1.0.0 20220918
 */

const Playlist=require('./playlist');

"use strict"

/**
 * Parse arguments from string
 * @param {string} str Arguments String
 * @returns {Object} Arguments
 */
function ParseArguments(str){
    let raw=str.trim().replaceAll("\n"," ");
    let args={};
    let row;
    let regex={
        str:/([-|+]\w*)\s+"(.*?)"/g,
        normal:/([-|+]\w*)\s+(\w+)/g
    }
    while((row = regex.str.exec(raw))!==null) {
        args[row[1]]=Playlist.parse(row[2]);
    }
    while((row = regex.normal.exec(raw))!==null) {
        args[row[1]]=row[2];
    }
    return args;
}

/**
 * Create arguments string
 * @param {Object} args Arguments
 * @returns {string} Arguments String
 */
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
