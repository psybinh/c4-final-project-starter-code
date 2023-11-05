import { decode } from 'jsonwebtoken'

import { JwtPayload } from './JwtPayload'

/**
 * Parse a JWT token and return a user id TODO excute by ThienNLNT - 24-10:
 * @param jwtToken JWT token to parse TODO excute by ThienNLNT - 24-10:
 * @returns a user id from the JWT token TODO excute by ThienNLNT - 24-10:
 */
export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}
