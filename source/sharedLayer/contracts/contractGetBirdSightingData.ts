import axios from 'axios'
import { IGeolocation } from '../models/geolocation.js'
import { IContract } from './contract.js'
import { IBirdSighting } from '../models/birdSighting.js'

interface RequestParameters { latitude: number, longitude: number }
interface ResponseParameters { birdSightings: IBirdSighting[] }
export default function (parameters: RequestParameters): IContract<RequestParameters, ResponseParameters> {
    let path: string = "/api/birdySPA/birdsightings?longitude=" + parameters.longitude + "&latitude=" + parameters.latitude
    return {
        description: "Get bird sighting data",
        request: () => { return axios.get<ResponseParameters>(path) },
        response: (ResponseParameters) => { return ResponseParameters },
        parameters,
        path,
        validate: () => {
            let valid = { valid: true, failReason: [] as string[] }
            if (isNaN(parameters.latitude)) { valid.valid = false; valid.failReason.push("Latitude contained faulty characters ") }
            if (isNaN(parameters.longitude)) { valid.valid = false; valid.failReason.push("Longitude contained faulty characters ") }
            return valid
        },
    }
}
