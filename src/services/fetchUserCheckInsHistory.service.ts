import { CheckInsRepository } from '@/repositories/checkIns.repository'
import { CheckIn } from '@prisma/client'

interface FecthUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface FecthUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FecthUserCheckInsHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FecthUserCheckInsHistoryServiceRequest): Promise<FecthUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
