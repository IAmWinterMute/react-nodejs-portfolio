import axios from 'axios'
import { IContract } from './contract.js'
import { IBirdInfo } from '../models/birdInfo.js'

interface RequestParameters { sciName:string}
interface ResponseParameters { birdInfo: IBirdInfo }
export default function (parameters: RequestParameters): IContract<RequestParameters, ResponseParameters> {
    let path: string = "/api/birdySPA/birdinformation?sciName=" + parameters.sciName
    return {
        description: "Get bird info data",
        request: () => { return axios.get<ResponseParameters>(path) },
        response: (ResponseParameters) => { return ResponseParameters },
        parameters,
        path,
        validate: () => {
            let valid = { valid: true, failReason: [] as string[] }
            if (parameters.sciName == "") { valid.valid = false; valid.failReason.push("sciName missing") }
            return valid
        },
    }
}
