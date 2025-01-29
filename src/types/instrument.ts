export interface IInstrument {
  id: number
  name: string
  price: number
  change: number
  open: number
  high: number
  low: number
  volume: number
  history: {
    [period: string]: number[]
  }
}
