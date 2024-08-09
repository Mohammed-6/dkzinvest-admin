

type planwiseReportProps = {
    investmentId: string,
    customerId: string,
    clientName: string,
    capitalInvested: number,
    capitalDate: string,
    maturityDate: string,
    payoutOutTimePeriod: string,
    branch: string,
    phone: string,
    createdBy: string,
    createdAt: string,
  }
  export const listPlanwiseReportProps: planwiseReportProps[] = [];
  
  
export type editReportProps = {
    data: any;
    invid: string;
    close?: Function;
  }