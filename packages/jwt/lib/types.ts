export interface Token {
    config: GeneratorOptions
    token: string
    //refresh() => new token
}

export interface ACL {
    paths?: {
        [key: string]: any
    }
}

export interface GeneratorOptions {
    ttl?: number
    issued_at?: number
    subject?: string
    jti?: string
    notBefore?: number
    claims?: Claims
}

export interface Claims {
    exp?: number
    sub?: string
    jti?: string
    nbf?: number
    acl?: ACL
    iat?: number
    application_id?: string
}

export interface JWTInterface {
    tokenGenerate(
        applicationId: string,
        privateKey: string | Buffer,
        opts?: GeneratorOptions
    ): Token
}