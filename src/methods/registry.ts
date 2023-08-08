import {
  BrandLogo,
  BrandsLogosListResponse,
  ListItem,
  ListResponse,
  ServiceAreaDetail,
} from '../types'

import { Method } from '../util/method'
import { processError } from '../util/utils'
import { StatusCodes } from 'http-status-codes'

export class Registry extends Method {
  /**
   * Returns a service area detail.
   * @param serviceAreaId The service area identifier
   * @example
   * ```typescript
   * const serviceArea = await client.registry.serviceArea(52621);
   * console.log(serviceArea);
   * ```
   * @category API
   */
  public async serviceArea(serviceAreaId: number): Promise<ServiceAreaDetail> {
    const url = `registry/servicearea/${serviceAreaId}`

    const response = await this.axiosClient.get<ServiceAreaDetail>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data
    return processError(response)
  }

  /**
   * Returns italian highways list.
   * @example
   * ```typescript
   * const highways = await client.registry.highwaysList();
   * console.log(highways);
   * ```
   * @category API
   */
  public async highwaysList(): Promise<Array<ListItem>> {
    const url = `registry/highway`

    const response = await this.axiosClient.get<ListResponse>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data.results
    return processError(response)
  }

  /**
   * Returns fuels brands list.
   * @example
   * ```typescript
   * const brands = await client.registry.brandsList();
   * console.log(brands);
   * ```
   * @category API
   */
  public async brandsList(): Promise<Array<ListItem>> {
    const url = `registry/brands`

    const response = await this.axiosClient.get<ListResponse>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data.results
    return processError(response)
  }

  /**
   * Returns brands logos list.
   * @example
   * ```typescript
   * const brandsLogos = await client.registry.brandsLogosList();
   * console.log(brandsLogos);
   * ```
   * @category API
   */
  public async brandsLogosList(): Promise<Array<BrandLogo>> {
    const url = `registry/alllogos`

    const response = await this.axiosClient.get<BrandsLogosListResponse>(
      url,
      {}
    )
    if (response.status === StatusCodes.OK && response.data)
      return response.data.loghi
    return processError(response)
  }

  /**
   * Returns italian regions list.
   * @example
   * ```typescript
   * const regions = await client.registry.regionsList();
   * console.log(regions);
   * ```
   * @category API
   */
  public async regionsList(): Promise<Array<ListItem>> {
    const url = `registry/region`

    const response = await this.axiosClient.get<ListResponse>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data.results
    return processError(response)
  }

  /**
   * Returns italian province list by regionId.
   * @param regionId The region identifier
   * @example
   * ```typescript
   * const provinces = await client.registry.provincesList(1);
   * console.log(provinces);
   * ```
   * @category API
   */
  public async provincesList(regionId: number): Promise<Array<ListItem>> {
    const url = `registry/province?regionId=${regionId}`

    const response = await this.axiosClient.get<ListResponse>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data.results
    return processError(response)
  }

  /**
   * Returns italian town list by provinceId.
   * @param provinceId The province identifier (ex. "MN")
   * @example
   * ```typescript
   * const towns = await client.registry.townsList("MN");
   * console.log(towns);
   * ```
   * @category API
   */
  public async townsList(provinceId: string): Promise<Array<ListItem>> {
    const url = `registry/town?province=${provinceId}`

    const response = await this.axiosClient.get<ListResponse>(url, {})
    if (response.status === StatusCodes.OK && response.data)
      return response.data.results
    return processError(response)
  }
}
