export interface IConstituentsInfo {
  name: string;
  shortName: string;
  countryName: string;
  codeInstrument: string;
}

export interface IConstituent {
  codeInstrument: string;
  name: string;
  shortName: string;
  pctDay: number;
  pct30D: number;
  pctCY: number;
  pct1Y: number;
  lastPrice: number;
  datetimeLastPrice: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  tend: 'same' | 'up' | 'down';
  performanceAbsolute: number;
  performanceRelative: number;
}

export interface IConstituentsData {
  info: IConstituentsInfo;
  constituents: IConstituent[];
}
