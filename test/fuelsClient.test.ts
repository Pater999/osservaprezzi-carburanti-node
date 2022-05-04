import { FuelsApiClient } from '../src'

test('Valid axios instanceaa', () => {
  const fuelsClient = new FuelsApiClient()
  expect(fuelsClient.axiosClient).toBeTruthy()
})
