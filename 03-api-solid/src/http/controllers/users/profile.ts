import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()
  const {
    user: { email, created_at, id, name },
  } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      id,
      name,
      email,
      created_at,
    },
  })
}
