import {
  FuelType,
  RefuelingMode,
  SearchByBrandCriteria,
  SearchByGeographicAreaCriteria,
  SearchByZoneCriteria,
  ServiceAreaSearchResponse,
} from '../types'

import { Method } from '../util/method'
import { processError } from '../util/utils'
import { StatusCodes } from 'http-status-codes'

export class SearchServiceArea extends Method {
  /**
   * Returns a list of service areas that meet the set criteria.
   * @param criteria Criteria for searching the service area
   * @example
   * ```typescript
   * const criteria: SearchByZoneCriteria = {} // Pass valid criteria!
   * const searchResponse = await client.search.byZone(criteria);
   * console.log(searchResponse);
   * ```
   * @category API
   */
  public async byZone(
    criteria: SearchByZoneCriteria
  ): Promise<ServiceAreaSearchResponse> {
    const url = `search/zone`

    const body = {
      points: criteria.points,
      radius: criteria.radius,
      priceOrder: criteria.priceOrder ?? 'desc',
      fuelType: `${criteria.fuelType ?? FuelType.ALL}-${
        criteria.refuelingMode ?? RefuelingMode.ALL
      }`,
    }

    const response = await this.axiosClient.post<ServiceAreaSearchResponse>(
      url,
      body
    )
    if (response.status === StatusCodes.OK && response.data)
      return response.data
    return processError(response)
  }

  /**
   * Returns a list of service areas that meet the set criteria.
   * @param criteria Criteria for searching the service area
   * @example
   * ```typescript
   * const criteria: SearchByGeographicAreaCriteria = {} // Pass valid criteria!
   * const searchResponse = await client.search.byGeographicArea(criteria);
   * console.log(searchResponse);
   * ```
   * @category API
   */
  public async byGeographicArea(
    criteria: SearchByGeographicAreaCriteria
  ): Promise<ServiceAreaSearchResponse> {
    const url = `search/area`

    const body = {
      region: criteria.region,
      province: criteria.province ?? null,
      town: criteria.town ?? null,
      priceOrder: criteria.priceOrder ?? 'desc',
      fuelType: `${criteria.fuelType ?? FuelType.ALL}-${
        criteria.refuelingMode ?? RefuelingMode.ALL
      }`,
    }

    const response = await this.axiosClient.post<ServiceAreaSearchResponse>(
      url,
      body
    )
    if (response.status === StatusCodes.OK && response.data)
      return response.data
    return processError(response)
  }

  /**
   * Returns a list of service areas present on the highway section.
   * @param highwayId Id of the highway
   * @example
   * ```typescript
   * const searchResponse = await client.search.byHighway("A1");
   * console.log(searchResponse);
   * ```
   * @category API
   */
  public async byHighway(
    highwayId: string
  ): Promise<ServiceAreaSearchResponse> {
    const url = `search/highway`

    const body = {
      highwayId,
    }

    const response = await this.axiosClient.post<ServiceAreaSearchResponse>(
      url,
      body
    )
    if (response.status === StatusCodes.OK && response.data)
      return response.data
    return processError(response)
  }

  /**
   * Returns a list of service areas that meet the set criteria.
   * @param criteria Criteria for searching the service area
   * @example
   * ```typescript
   * const criteria: SearchByBrandCriteria = {} // Pass valid criteria!
   * const searchResponse = await client.search.byBrand(criteria);
   * console.log(searchResponse);
   * ```
   * @category API
   */
  public async byBrand(
    criteria: SearchByBrandCriteria
  ): Promise<ServiceAreaSearchResponse> {
    const url = `search/servicearea`

    const body = {
      region: criteria.region,
      province: criteria.province ?? null,
      priceOrder: criteria.priceOrder ?? 'desc',
      fuelType: `${criteria.fuelType ?? FuelType.ALL}-${
        criteria.refuelingMode ?? RefuelingMode.ALL
      }`,
      queryText: criteria.queryText ?? null,
      brand: criteria.brand ?? null,
    }

    const response = await this.axiosClient.post<ServiceAreaSearchResponse>(
      url,
      body
    )
    if (response.status === StatusCodes.OK && response.data)
      return response.data
    return processError(response)
  }
}
