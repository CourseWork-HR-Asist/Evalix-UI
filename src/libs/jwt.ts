import { jwtDecode } from 'jwt-decode'

interface Token {
  exp: number
  unique_name: string
  email: string,
  sub: string // roleid
  role: string
}

export const parseJwt = (token: string): Token | null => {
  try {
    return jwtDecode(token)
  } catch {
    return null
  }
}

export const isTokenExpired = (token: string): boolean => {
  const parsedToken = parseJwt(token)
  if (!parsedToken) return false

  const currentTime = Math.floor(Date.now() / 1000)
  return parsedToken.exp > currentTime
}