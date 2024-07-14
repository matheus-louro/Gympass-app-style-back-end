import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository'
import { CreateGymService } from '../createGym.service'

export function makeCreateGymService() {
  const service = new CreateGymService(new PrismaGymsRepository())
  return service
}
