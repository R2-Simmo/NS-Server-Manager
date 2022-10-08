/**
 * @description Empty Logger(Base,Interface)
 * @fileOverview Logger Defines
 * @author RycXEpd
 * @version 1.2.0 20220930
 */
/** Logger class define */
class EmptyLogger {
    log(format, ...args) {
    }
    ;
    error(format, ...args) {
    }
    ;
    warn(format, ...args) {
    }
    ;
    info(format, ...args) {
    }
    ;
    debug(format, ...args) {
    }
    ;
    fatal(format, ...args) {
    }
    ;
    RegisterModule(name) {
        return new EmptyLogger();
    }
    ;
}
module.exports = { EmptyLogger };
//# sourceMappingURL=Logger.js.map