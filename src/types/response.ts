import { MapPoint } from './shared'

export interface ServiceArea {
  id: number
  name: string
  fuels: Fuel[]
  location: MapPoint
  insertDate: Date
  address: string
  brand: string
}

export interface ServiceAreaDetail {
  id: number
  name: string
  address: string
  brand: string
  fuels: FuelDetail[]
  phoneNumber: string
  email: string
  website: string
  company: string
  services: ServiceAreaService[]
  orariapertura: OpeningHours[]
}

export interface OpeningHours {
  orariAperturaId: number
  giornoSettimanaId: number
  oraAperturaMattina?: unknown
  oraChiusuraMattina?: unknown
  oraAperturaPomeriggio?: unknown
  oraChiusuraPomeriggio?: unknown
  flagOrarioContinuato: boolean
  oraAperturaOrarioContinuato?: unknown
  oraChiusuraOrarioContinuato?: unknown
  flagH24: boolean
  flagChiusura: boolean
  flagNonComunicato: boolean
  flagServito: boolean
  flagSelf: boolean
}

export interface ServiceAreaService {
  id: string
  description: string
}

export interface FuelDetail extends Fuel {
  serviceAreaId: number
  insertDate: Date
  validityDate: Date
}

export interface Fuel {
  id: number
  price: number
  name: string
  fuelId: number
  isSelf: boolean
}

export interface ApiError {
  timestamp: Date
  status: number
  error: string
  message: string
  path: string
}

export interface ListItem {
  description: string
  id: string
}

export interface ListResponse {
  results: Array<ListItem>
}

export interface LogoMarker {
  content: string
  estensione: 'png' | 'svg' | 'jpg'
  tipoFile: 'th5' | 'th4' | 'th3' | 'th2' | 'th1' | 'logo'
}

export interface BrandLogo {
  bandiera: string
  bandieraId: number
  carburantiList: unknown | null
  isEliminabile: boolean | null
  logoMarkerList: Array<LogoMarker>
}

export interface BrandsLogosListResponse {
  loghi: Array<BrandLogo>
}

export interface ServiceAreaSearchResponse {
  success: boolean
  center: MapPoint
  results: ServiceArea[]
}
