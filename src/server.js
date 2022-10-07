/**
 * @description Server Class
 * @fileOverview Server Wrapper
 * @author RycXEpd
 * @version 1.0.0 20220915
 */

const fs = require("node:fs");
const path = require("node:path");
const child_process = require("node:child_process");
const config = require("./lib/config");
const argument = require("./lib/arguments");
const util = require("node:util");
const Logger=require('./lib/log');

const defaultCfg = {
    ns_server_name: 'Unnamed Northstar Server',
    ns_server_desc: 'Default server description',
    ns_server_password: '',
    ns_report_server_to_masterserver: 1,
    ns_report_sp_server_to_masterserver: 0,
    ns_auth_allow_insecure: 0,
    ns_erase_auth_info: 1,
    ns_player_auth_port: 8081,
    everything_unlocked: 1,
    ns_should_return_to_lobby: 1,
    ns_private_match_only_host_can_change_settings: 0,
    ns_private_match_countdown_length: 15,
    ns_private_match_last_mode: 'tdm',
    ns_private_match_last_map: 'mp_forwardbase_kodai',
    ns_disallowed_weapons: '',
    ns_disallowed_weapon_primary_replacement: '',
    ns_should_log_unknown_clientcommands: 1,
    net_chan_limit_mode: 2,
    net_chan_limit_msec_per_sec: 30,
    base_tickinterval_mp: 0.016666667,
    sv_updaterate_mp: 20,
    sv_max_snapshots_multiplayer: 300,
    host_skip_client_dll_crc: 1
};
const defaultArgument = {
    '-port': '37015',
    '+setplaylist': 'private_match',
    '+mp_gamemode': 'private_match',
    '+setplaylistvaroverrides': '',
    '+map': 'mp_lobby'
};

/**
 * Northstar Server Class
 */
class Server {
    #path = null;
    #pid = 0;
    #profile = "R2Northstar";
    #timer = null;
    #config = {};
    #argument = {};
    #logger=new Logger.Simple();
    delay = 5;

