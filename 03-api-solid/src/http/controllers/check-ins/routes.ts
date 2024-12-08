import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import z from 'zod'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export const checkInsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/check-ins/history',
    {
      schema: {
        tags: ['Check Ins'],
        operationId: 'history',
        description: 'get history..',
        query: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            checkIns: z.array(
              z.object({
                id: z.string(),
                created_at: z.date(),
                validated_at: z.date().nullable(),
                user_id: z.string(),
                gym_id: z.string(),
              }),
            ),
          }),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    history,
  )
  app.get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['Check Ins'],
        operationId: 'metrics',
        description: 'get metrics.',
        response: {
          200: z.object({
            checkInsCount: z.number(),
          }),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    metrics,
  )

  app.post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['Check Ins'],
        operationId: 'checkIns',
        description: 'create check ins.',
        params: z.object({
          gymId: z.string().uuid(),
        }),
        body: z.object({
          latitude: z.coerce.number(),
          longitude: z.coerce.number(),
        }),
        response: {
          201: z.object({}),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    create,
  )

  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Check Ins'],
        operationId: 'checkIns',
        description: 'create check ins.',
        params: z.object({
          checkInId: z.string().uuid(),
        }),
        response: {
          204: z.object({}),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    validate,
  )
}
