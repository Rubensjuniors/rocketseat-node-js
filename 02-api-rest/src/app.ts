import fastify from 'fastify'
import { transactionsRotue } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(transactionsRotue, {
  prefix: 'transactions',
})
