import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { AuthenticateService } from '../authenticate.service'

export function makeAuthenticateService() {
  const authenticateService = new AuthenticateService(
    new PrismaUsersRepository()
  )

  return authenticateService
}
