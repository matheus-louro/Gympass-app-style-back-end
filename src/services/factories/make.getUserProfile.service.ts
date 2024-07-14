import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { GetUserProfileService } from '../getUserProfile.service'

export function makeGetUserProfileService() {
  const service = new GetUserProfileService(new PrismaUsersRepository())

  return service
}
