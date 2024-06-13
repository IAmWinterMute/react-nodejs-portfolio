import axios from 'axios'
import { IGeolocation } from '../models/geolocation.js'
import { IContract } from './contract.js'

interface RequestParameters {}
interface ResponseParameters { location: IGeolocation }
export default function (parameters: RequestParameters): IContract<RequestParameters, ResponseParameters> {
    let path: string = "/api/birdySPA/geolocation"
    return {
        description: "Get geodata",
        request: () => { return axios.get<ResponseParameters>(path)},
        response: (ResponseParameters) => { return ResponseParameters },
        parameters,
        path,
        validate: () => {
            let valid = { valid: true, failReason: [] as string[] }
            return valid
        },
    }
}
