import express from "express"
import path from "path"
import moreRoutes from "../routes/moreRoutes.js"
import birdyRoutes from "../routes/birdyRoutes.js"
import { fileURLToPath } from "url"
import martinRoutes from "../routes/martinRoutes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function subDomain(checkDomain: string, fn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): any {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {

        //Check if provided domain is equal to the incoming
        let sub = ""
        if (req.hostname.indexOf(".") > -1) { sub = req.hostname.substring(0, req.hostname.indexOf(".")) } //Perhaps do this once in a prior middleware
        if (sub.toLowerCase() == checkDomain.toLowerCase()) { return fn(req, res, next) }

        //No match, continue in the request process
        next()

    }
}


export function routeMore(server: express.Application) {
    server.use(subDomain('', express.static(path.join(__dirname, '..', '../moreSPA/')))) //Static for all the assets
    server.use(subDomain('', moreRoutes)) //Route for public Index
}

export function routeMartin(server: express.Application) {
    server.use(subDomain('martin', express.static(path.join(__dirname, '..', '../martinSPA/')))) //Static for all the assets
    server.use(subDomain('martin', martinRoutes)) //Route for public Index
}

export function routeBirdy(server: express.Application) {
    server.use(subDomain('bird', express.static(path.join(__dirname, '..', '../birdySPA/')))) //Static for all the assets
    server.use(subDomain('bird', birdyRoutes)) //Route for public Index
}