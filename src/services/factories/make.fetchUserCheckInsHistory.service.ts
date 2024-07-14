import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.checkIns.repository'
import { FecthUserCheckInsHistoryService } from '../fetchUserCheckInsHistory.service'

export function makeFetchUserCheckInsHistoryService() {
  const service = new FecthUserCheckInsHistoryService(
    new PrismaCheckInsRepository()
  )
  return service
}
