import http from 'node:http'
import { v4 as  uuidv4 }from "uuid";
import {json} from './middlewars/json.js'
import { Database } from './database.js';

// - Criar usuários
// - Listagem usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//   - Método HTTP
//   - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// GET /users => Buscando usuários no banc-end
// POST /users => Criar um usuário no back-end

// Stateful - Stateless
// Cabeçalhos (Requisição/resposta) => Metadados

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  const generateRandomId = () => uuidv4();

  await json(req, res)

  if (method === 'GET' && url === '/users'){
    const users = database.select('users')
    return res
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users'){
    const user = {
      id: generateRandomId(),
      name: req.body.name,
      age: req.body.age
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)