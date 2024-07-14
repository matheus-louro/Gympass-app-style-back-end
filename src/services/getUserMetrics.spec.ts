import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/inMemory/inMemory.checkIns.repository'
import { GetUserMetricsService } from './getUserMetrics.service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    })
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
