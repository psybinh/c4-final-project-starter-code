import { JwtPayload } from './JwtPayload'
import { JwtHeader } from 'jsonwebtoken'

/**
 * Interface representing a JWT token TODO excute by ThienNLNT - 24-10:
 */
export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}
