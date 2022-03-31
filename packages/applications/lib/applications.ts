
import { Auth, AuthInterface } from '@vonage/auth';
import { request, ResponseTypes } from "@vonage/vetch";
import {
    ApplicationsClassParameters,
    ApplicationsResponse,
    Application,
    ApplicationCollection,
    EmptyResponse
} from './types';

const runRequest = async <T>(options: ApplicationsClassParameters, config: ApplicationsClassParameters): Promise<ApplicationsResponse<T>> => {
    return await request<T>(options);
}

const BASE_URL = "https://api.nexmo.com/v2/applications".replace(/\/+$/, "");

export const ApplicationsParamCreator = (options?: ApplicationsClassParameters) => ({
    createApplication(opts) {
        const localVetchOptions = {};
        localVetchOptions['url'] = `/`;
        localVetchOptions['headers'] = Object.assign({}, options.headers);
        localVetchOptions['data'] = opts
        localVetchOptions['method'] = 'POST';
        return localVetchOptions;
    },
    deleteApplication(id) {
        const localVetchOptions = {};
        localVetchOptions['url'] = `/${id}`;
        localVetchOptions['headers'] = Object.assign({}, options.headers);
        localVetchOptions['method'] = 'DELETE';
        return localVetchOptions;
    },
    getApplication(id) {
        const localVetchOptions = {};
        localVetchOptions['url'] = `/${id}`;
        localVetchOptions['headers'] = Object.assign({}, options.headers);
        localVetchOptions['method'] = 'GET';
        return localVetchOptions;
    },
    listApplication(opts) {
        const localVetchOptions = {};
        localVetchOptions['url'] = `/`;
        localVetchOptions['headers'] = Object.assign({}, options.headers);
        localVetchOptions['data'] = opts;
        localVetchOptions['method'] = 'GET';
        return localVetchOptions;
    },
    updateApplication(opts) {
        const localVetchOptions = {};
        localVetchOptions['url'] = `/${opts.id}`;
        localVetchOptions['headers'] = Object.assign({}, options.headers);
        localVetchOptions['data'] = opts;
        localVetchOptions['method'] = 'PUT';
        return localVetchOptions;
    }
});

export class BaseAPI {
    protected config: ApplicationsClassParameters;
    protected auth: AuthInterface;
    protected baseUrl: string;

    constructor(opts?: ApplicationsClassParameters) {
        if (opts) {
            opts['auth'] = new Auth({
                apiKey: opts.apiKey,
                apiSecret: opts.apiSecret,
            });
            opts['baseUrl'] = opts.baseUrl || BASE_URL;
            opts['responseType'] = opts.responseType || ResponseTypes.json;
            opts['headers']['Authorization'] = opts.auth.generateBasicAuth();
            this.config = opts;
        }
    }
};

export class Applications extends BaseAPI {
    public createApplication(options, claims?) {
        const localVetchOptions = ApplicationsParamCreator(this.config).createApplication(options);
        return runRequest<Application>(localVetchOptions, this.config);
    }

    public deleteApplication(id: string, claims?) {
        const localVetchOptions = ApplicationsParamCreator(this.config).deleteApplication(id);
        return runRequest<EmptyResponse>(localVetchOptions, this.config);
    }

    public getApplication(id: string, claims?) {
        const localVetchOptions = ApplicationsParamCreator(this.config).getApplication(id);
        return runRequest<Application>(localVetchOptions, this.config);
    }

    public listApplication(options, claims?) {
        const localVetchOptions = ApplicationsParamCreator(this.config).listApplication(options);
        return runRequest<ApplicationCollection>(localVetchOptions, this.config);
    }
    public updateApplication(options, claims?) {
        const localVetchOptions = ApplicationsParamCreator(this.config).updateApplication(options);
        return runRequest<Application>(localVetchOptions, this.config);
    }
}