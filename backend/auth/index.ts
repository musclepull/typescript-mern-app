import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import {config} from './config'
import {databaseClient} from './user-database'
import {getGitHubUser} from './github-adapter'
import {getUserByGitHubId, createUser, setupUserIndexes} from './user-service'
import {buildTokens, setTokens} from './token-utils'

const app = express()

app.use(cors({credentials: true, origin: config.clientUrl}))
app.use(cookieParser())

app.get('/', (req, res) => res.send('api is healthy')) //Kubernetes health check in

app.get('/github', async (req, res) => {
  const {code} = req.query
  console.log("I'm in the github oauth api")
  console.log("I'm in the github oauth api again")
  const gitHubUser = await getGitHubUser(code as string)
  console.log('Got Github User')
  let user = await getUserByGitHubId(gitHubUser.id)
  console.log('Got Github User by id')
  if (!user) user = await createUser(gitHubUser.name, gitHubUser.id)
  console.log('Got User')

  //hand out refresh and access tokens
  const {accessToken, refreshToken} = buildTokens(user)
  console.log('Got Tokens')
  //set Tokens in response Object
  setTokens(res, accessToken, refreshToken)
  console.log('Set Tokens')
  //redirect to home page
  console.log('URL:' + `${config.clientUrl}`)
  res.redirect(`${config.clientUrl}/me`)
})

app.post('/refresh', async (req, res) => {})

app.post('/logout', (req, res) => {})

app.post('/logout-all', async (req, res) => {})

app.get('/me', async (req, res) => {})

async function main() {
  await databaseClient.connect()
  await setupUserIndexes()
  app.listen(3000)
}

main()
