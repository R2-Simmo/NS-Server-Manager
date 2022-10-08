/**
 * @description Empty Logger(Base,Interface)
 * @fileOverview Logger Defines
 * @author RycXEpd
 * @version 1.2.0 20220930
 */

/** Logger class define */
class EmptyLogger {

    log(format: string, ...args: any[]): void {
    };

    error(format: string, ...args: any): void {
    };

    warn(format: string, ...args: any): void {
    };

    info(format: string, ...args: any): void {
    };

    debug(format: string, ...args: any): void {
    };

    fatal(format: string, ...args: any): void {
    };

    RegisterModule(name: string): EmptyLogger {
        return new EmptyLogger();
    };
}

export = {EmptyLogger};
