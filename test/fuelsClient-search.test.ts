import {
  FuelType,
  RefuelingMode,
  SearchByBrandCriteria,
  SearchByGeographicAreaCriteria,
  SearchByZoneCriteria,
} from '../src/types'

import { FuelsApiClient } from '../src'

test('Search service area by zone', async () => {
  const fuelsClient = new FuelsApiClient()
  const searchCriteria: SearchByZoneCriteria = {
    points: [
      { lat: 42.32843626674558, lng: 12.188716303785915 },
      { lat: 42.389322963743865, lng: 12.37136400886404 },
      { lat: 42.31726730642802, lng: 12.44277514167654 },
    ],
    fuelType: FuelType.ALL,
    refuelingMode: RefuelingMode.ALL,
    priceOrder: 'asc',
  }
  const searchResponse = await fuelsClient.search.byZone(searchCriteria)
  expect(searchResponse).toBeTruthy()
  expect(searchResponse.success).toBeTruthy()
  expect(searchResponse.results.length).toBeGreaterThan(2)
  expect(searchResponse.results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        address: expect.any(String),
        brand: expect.any(String),
        location: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number),
        }),
        fuels: expect.arrayContaining([
          expect.objectContaining({
            price: expect.any(Number),
            name: expect.any(String),
            fuelId: expect.any(Number),
            isSelf: expect.any(Boolean),
          }),
        ]),
      }),
    ])
  )
})

test('Search service area by geographic area', async () => {
  const fuelsClient = new FuelsApiClient()
  const searchCriteria: SearchByZoneCriteria = {
    points: [],
    fuelType: FuelType.ALL,
    refuelingMode: RefuelingMode.ALL,
    priceOrder: 'asc',
  }
  const searchResponse = await fuelsClient.search.byZone(searchCriteria)
  expect(searchResponse).toBeTruthy()
  expect(searchResponse.success).toBeFalsy()
})

test('Search service area by region Abruzzo', async () => {
  const fuelsClient = new FuelsApiClient()
  const searchCriteria: SearchByGeographicAreaCriteria = {
    region: 1,
  }
  const searchResponse = await fuelsClient.search.byGeographicArea(
    searchCriteria
  )
  expect(searchResponse).toBeTruthy()
  expect(searchResponse.success).toBeTruthy()
  expect(searchResponse.results.length).toBeGreaterThan(2)
  expect(searchResponse.results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        address: expect.any(String),
        brand: expect.any(String),
        location: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number),
        }),
        fuels: expect.arrayContaining([
          expect.objectContaining({
            price: expect.any(Number),
            name: expect.any(String),
            fuelId: expect.any(Number),
            isSelf: expect.any(Boolean),
          }),
        ]),
      }),
    ])
  )
})

test('Search service area by highway A1', async () => {
  const fuelsClient = new FuelsApiClient()
  const searchResponse = await fuelsClient.search.byHighway('A1')
  expect(searchResponse).toBeTruthy()
  expect(searchResponse.success).toBeTruthy()
  expect(searchResponse.results.length).toBeGreaterThan(2)
  expect(searchResponse.results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        address: expect.any(String),
        brand: expect.any(String),
        location: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number),
        }),
        fuels: expect.arrayContaining([
          expect.objectContaining({
            price: expect.any(Number),
            name: expect.any(String),
            fuelId: expect.any(Number),
            isSelf: expect.any(Boolean),
          }),
        ]),
      }),
    ])
  )
})

test('Search service area by brand and region', async () => {
  const fuelsClient = new FuelsApiClient()
  const criteria: SearchByBrandCriteria = { brand: '1', region: 5 }
  const searchResponse = await fuelsClient.search.byBrand(criteria)
  expect(searchResponse).toBeTruthy()
  expect(searchResponse.success).toBeTruthy()
  expect(searchResponse.results.length).toBeGreaterThan(10)
  expect(searchResponse.results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        address: expect.any(String),
        brand: expect.stringMatching('AgipEni'),
        location: expect.objectContaining({
          lat: expect.any(Number),
          lng: expect.any(Number),
        }),
        fuels: expect.arrayContaining([
          expect.objectContaining({
            price: expect.any(Number),
            name: expect.any(String),
            fuelId: expect.any(Number),
            isSelf: expect.any(Boolean),
          }),
        ]),
      }),
    ])
  )
})
