import { register } from '@/http/controllers/users/register'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export const appRoutes: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        operationId: 'createUser',
        description: 'Create user.',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({}),
          409: z.object({ message: z.string() }),
        },
      },
    },
    register,
  )
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['users'],
        operationId: 'sessionsUser',
        description: 'Sessions user.',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({ token: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    authenticate,
  )

  /** Authenticated */
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['me'],
        operationId: 'meUser',
        description: 'get user.',
      },
    },
    profile,
  )
}
