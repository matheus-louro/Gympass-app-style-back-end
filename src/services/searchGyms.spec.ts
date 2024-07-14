import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemory.gyms.repository'
import { SearchGymsService } from './searchGyms.service'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: null,
      phone: null,
      latitude: -15.5915895,
      longitude: -56.0880094,
    })

    await gymsRepository.create({
      title: 'C++ Gym',
      description: null,
      phone: null,
      latitude: -15.5915895,
      longitude: -56.0880094,
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: null,
        phone: null,
        latitude: -15.5915895,
        longitude: -56.0880094,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Gym 21' }),
      expect.objectContaining({ title: 'JS Gym 22' }),
    ])
  })
})
