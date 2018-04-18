"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const themeparks = require("themeparks");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
        this.configureFrontendPages();
        this.express.use('/static/', express.static('resources/style'));
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
                const refinedCoasters = this.prepareCoasters(coasters);
                console.log(refinedCoasters);
                res.type('text/html').render(path, { refinedCoasters });
            });
        };
        this.express.get('/coasters', renderPage('list'));
    }
    prepareCoasters(coasters) {
        const coasterMap = {};
        coasters.forEach((coaster) => {
            coasterMap[coaster.id] = coaster;
        });
        const fast = {
            'wodan': Object.assign({ shortName: 'Wodan' }, coasterMap['EuropaPark_853']),
            'blueFire': Object.assign({ shortName: 'Blue Fire' }, coasterMap['EuropaPark_850']),
            'silverStar': Object.assign({ shortName: 'Silver Star' }, coasterMap['EuropaPark_250'])
        };
        const slow = {
            'euroMir': Object.assign({ shortName: "Euro Mir" }, coasterMap['EuropaPark_500']),
            'enzian': Object.assign({ shortName: 'Enzian' }, coasterMap['EuropaPark_701']),
            'matterhorn': Object.assign({ shortName: 'Matterhorn Blitz' }, coasterMap['EuropaPark_351']),
            'pegasus': Object.assign({ shortName: 'Pegasus' }, coasterMap['EuropaPark_403']),
            'bob': Object.assign({ shortName: 'Schweizer Bob-Bahn' }, coasterMap['EuropaPark_350']),
            'arthur': Object.assign({ shortName: 'Arthur' }, coasterMap['EuropaPark_900'])
        };
        const water = {
            'tirol': Object.assign({ shortName: 'Tirol Wasser' }, coasterMap['EuropaPark_700']),
            'atlantica': Object.assign({ shortName: 'Atlantica SuperSplash' }, coasterMap['EuropaPark_800']),
            'poseidon': Object.assign({ shortName: 'Poseidon' }, coasterMap['EuropaPark_400']),
            'fjord': Object.assign({ shortName: 'Fjord Rafting' }, coasterMap['EuropaPark_650']),
        };
        return { fast, slow, water };
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map