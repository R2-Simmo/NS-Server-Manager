/**
 * @description
 * @fileOverview
 * @author R2-nin-load
 * @version 1.0.0 20220921
 */

/**
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                     佛祖保佑        永无BUG
 */

// master server online checker

// library
const https = require('https');
const Events = require('events')

// constants
const APIBase = "https://nscn.wolf109909.top"// API base
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

    constructor(delay = 5 * 60 * 1000) {
        super();
        this.on('check', this.Check);// register event handler
        this.#emitter = setInterval(this.#InternalCheck, delay)
    }

    Check() {
        this.#InternalCheck();
        this.#pass = true;
    }

    #InternalCheck() {
        if (this.#pass) {
            this.#pass = false;
            return;
        }
        let url = new URL(APIBase);
        url.pathname = apis.client.servers;
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => this.#Update(data));
        });
    }

    #Update(data) {
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