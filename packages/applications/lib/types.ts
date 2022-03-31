import { AuthOpts, AuthInterface } from '@vonage/auth'
import { VetchResponse, VetchOptions } from '@vonage/vetch';

export type ApplicationsClassParameters = AuthOpts & VetchOptions & {
    auth?: AuthInterface,
}

export interface ApplicationsResponse<T> extends VetchResponse<T> { }

export interface EmptyResponse { }

export interface Webhook {
    address?: string;
    httpMethod?: string;
}

export interface VoiceWebhook extends Webhook {
    connectionTimeout?: number;
    socketTimeout?: number;
}

export interface Application {
    id?: string;
    name: string;
    keys: {
        public_key: string
    }
    capabilities?: {
        voice?: Voice;
        messages?: Messages;
        rtc?: RTC;
        vbc?: any;
    };
    privacy?: {
        imporoveAi: boolean
    };
}


export interface Messages {
    webhooks?: {
        inboundUrl?: Webhook;
        statusUrl?: Webhook;
    };
}

export interface RTC {
    webhooks?: {
        eventUrl?: Webhook;
    }
}

export interface Voice {
    webhooks?: {
        answerUrl?: VoiceWebhook;
        fallbackAnswerUrl?: VoiceWebhook;
        eventUrl?: VoiceWebhook;
    }
}

export interface ApplicationCollection {
    pageSize?: number;
    page?: number;
    totalItems?: number;
    totalPages?: number;
    embedded?: Array<Application>;
}



