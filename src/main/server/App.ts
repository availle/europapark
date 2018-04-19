import * as express from 'express'
import { Request, Response, Express } from 'express'
import * as  themeparks from 'themeparks'

interface Coaster {
    id: string,
    name: string,
    waitTime: string,
    status: string,
    highlighting: string
}

interface CoasterMap {
    [id: string]: Coaster
}

class App {
    public express: Express

    constructor() {
        this.express = express()
        this.mountRoutes()
        this.configureFrontendPages()
        this.express.use('/static/', express.static('resources/style'));
        this.express.set('views', 'resources/views')
        this.express.set('view engine', 'ejs')
    }

    private mountRoutes(): void {
        const router = express.Router()
        router.get('/', (_: Request, res: Response) => {
            res.json({
                message: 'Hello World!'
            })
        })
        this.express.use('/', router)
    }

    private configureFrontendPages() {
        const ep = new themeparks.Parks.EuropaPark()


        const renderPage = (path: string) => (_: Request, res: Response) => {
            ep.GetWaitTimes().then((coasters: Coaster[]) => {
                const refinedCoasters = this.prepareCoasters(coasters)
                res.type('text/html').render(path, { refinedCoasters })
            })
        }

        this.express.get('/coasters', renderPage('list'))
    }

    private prepareCoasters(coasters: Coaster[]) {
        const coasterMap: CoasterMap = {};

        (coasters as any).forEach((coaster: Coaster) => {
            coasterMap[ coaster.id ] = {
                ...coaster,
                highlighting: (+coaster.waitTime <= 5 && coaster.status !== 'Closed' ? 'highlight' : 'coaster')
            }
        })

        const fast = [
            { shortName: 'Wodan', ...coasterMap[ 'EuropaPark_853' ] },
            { shortName: 'Blue Fire', ...coasterMap[ 'EuropaPark_850' ] },
            { shortName: 'Silver Star', ...coasterMap[ 'EuropaPark_250' ] } ]


        const slow = [ { shortName: "Euro Mir", ...coasterMap[ 'EuropaPark_500' ] },
            { shortName: 'Enzian', ...coasterMap[ 'EuropaPark_701' ] },
            { shortName: 'Matterhorn Blitz', ...coasterMap[ 'EuropaPark_351' ] },
            { shortName: 'Pegasus', ...coasterMap[ 'EuropaPark_403' ] },
            { shortName: 'Schweizer Bob-Bahn', ...coasterMap[ 'EuropaPark_350' ] },
            { shortName: 'Arthur', ...coasterMap[ 'EuropaPark_900' ] } ]

        const
            water = [
                { shortName: 'Tirol Wasser', ...coasterMap[ 'EuropaPark_700' ] },
                { shortName: 'Atlantica SuperSplash', ...coasterMap[ 'EuropaPark_800' ] },
                { shortName: 'Poseidon', ...coasterMap[ 'EuropaPark_400' ] },
                { shortName: 'Fjord Rafting', ...coasterMap[ 'EuropaPark_650' ] } ]


        return { fast, slow, water }
    }
}

export default new App().express
