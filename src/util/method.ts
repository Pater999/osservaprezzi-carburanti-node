import { AxiosInstance } from 'axios'

/** @internal */
export abstract class Method {
  /** @internal */
  protected axiosClient: AxiosInstance

  /** @internal */
  constructor(client: AxiosInstance) {
    this.axiosClient = client
  }
}
