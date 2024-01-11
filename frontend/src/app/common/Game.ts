
export interface ApiResult {
  info:Info
  results:Game[]
}
export interface Info {
  page:string
  pageSize:string
}


export interface Game {
  _id: string;
  nombre: string;
  edadMinima: number;
  precio: number;
  categoria: string;
  __v?: number;
}
