import { AuthOpts, AuthInterface } from '@vonage/auth'
import { VetchError, VetchResponse, VetchOptions } from '@vonage/vetch';

export type ApplicationsClassParameters = AuthOpts & VetchOptions & {
    auth?: AuthInterface,
}

export interface ApplicationsResponse<T> extends VetchResponse<T> { }
