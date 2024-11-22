import fastify from 'fastify'
import { knex } from './db/database'
import { randomUUID } from 'node:crypto'

const server = fastify()

server.get('/', async () => {
  const transactions = await knex('transactions').insert({
    id: randomUUID(),
    title: 'Tranasaction Teste',
    amount: 1000,
  })

  return transactions
})

server
  .listen({
    port: 4444,
  })
  .then(() => {
    console.log('HTTP Server Runner!!!')
  })
