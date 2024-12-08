import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { create } from './create'
import z from 'zod'
import { nearby } from './nearby'
import { search } from './search'

export const gymsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.addHook('onRequest', verifyJWT)
  app.get(
    '/gyms/search',
    {
      schema: {
        tags: ['Gyms'],
        operationId: 'gymsSearch',
        description: 'Search gym.',
        query: z.object({
          q: z.string(),
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            gyms: z.array(
              z.object({
                description: z.string().nullable(),
                id: z.string(),
                title: z.string(),
                phone: z.string().nullable(),
                latitude: z.coerce.number(),
                longitude: z.coerce.number(),
              }),
            ),
          }),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    search,
  )
  app.get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        operationId: 'gymsNearby',
        description: 'Nearby gym.',
        query: z.object({
          latitude: z.coerce.number(),
          longitude: z.coerce.number(),
        }),
        response: {
          200: z.object({
            gyms: z.array(
              z.object({
                description: z.string().nullable(),
                id: z.string(),
                title: z.string(),
                phone: z.string().nullable(),
                latitude: z.coerce.number(),
                longitude: z.coerce.number(),
              }),
            ),
          }),
          // 409: z.object({ message: z.string() }),
        },
      },
    },
    nearby,
  )

  app.post(
    '/gyms',
    {
      schema: {
        tags: ['Gyms'],
        operationId: 'gyms',
        description: 'create gym.',
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
          phone: z.string().nullable(),
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
}
