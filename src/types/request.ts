import { FuelType, RefuelingMode } from './enums'

import { MapPoint } from './shared'

export interface SearchBaseCriteria {
  fuelType?: FuelType
  refuelingMode?: RefuelingMode
  priceOrder?: 'asc' | 'desc'
}

export interface SearchByZoneCriteria extends SearchBaseCriteria {
  points: MapPoint[],
  radius: number;
}

export interface SearchByGeographicAreaCriteria extends SearchBaseCriteria {
  province?: string
  region: number
  town?: string
}

export interface SearchByBrandCriteria extends SearchBaseCriteria {
  province?: string
  region?: number
  brand?: string
  queryText?: string
}
