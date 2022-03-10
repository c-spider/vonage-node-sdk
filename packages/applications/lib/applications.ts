
import { Auth, AuthInterface, AuthSignedParams, AuthQueryParams } from '@vonage/auth';
import { request, ResponseTypes } from "@vonage/vetch";
import {
    ApplicationsClassParameters,
    ApplicationsResponse
} from './types';

const runRequest = async <T>(options: ApplicationsClassParameters, config: ApplicationsClassParameters): Promise<ApplicationsResponse<T>> => {
    return await request<T>(options);
}

const BASE_URL = "https://api.nexmo.com/v2/applications".replace(/\/+$/, "");

export const ApplicationsParamCreator = (options?: ApplicationsClassParameters) => ({});


export class BaseAPI {
    protected config: ApplicationsClassParameters;
    protected auth: AuthInterface;
    protected baseUrl: string;

    constructor(opts?: ApplicationsClassParameters) {
        if (opts) {
            opts['auth'] = new Auth({
                apiKey: opts.apiKey,
                apiSecret: opts.apiSecret,
                file: opts.file,
                signature: opts.signature
            });
            opts['baseUrl'] = opts.baseUrl || BASE_URL;
            opts['responseType'] = opts.responseType || ResponseTypes.json;
            this.config = opts;
        }
    }
};

export class Applications extends BaseAPI { }