import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check-in.', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS gym',
        description: 'some description',
        phone: '999999999999',
        latitude: -15.5915895,
        longitude: -56.0880094,
      })

    const { gymId } = gymResponse.body

    const checkInResponse = await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.5915895,
        longitude: -56.0880094,
      })

    const { checkInId } = checkInResponse.body

    const response = await request(app.server)
      .patch(`/check-ins/${checkInId}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
