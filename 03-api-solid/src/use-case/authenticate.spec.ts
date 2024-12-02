import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepositoryMock } from '__mocks__/reposirories/in-memory-mock/in-memory-users-repository-mock'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepositoryMock()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Joh Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepositoryMock()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepositoryMock()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Joh Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123433',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
