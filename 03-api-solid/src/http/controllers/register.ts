import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '../../use-case/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-case/errors/user-already-exists-error'

const prismaUsers = new PrismaUsersRepository()
const registerUseCase = new RegisterUseCase(prismaUsers)

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = requestBodySchema.parse(request.body)


  try {
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if(err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

   throw err
  }

  return reply.status(201).send()
}
