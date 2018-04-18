import * as express from 'express'
import { Request, Response, Express } from 'express'
import * as  themeparks from 'themeparks'

class App {
    public express: Express

    constructor() {
        this.express = express()
        this.mountRoutes()
        this.configureFrontendPages()
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
            ep.GetWaitTimes().then((coasters: any[]) => {
                res.type('text/html').render(path, { coasters } )

            })
        }

        this.express.get('/coasters', renderPage('list'))
    }

}

export default new App().express
