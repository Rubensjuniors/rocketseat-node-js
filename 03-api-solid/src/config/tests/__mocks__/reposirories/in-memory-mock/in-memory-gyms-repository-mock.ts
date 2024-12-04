import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []
  async create(data: Prisma.GymCreateInput) {
    const { latitude, longitude, title, id, description, phone, CheckIns } =
      data
    const gym = {
      id: id ?? randomUUID(),
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      title,
      description: description ?? null,
      phone: phone ?? null,
      CheckIns,
      createda_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}
