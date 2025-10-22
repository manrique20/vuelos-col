import type { Status } from './Enums.interface'

export interface FilterAdministrator {
  filter: string
  offset?: number
  limit: number
  status: string | Status
  role: string
}

export interface Administrator {
  id: string
  photoUrl: null
  fullname: string
  email: string
  password: string
  telephone: string
  verificationCode: string
  type: string
  status: string | Status
  role: string
  createdAt: Date
  updatedAt: Date
}
