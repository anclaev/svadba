const envs = process.env.OLD_ENV
const new_version = process.env.NEW_VERSION
const compose_id = process.env.COMPOSE_ID

const temp = envs.split('\\n').map((env) => {
  if (env.split('=')[0] === 'VERSION') {
    return `${env.split('=')[0]}=${new_version}`
  }
  return env
})

const newEnvs = {
  composeId: compose_id,
}

// for (const env of temp) {
//   newEnvs[env.split('=')[0]] = env.split('=')[1]
// }

newEnvs.env = temp.join('\\n')

return JSON.stringify(newEnvs)
