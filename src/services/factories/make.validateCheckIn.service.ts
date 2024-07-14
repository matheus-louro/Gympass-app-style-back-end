import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma.checkIns.repository'
import { ValidateCheckInService } from '../validateCheckIn.service'

export function makeValidateCheckInService() {
  const service = new ValidateCheckInService(new PrismaCheckInsRepository())
  return service
}
