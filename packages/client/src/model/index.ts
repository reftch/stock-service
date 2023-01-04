
export type DynamicObject = { [key: string]: any }

export type Company = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

export type CompanyState = {
  items: Array<Company>;
  item: Company | undefined;
  keyword: string;
}

