"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const themeparks = require("themeparks");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
        this.configureFrontendPages();
        this.express.set('views', 'resources/views');
        this.express.set('view engine', 'ejs');
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (_, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }
    configureFrontendPages() {
        const ep = new themeparks.Parks.EuropaPark();
        const renderPage = (path) => (_, res) => {
            ep.GetWaitTimes().then((coasters) => {
                res.type('text/html').render(path, { coasters });
            });
        };
        this.express.get('/coasters', renderPage('list'));
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map