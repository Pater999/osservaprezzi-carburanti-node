import { getReasonPhrase, StatusCodes } from 'http-status-codes'

import { ApiError } from '../types'
import { ApiException } from './apiException'
import { AxiosResponse } from 'axios'

export const processError = (response: AxiosResponse) => {
  const status = response.status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _headers: any = {}
  if (response.headers && typeof response.headers === 'object') {
    for (const k in response.headers) {
      // eslint-disable-next-line no-prototype-builtins
      if (response.headers.hasOwnProperty(k)) {
        _headers[k] = response.headers[k]
      }
    }
  }
  const _response: ApiError = response.data
  throw new ApiException(
    _response?.error ??
      getReasonPhrase(!_response ? StatusCodes.NOT_FOUND : status),
    !_response ? StatusCodes.NOT_FOUND : status,
    _response,
    _headers
  )
}
