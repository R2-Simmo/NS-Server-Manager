/**
 * @description Unicode Utils
 * @fileOverview String Unicode Utils with class hook
 * @author RycXEpd
 * @version 0.1.1 20220912
 */
"use strict"

/**
 * Unicode string encode
 * @param {string} str Original String
 * @returns {string} Unicode Encoded String
 */
function toUnicode(str) {
    let ret = '';
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code > 127)
            ret += "\\u" + str.charCodeAt(i).toString(16).padStart(4, "0");
        else
            ret += str[i];
    }
    return ret;
}

/**
 * Unicode string decode
 * @param {string} encoded Unicode Encoded String
 * @returns {String} Decoded String
 */
function fromUnicode(encoded) {
    let regex = /(\\u\w{4})/gi;
    let result = null;
    while ((result = regex.exec(encoded)) !== null) {
        //try decode
        let hex = result[0];
        hex = hex.replace("\\u", "");
        encoded = encoded.replaceAll(result[0], String.fromCharCode(parseInt(hex, 16)));
        //reset regexp lastIndex pos
        regex.lastIndex = 0;
    }
    return encoded;
}

//Hook:String.toUnicode,String.fromUnicode
(function HookInit() {
    String.prototype.toUnicode = function internal_toUnicode() {
        return toUnicode(this.toString());
    }
    String.fromUnicode = fromUnicode;
})()
exports = module.exports = {toUnicode, fromUnicode}