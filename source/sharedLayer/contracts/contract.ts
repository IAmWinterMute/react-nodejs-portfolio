import { AxiosResponse } from "axios";

/**
 * The contract request
 */
export interface IContract<RequestParameters,ResponseParameters> {
    description:string
    path:string
    parameters:RequestParameters
    request(): Promise<AxiosResponse<ResponseParameters>>
    response(params:ResponseParameters):ResponseParameters
    validate():{valid:boolean,failReason:string[]}
}
