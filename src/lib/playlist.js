/**
 * @description Playlist Utils
 * @fileOverview Playlist Utils
 * @author RycXEpd
 * @version 1.2.0 20220930
 */
"use strict"

/**
 * Parse playlist from string
 * @param {string} str Playlists String
 * @returns {Object} Playlist
 */
function ParsePlaylist(str){
    let raw=str.trim().replaceAll("\n"," ").split(" ");
    let playlist={};
    for(let index=0;index<raw.length;index+=2){
        playlist[raw[index]]=raw[index+1];
    }
    return playlist;
}

/**
 * Create playlist string
 * @param {Object} obj Playlist
 * @returns {string} Playlist String
 */
function StringifyPlaylist(obj){
    let ret=[];
    Object.keys(obj).forEach(key=>{
        ret.push(key);
        ret.push(obj[key]);
    });
    return ret.join(" ");
}
exports=module.exports={parse:ParsePlaylist,stringify:StringifyPlaylist};