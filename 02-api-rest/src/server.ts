import fastify from 'fastify'
import { env } from './env'
import { transactionsRotue } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(transactionsRotue, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Runner!!!')
  })
