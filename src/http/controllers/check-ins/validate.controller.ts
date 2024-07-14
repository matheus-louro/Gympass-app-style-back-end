import { makeValidateCheckInService } from '@/services/factories/make.validateCheckIn.service'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInService = makeValidateCheckInService()

  await validateCheckInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
