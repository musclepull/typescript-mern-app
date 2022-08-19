import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import {config} from './config'
import {databaseClient} from './user-database'
import {getGitHubUser} from './github-adapter'

import {
  getUserByGitHubId,
  createUser,
  setupUserIndexes,
  getUserById,
  increaseTokenVersion,
} from './user-service'
import {buildTokens, setTokens, refreshTokens, clearTokens, verifyRefreshToken} from './token-utils'
import {Cookies} from 'shared/auth'

import {authMiddleware} from './auth-middleware'

const app = express()

app.use(cors({credentials: true, origin: config.clientUrl}))
app.use(cookieParser())

app.get('/', (req, res) => res.send('api is healthy')) //Kubernetes health check in

app.get('/github', async (req, res) => {
  const {code} = req.query
  console.log(`Starting...`)
  const gitHubUser = await getGitHubUser(code as string)
  console.log(`GitHub User ID: ${gitHubUser.id}`)
  console.log(`GitHub User Name: ${gitHubUser.name}`)
  let user = await getUserByGitHubId(gitHubUser.id)
  console.log(`Mongo User Name: ${user?.name}`)
  if (!user) user = await createUser(gitHubUser.name, gitHubUser.id)
  //hand out refresh and access tokens
  const {accessToken, refreshToken} = buildTokens(user)
  //set Tokens in response Object
  setTokens(res, accessToken, refreshToken)
  //redirect to home page
  res.redirect(`${config.clientUrl}/`)
})

app.post('/refresh', async (req, res) => {
  try {
    const current = verifyRefreshToken(req.cookies[Cookies.RefreshToken])
    const user = await getUserById(current.userId)
    if (!user) throw 'User not found'

    const {accessToken, refreshToken} = refreshTokens(current, user.tokenVersion)
    setTokens(res, accessToken, refreshToken)
  } catch (error) {
    clearTokens(res)
  }

  res.end()
})

app.post('/logout', authMiddleware, (req, res) => {
  clearTokens(res)
  res.end()
})

app.post('/logout-all', authMiddleware, async (req, res) => {
  await increaseTokenVersion(res.locals.token.userId)
  clearTokens(res)
  res.end()
})

app.get('/home', authMiddleware, async (req, res) => {
  console.log('mongo_id:' + res.locals.token.userId)
  const user = await getUserById(res.locals.token.userId)
  console.log(
    'Mongo User: ' + user?.name + ' - id: ' + user?.id + ' - GitHubID: ' + user?.gitHubUserId
  )
  res.json(user)
})

async function main() {
  await databaseClient.connect()
  await setupUserIndexes()

  app.listen(3000)
}

main()
