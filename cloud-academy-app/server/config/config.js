import production from './env/production'
import development from './env/development'

const configs = {
  development,
  production
}

const env = process.env.NODE_ENV || 'development'

export default configs[env]
