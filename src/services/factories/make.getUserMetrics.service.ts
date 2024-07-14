import { GetUserMetricsService } from '../getUserMetrics.service'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.checkIns.repository'

export function makeGetUserMetricsService() {
  const service = new GetUserMetricsService(new PrismaCheckInsRepository())

  return service
}
