import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.checkIns.repository'
import { CheckInService } from '../checkIn.service'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'

export function makeCheckInService() {
  const service = new CheckInService(
    new PrismaCheckInsRepository(),
    new PrismaGymsRepository()
  )

  return service
}
