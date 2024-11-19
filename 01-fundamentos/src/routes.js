import { Database } from './database.js';
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')
    return res
    .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const user = {
        id: randomUUID(),
        name: req.body.name,
        age: req.body.age
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    url: '/users/:ID',
    handler: (req, res) => {

    }
  }
]