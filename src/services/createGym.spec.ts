import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterService } from './register.service'
import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemory.users.repository'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemory.gyms.repository'
import { CreateGymService } from './createGym.service'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -15.5915895,
      longitude: -56.0880094,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
