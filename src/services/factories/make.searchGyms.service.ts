import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { SearchGymsService } from '../searchGyms.service'

export function makeSearchGymsService() {
  const service = new SearchGymsService(new PrismaGymsRepository())
  return service
}
