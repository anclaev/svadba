export const API_ENDPOINTS = {
  AUTH_LOGIN: '/auth/login?grant_type=token',
  AUTH_REFRESH: '/auth/refresh?grant_type=token',
  AUTH_PROFILE: '/auth/profile',
} as const
