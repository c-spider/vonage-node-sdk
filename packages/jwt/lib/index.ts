import { JWT } from './jwt'
export { GeneratorOptions, Claims, ACL, Token, JWTInterface } from './types'

export { JWT }

let instance = new JWT()

export function tokenGenerate(applicationId, privateKey, opts?) {
    return instance.tokenGenerate(applicationId, privateKey, opts)
}
