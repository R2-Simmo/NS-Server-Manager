/**
 * @description Config Utils
 * @fileOverview Source Engine Config Utils
 * @author RycXEpd
 * @version 0.1.0 20220913
 */
"use strict"
require("./unicode");

/**
 * Parse Config From File
 * @param str config string
 * @returns {Object} config object
 */
function ParseConfig(str){
    let raw_config = str.toString().split('\n');
    //段:解析CFG
    let config = {};
    for (let line of raw_config) {
        if (line.trim() === '') continue;
        if (line.trim().startsWith("//")) continue;
        let row = /^(\w*)\s+"(.*?)"/g.exec(line);//support for string value
        if (row != null) {
            config[row[1]] = String.fromUnicode(row[2]);//unescape(row[2].replace(/\\u/g, "%u"))
            continue;
        }
        row = /^(\w*)\s+(\d+\.\d+)/g.exec(line);//support for float value
        if(row != null){
            config[row[1]]=parseFloat(row[2]);
            continue;
        }
        row = line.split("//")[0].trim();
        let value = row.slice(row.indexOf(' ')).trim();
        value = parseInt(value);
        config[row.slice(0, row.indexOf(' '))] = value;
    }
    return config;
}

/**
 * Create Source Engine Format Config String
 * @param config object
 * @returns {string} config string
 */
function StringifyConfig(config){
    let ret='';
    Object.keys(config).forEach(key=>{
        let value=config[key];
        if(typeof value==="string"){
            value="\""+value.toUnicode()+"\"";
        }
        ret+=key+" "+value.toString()+"\n";
    });
    return ret;
}
exports=module.exports={parse:ParseConfig,stringify:StringifyConfig}