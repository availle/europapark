"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
        const rollercoasters = ['a', 'b', 'c'];
        const renderPage = (path) => (_, res) => {
            const context = {
                rollercoasters
            };
            res.type('text/html').render(path, context);
        };
        this.express.get('/coasters', renderPage('list'));
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map