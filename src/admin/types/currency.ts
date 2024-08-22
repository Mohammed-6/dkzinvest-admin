
export type currencyProps = {
  _id: string;
  currencyCode: string;
  country: string;
  created_at: Date;
};

export type editCurrencyProps = {
  data: currencyProps|any;
  close?: Function;
}
export const listCurrencyProps: currencyProps[] = [];
