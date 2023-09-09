import jwt from 'jsonwebtoken'
import { CONFIG } from '../configs'

export interface JwtPayloadTypes {
  user_id: string
  role: 'mahasiswa' | 'prodi' | 'jurusan' | 'akademik' | 'biro'
}

export const generateAccessToken = (username: JwtPayloadTypes): any => {
  return jwt.sign(username, CONFIG.secret.token ?? '', { expiresIn: '1800s' })
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, CONFIG.secret.token ?? '')
  } catch {
    return false
  }
}
