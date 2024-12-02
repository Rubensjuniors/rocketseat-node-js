import z from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-case/errors/invalid-credentials-error'
import { makeAuthenticateuseCase } from '@/use-case/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateuseCase()
    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
