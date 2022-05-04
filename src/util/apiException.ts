import { ApiError } from '../types'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiException extends Error {
  message: string
  status: number
  response: ApiError
  headers: { [key: string]: any }

  constructor(
    message: string,
    status: number,
    response: ApiError,
    headers: { [key: string]: any }
  ) {
    super()

    this.message = message
    this.status = status
    this.response = response
    this.headers = headers
  }

  protected isApiException = true

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true
  }
}