    // constructor
    constructor(path = '') {
        if (path !== '')
            this.#path = path;
        if(this.#logger===console)
            this.#logger.fatal=console.error;
    }

    // Logger
    UseLogger(logger){
        this.#logger=logger||this.#logger;
    }

    // Variables

    /**
     * Set server path
     * @param {string} path Server Path
     */
    SetPath(path) {
        this.#logger.debug("Try to set path to:%s",path);
        if (!fs.existsSync(path)) {
            this.#logger.error("No such file or directory");
            return;
        }
        this.#path = path;
        this.#logger.info("Change server root path to:%d",path);
    }

    /**
     * Set profile name
     * @param {string} profile Profile Name
     */
    SetProfile(profile) {
        this.#logger.debug("Try to set server profile path to:%s",profile);
        this.#profile = profile || "R2Northstar";
        if (this.#pid !== 0)
            this.Restart();
        this.#logger.info("Change server profile path to:%d",profile);
    }

    /**
     * Get northstar version
     * @returns {string} Northstar Version
     */
    GetVersion() {
        this.#logger.debug("Get Northstar version from core mods");
        let mod = fs.readFileSync(path.join(this.#path, this.#profile, "mods\\Northstar.Client\\mod.json"));
        mod = JSON.parse(mod.toString());
        this.#logger.debug("mod config:%O",mod);
        return mod["Version"];
    }

    /**
     * Get server display name
     * @returns {string} Northstar Display Name
     */
    GetName() {
        this.#logger.debug("Cached config:%O",this.#config);
        return this.#config.ns_server_name;
    }

    /**
     * Get server auth port
     * @returns {number} Northstar Auth Port
     */
    GetAuthPort() {
        this.#logger.debug("Cached config:%O",this.#config);
        return this.#config.ns_player_auth_port;
    }

    /**
     * Get server game port
     * @returns {number} Game Port
     */
    GetPort() {
        this.#logger.debug("Cached arguments:%O",this.#config);
        return parseInt(this.#argument['-port']);
    }

    /**
     * Get running process ID
     * @returns {number} Process ID
     */
    GetPID() {
        this.#logger.debug("Server main process PID:%d",this.#pid);
        return this.#pid;
    }

    // Process Methods

    /**
     * Start new server process
     * @param {...string} arg Additional Arguments
     */
    Start(arg) {
        this.#logger.debug("Try to startup server:%s",this.#config.ns_server_name);
        if (this.#pid !== 0) {
            this.#logger.error("Another instance of the server is already running");
            return;
        }
        let args = [].slice.call(arguments);
        args.push("-dedicated");
        args.push("-multiple");
        if (this.#profile !== "R2Northstar") {
            args.push(util.format('-profile="%s"', this.#profile));
        }
        this.#logger.debug("Startup with arguments:'%s'",args.join(' '));
        let proc = child_process.spawn(path.join(this.#path, "NorthstarLauncher.exe"), args, {
            cwd: this.#path,
            detached: true
        });
        this.#logger.info("Server startup successfully");
        this.#pid = proc.pid;
        let self = this;
        this.#timer = setTimeout(function () {
            self.#Check()
        }, this.delay * 1000);
        // this.#timer = setInterval(this.#Check, this.delay * 1000);
    }

    /**
     * Stop this server
     */
    Stop() {
        this.#logger.debug("Try to stop server:%s",this.#config.ns_server_name);
        if (this.#pid === 0) {
            this.#logger.error("Server not running");
            return;
        }
        if (this.#Alive()) {
            process.kill(this.#pid, 'SIGINT');
            this.#logger.info("Server stop successfully");
        }
        this.#pid = 0;
        clearInterval(this.#timer);
        this.#timer = null;
    }

    /**
     * Attach to running server
     * @param {number} pid Process ID
     */
    Attach(pid) {
        this.#logger.debug("Try to attach to running server:%d",pid);
        if (this.#pid !== 0) {
            this.#logger.error("Another server process is already running");
            return;
        }
        this.#pid = pid;
        this.#logger.debug("Check if process alive");
        this.#Check();
        this.#logger.info("Attach to server process successfully");
        let self = this;
        this.#timer = setTimeout(function () {
            self.#Check()
        }, this.delay * 1000);
    }

    /**
     * Restart this server
     */
    Restart() {
        this.#logger.debug("Try to restart server:%s",this.#config.ns_server_name);
        this.Stop();
        this.#logger.debug("Refresh caches");
        this.Init();
        this.Start();
    }

    /**
     * Parse config&argument file
     */
    Init() {
        this.#logger.debug("Create caches");
        this.#logger.info("Refresh config cache");
        let cfg = path.join(this.#path, this.#profile, 'mods\\Northstar.CustomServers\\mod\\cfg\\autoexec_ns_server.cfg');
        if (!fs.existsSync(cfg)) {
            this.#logger.fatal("No such file or directory");
            return;
        }
        cfg = fs.readFileSync(cfg);
        this.#config = Object.assign({}, defaultCfg, config.parse(cfg.toString()));
        this.#logger.info("Refresh arguments cache");
        let arg = path.join(this.#path, 'ns_startup_args_dedi.txt');
        if (!fs.existsSync(arg)) {
            this.#logger.fatal("No such file or directory");
            return;
        }
        arg = fs.readFileSync(arg);
        this.#argument = Object.assign({}, defaultArgument, argument.parse(arg.toString()));
    }

    // Private Methods(Utils)

    /**
     * Check if mounted process alive
     * @returns {boolean} Process Alive Status
     */
    #Alive() {
        try {
            process.kill(this.#pid, 0);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Check alive&Auto restart
     */
    #Check() {
        // Process Alive Check
        let alive = this.#Alive();
        if (!alive) {
            this.#logger.info("Server exited,restart...");
            return this.Restart();
        }
    }
}

exports = module.exports = Server;
