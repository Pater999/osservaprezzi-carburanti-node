import { FuelsApiClient } from '../src'

test('Valid axios instance', () => {
  const fuelsClient = new FuelsApiClient()
  expect(fuelsClient.axiosClient).toBeTruthy()
})
