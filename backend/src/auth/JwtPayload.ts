/**
 * A payload of a JWT token TODO excute by ThienNLNT - 24-10:
 */
export interface JwtPayload {
  iss: string
  sub: string
  iat: number
  exp: number
}
