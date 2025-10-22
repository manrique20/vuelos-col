export interface TableHeaders {
  field: string
  type?: string
  header: string
  headerStyle?: string | object
  headerClass?: string | object
  service?: string
  fieldClass?: string
  subFieldClass?: string
  subField?: string
  enum?: string
}

export interface TableFields {
  headers: TableHeaders[]
  empty: string
  loading: boolean
  limit: number
  pages: number
}
