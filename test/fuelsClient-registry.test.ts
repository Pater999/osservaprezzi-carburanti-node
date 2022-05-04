import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { ApiException } from '../src/util/apiException'
import { FuelsApiClient } from '../src'

const SERVICE_AREA_ID = 52621

test('Get service area detail by ServiceAreaId success', async () => {
  const fuelsClient = new FuelsApiClient()
  const serviceArea = await fuelsClient.registry.serviceArea(52621)
  expect(serviceArea).toBeTruthy()
  expect(serviceArea.id).toStrictEqual(SERVICE_AREA_ID)
  expect(serviceArea.fuels.length).toBeGreaterThan(0)
})

test('Get service area detail by ServiceAreaId not found', async () => {
  try {
    const fuelsClient = new FuelsApiClient()
    await fuelsClient.registry.serviceArea(-1)
  } catch (err) {
    const error = err as ApiException
    expect(error).toBeTruthy()
    expect(error.status).toStrictEqual(StatusCodes.NOT_FOUND)
    expect(error.message).toStrictEqual(ReasonPhrases.NOT_FOUND)
  }
})

test('Get highways list', async () => {
  const fuelsClient = new FuelsApiClient()
  const highways = await fuelsClient.registry.highwaysList()
  expect(highways).toBeTruthy()
  expect(highways.length).toBeGreaterThan(0)
  expect(highways).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'A22 BRENNERO-MODENA',
        id: 'A22-40',
      }),
      expect.objectContaining({
        description: 'A25 ROMA-PESCARA',
        id: 'A25-45',
      }),
    ])
  )
})

test('Get brands list', async () => {
  const fuelsClient = new FuelsApiClient()
  const brands = await fuelsClient.registry.brandsList()
  expect(brands).toBeTruthy()
  expect(brands.length).toBeGreaterThan(0)
  expect(brands).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'Esso',
        id: '5',
      }),
      expect.objectContaining({
        description: 'Q8',
        id: '2',
      }),
    ])
  )
})

test('Get brands logos list', async () => {
  const fuelsClient = new FuelsApiClient()
  const brandsLogos = await fuelsClient.registry.brandsLogosList()
  expect(brandsLogos).toBeTruthy()
  expect(brandsLogos.length).toBeGreaterThan(0)
  expect(brandsLogos).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        bandiera: 'Esso',
        bandieraId: 5,
      }),
      expect.objectContaining({
        bandiera: 'Q8',
        bandieraId: 2,
      }),
    ])
  )
}, 20000)

test('Get italian regions list', async () => {
  const fuelsClient = new FuelsApiClient()
  const regions = await fuelsClient.registry.regionsList()
  expect(regions).toBeTruthy()
  expect(regions.length).toEqual(20)
  expect(regions).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'Abruzzo',
      }),
      expect.objectContaining({
        description: 'Molise',
      }),
      expect.objectContaining({
        description: 'Piemonte',
      }),
      expect.objectContaining({
        description: 'Lombardia',
      }),
    ])
  )
})

test('Get italian provinces of Lombardia', async () => {
  const fuelsClient = new FuelsApiClient()
  const provinces = await fuelsClient.registry.provincesList(19)
  expect(provinces).toBeTruthy()
  expect(provinces.length).toEqual(12)
  expect(provinces).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'Milano',
      }),
      expect.objectContaining({
        description: 'Varese',
      }),
      expect.objectContaining({
        description: 'Como',
      }),
      expect.objectContaining({
        description: 'Bergamo',
      }),
      expect.objectContaining({
        description: 'Brescia',
      }),
      expect.objectContaining({
        description: 'Lodi',
      }),
    ])
  )
})

test('Get italian provinces by an invalid regionId', async () => {
  const fuelsClient = new FuelsApiClient()
  const provinces = await fuelsClient.registry.provincesList(44)
  expect(provinces).toBeTruthy()
  expect(provinces.length).toEqual(0)
})

test('Get italian towns of Milano province', async () => {
  const fuelsClient = new FuelsApiClient()
  const towns = await fuelsClient.registry.townsList('MI')
  expect(towns).toBeTruthy()
  expect(towns.length).toBeGreaterThan(20)
  expect(towns).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        description: 'Milano',
      }),
    ])
  )
})

test('Get italian towns by an invalid provinceId', async () => {
  const fuelsClient = new FuelsApiClient()
  const provinces = await fuelsClient.registry.townsList('INVALID')
  expect(provinces).toBeTruthy()
  expect(provinces.length).toEqual(0)
})
