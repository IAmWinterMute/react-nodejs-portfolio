import express from "express"
import path from "path"
import moreRoutes from "../routes/moreRoutes.js"
import birdyRoutes from "../routes/birdyRoutes.js"
import { fileURLToPath } from "url"
import martinRoutes from "../routes/martinRoutes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function routeDomain(checkDomain: string, fn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): any {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {

        //Doing this simple, just routing the first domain
        console.log(req.hostname.split("."))
        console.log(req.hostname.split(".")[0])
        if (req.hostname.split(".")[0]?.toLowerCase() == checkDomain.toLowerCase()) { return fn(req, res, next) }

        //No match, continue in the request process
        next()

    }
}

export function routeMore(server: express.Application) {
    server.use(routeDomain('morethandevs', express.static(path.join(__dirname, '..', '../moreSPA/')))) //Static for all the assets
    server.use(routeDomain('morethandevs', moreRoutes)) //Route for public Index
    server.use(routeDomain('www', moreRoutes)) //Route for public Index
}

export function routeMartin(server: express.Application) {
    server.use(routeDomain('martinerlandsson', express.static(path.join(__dirname, '..', '../martinSPA/')))) //Static for all the assets
    server.use(routeDomain('martinerlandsson', martinRoutes)) //Route for public Index
}

export function routeBirdy(server: express.Application) {
    server.use(routeDomain('bird', express.static(path.join(__dirname, '..', '../birdySPA/')))) //Static for all the assets
    server.use(routeDomain('bird', birdyRoutes)) //Route for public Index
}