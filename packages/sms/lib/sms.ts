
import { Auth, AuthInterface, AuthSignedParams, AuthQueryParams } from '@vonage/auth';
import { Vetch, ResponseTypes, HTTPMethods, normalize } from "@vonage/vetch";
import {
    SMSEmptyResponse,
    SMSResponse,
    SMSClassParameters,
    SMSParams
} from './types';

const caseConversion = new Map(); //.set(API Key, SDK Key)
caseConversion.set('network-code', 'networkCode');
caseConversion.set('err-code', 'errCode');
caseConversion.set('error-text', 'errorText');
caseConversion.set('client-ref', 'clientRef');
caseConversion.set('message-timestamp', 'messageTimestamp');
caseConversion.set('message-count', 'messageCount');
caseConversion.set('remaining-balance', 'remainingBalance');
caseConversion.set('message-id', 'messageId');
caseConversion.set('protocol-id', 'protocolId');
caseConversion.set('entity-id', 'entityId');
caseConversion.set('content-id', 'contentId');
caseConversion.set('account-ref', 'accountRef');
caseConversion.set('status-report-req', 'statusReportReq');
caseConversion.set('message-price', 'messagePrice');

const runRequest = async <T>(options: SMSClassParameters, config: SMSClassParameters): Promise<SMSResponse<T>> => {
    let client = new Vetch(config);
    let result = await client.request<T>(options);
    return result;
}

const _getAuthMethod = <T>(options: SMSClassParameters, params: T): AuthSignedParams | AuthQueryParams => {
    let input = normalize(params, caseConversion);
    return options.auth.signature
        ? options.auth.createSignatureHash<T>(input)
        : options.auth.getQueryParams<T>(input)
}


const BASE_URL = "https://rest.nexmo.com".replace(/\/+$/, "");

export const SMSParamCreator = function (options?: SMSClassParameters) {

    return {
        send(params: SMSParams) {
            const localVetchOptions = {};
            localVetchOptions['url'] = `/sms/json`;
            localVetchOptions['headers'] = Object.assign({}, options.headers);
            localVetchOptions['data'] = _getAuthMethod<SMSParams>(options, params);
            localVetchOptions['method'] = HTTPMethods.POST;
            return localVetchOptions;
        }

    };
};


export class BaseAPI {
    protected config: SMSClassParameters;
    protected auth: AuthInterface;
    protected baseUrl: string;

    constructor(opts?: SMSClassParameters) {
        if (opts) {
            opts['auth'] = new Auth({ apiKey: opts.apiKey, apiSecret: opts.apiSecret, file: opts.file, signature: opts.signature });
            opts['baseUrl'] = opts.baseUrl || BASE_URL;
            opts['responseType'] = opts.responseType || ResponseTypes.json;
            opts['caseConversion'] = caseConversion
            this.config = opts;
        }
    }
};

export class SMS extends BaseAPI {
    public send(params?: SMSParams) {
        const localVetchOptions = SMSParamCreator(this.config).send(params);
        return runRequest<SMSEmptyResponse>(localVetchOptions, this.config);
    }
}