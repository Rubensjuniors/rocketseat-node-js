import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUsers = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsers)

  return registerUseCase
}
