import { GeneratorOptions, Token } from '@vonage/jwt';

export interface AuthConstructor {
    new(opts?: AuthOpts): AuthInterface
}

export interface ApplicationDetails {
    application_id: string
    privateKey: string | Buffer
}

// MD5 HASH, MD5 HMAC, SHA1 HMAC, SHA-256 HMAC and SHA-512 HMAC.
export enum AlgorithmTypes {
    md5hash = "MD5HASH",
    md5hmac = "MD5HMAC",
    sha1hmac = "SHA1HMAC",
    sha256hmac = "SHA256HMAC",
    sha512hmac = "SHA512HMAC"
}

export interface AuthOpts {
    apiKey?: string
    apiSecret?: string
    file?: string,
    signature?: SignedHashParams
    app?: ApplicationDetails
}

export interface SignedHashParams {
    secret: string,
    algorithm: AlgorithmTypes
}

export interface AuthSignedParams {
    api_key: string
    sig?: string
}

export interface AuthQueryParams {
    api_key: string
    api_secret: string
}

export interface AuthInterface {
    apiKey: string
    apiSecret: string
    signature?: SignedHashParams
    app?: ApplicationDetails
    getQueryParams<T>(params: T): AuthQueryParams & T
    createSignatureHash<T>(params: T): AuthSignedParams & T
    generateJWT(opts?: GeneratorOptions): Token
    generateBasicAuth(): string
}


