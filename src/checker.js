/**
 * @description
 * @fileOverview
 * @author R2-nin-load
 * @version 1.0.0 20220921
 */

// master server online checker

// library
const https = require('https');
const http = require('http');
const Events = require('events')

// constants
const apis = {
    server: {
        add: '/server/add_server',
        heartbeat: '/server/heartbeat',
        update: '/server/update_values',
        remove: '/server/remove_server'
    },
    client: {
        auth: {
            origin: '/client/origin_auth',
            server: '/client/auth_with_server',
            self: '/client/auth_with_self'
        },
        promo: '/client/mainmenupromos',
        player: {
            pdata: '/player/pdata',
            info: '/player/info',
            stats: '/player/stats',
            loadout: '/player/loadout'
        },
        servers: '/client/servers'
    },
    account: {
        persistence: '/accounts/write_persistence',
        lookup: {
            uid: '/accounts/lookup_uid',
            username: '/accounts/get_username'
        }
    }
}

// main
class Checker extends Events.EventEmitter {
    #servers = {};
    #pass = false;
    #emitter = null;
    #APIBase = 'https://nscn.wolf109909.top';
    #logger=console;

    constructor(host, delay = 5 * 60) {
        super();
        if(typeof host==='string')
            this.#APIBase = host;
        if(typeof host==='number')
            delay=host;
        this.on('check', this.Check);// register event handler
        let self = this;
        this.#emitter = setInterval(function (){
            self.#InternalCheck()
        }, delay * 1000)
    }

    UseLogger(logger){
        this.#logger=logger||console;
    }

    Check() {
        this.#logger.debug("Manual check");
        this.#InternalCheck();
        this.#pass = true;
    }

    #InternalCheck() {
        if (this.#pass) {
            this.#logger.debug("Pass heartbeat by manual check");
            this.#pass = false;
            return;
        }
        this.#logger.info("Update server list");
        let url = new URL(this.#APIBase);
        url.pathname = apis.client.servers;
        let requester = url.protocol.includes('https') ? https : http;
        requester.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => this.#Update(data));
        });
    }

    #Update(data) {
        this.#logger.info("Server list update successful");
        let obj = JSON.parse(data);
        this.#servers = {};
        for (let server of obj) {
            this.#servers[server['name']] = server;
        }
        this.emit('update', this.#servers);
    }
}

// export
module.exports = Checker;
