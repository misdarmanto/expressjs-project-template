/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CONFIG } from '../configs'

export function hashPassword(password: string) {
  return require('crypto')
    .createHash('sha1')
    .update(password + CONFIG.secret.passwordEncryption)
    .digest('hex')
}
