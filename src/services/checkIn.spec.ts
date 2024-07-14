import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemory.checkIns.repository'
import { CheckInService } from './checkIn.service'
import { InMemoryGymsRepository } from '@/repositories/inMemory/inMemory.gyms.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-id',
      title: 'jsGym',
      description: '',
      phone: '',
      latitude: -15.5915895,
      longitude: -56.0880094,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.5915895,
      userLongitude: -56.0880094,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.5915895,
      userLongitude: -56.0880094,
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -15.5915895,
        userLongitude: -56.0880094,
      })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.5915895,
      userLongitude: -56.0880094,
    })

    vi.setSystemTime(new Date(2022, 1, 21, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -15.5915895,
      userLongitude: -56.0880094,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'jsGym',
      description: '',
      phone: '',
      latitude: new Decimal(-15.4591),
      longitude: new Decimal(-55.9744794),
      created_at: new Date(),
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: -15.5915895,
        userLongitude: -56.0880094,
      })
    }).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
