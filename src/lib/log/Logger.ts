/**
 * @description Empty Logger(Base,Interface)
 * @fileOverview Logger Defines
 * @author RycXEpd
 * @version 1.2.0 20220930
 */

/** Logger class define */
abstract class EmptyLogger {

    abstract log(format: string, ...args: any[]): void;

    abstract error(format: string, ...args: any): void;

    abstract warn(format: string, ...args: any): void;

    abstract info(format: string, ...args: any): void;

    abstract debug(format: string, ...args: any): void;

    abstract fatal(format: string, ...args: any): void;

    abstract RegisterModule(name: string): EmptyLogger;
}

export = {EmptyLogger};
