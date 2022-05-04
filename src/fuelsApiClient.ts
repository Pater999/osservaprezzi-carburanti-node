import axios, { AxiosInstance } from 'axios'

import { Registry } from './methods/registry'
import { SearchServiceArea } from './methods/search'

export class FuelsApiClient {
  readonly apiUrl: string = 'https://carburanti.mise.gov.it/ospzApi/'
  readonly axiosClient: AxiosInstance

  /**
   * Create a new instance of the API client.
   * @param baseUrl Your Osservatorio prezzi carburanti base url
   * @param customAxiosInstance Your custom axios instance
   */
  constructor(baseUrl?: string, customAxiosInstance?: AxiosInstance) {
    if (baseUrl) this.apiUrl = baseUrl

    this.axiosClient =
      customAxiosInstance ??
      axios.create({
        baseURL: this.apiUrl,
        responseType: 'json',
        headers: { 'User-Agent': 'osservatorio-prezzi-node-wrapper' },
      })

    this.axiosClient.defaults.baseURL = this.apiUrl

    this.registry = new Registry(this.axiosClient)
    this.search = new SearchServiceArea(this.axiosClient)
  }

  /**
   * Returns registry data, such as service area detail, highways, brands lists, etc.
   * @example
   * ```typescript
   * const serviceArea = await client.registry.serviceArea(52621);
   * console.log(serviceArea);
   * ```
   * @category API
   */
  public registry: Registry

  /**
   * Service area searching methods, search by points, region, highway, brand...
   * @example
   * ```typescript
   * const criteria: SearchByBrandCriteria = {} // Pass valid criteria!
   * const searchResponse = await client.search.byBrand(criteria);
   * console.log(searchResponse);
   * ```
   * @category API
   */
  public search: SearchServiceArea
}
