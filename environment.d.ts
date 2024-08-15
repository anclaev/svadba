declare global {
  namespace NodeJS {
    interface Process {
      NODE_ENV: 'development' | 'production'
      PORT?: string
    }
  }
}

export {}
