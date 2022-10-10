/**
 * @description
 * @fileOverview
 * @author RycXEpd
 * @version x.x.x 20221010
 */
const unicode=require("./unicode");

function DateHook(){
    Date.prototype.format = function FormatDate(format, week_list = null) {
        let weeks = week_list || ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "S": this.getMilliseconds(),
            "w": weeks[this.getDay()]
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substring(4 - RegExp.$1.length));
        for (let key in date)
            if (new RegExp("(" + key + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (date[key]) : (("00" + date[key]).substring(("" + date[key]).length)));
        return format;
    }
}
function StringHook(){
    String.prototype.toUnicode = function internal_toUnicode() {
        return unicode.toUnicode(this.toString());
    }
    String.fromUnicode = unicode.fromUnicode;
}
function HookInit(){
    DateHook();
    StringHook();
}
HookInit();
