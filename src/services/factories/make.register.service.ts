import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository'
import { RegisterService } from '../register.service'

export function makeRegisterService() {
  const registerService = new RegisterService(new PrismaUsersRepository())

  return registerService
}
