
export type planProps = {
  _id: string;
  packageName: string,
  duration: number,
  percentage: number,
  payoutPeriod: string,
  capitalReturn: boolean,
  withdrawInstallment: number,
  minAmount: number,
  maxAmount: number,
  terms: string,
  offerClaim: string,
  banner: string,
  status: boolean,
  created_at: Date;
};

export type editPlanProps = {
  data: planProps;
  close?: Function;
}
export const listplanProps: planProps[] = [];
