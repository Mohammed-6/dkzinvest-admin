
export type investmentProps = {
    _id: string,
    clientId: string,
    planId: string,
    txnNo: string,
    txnId: string,
    particular: string,
    type: string,
    currencyId: string,
    amount: number,
    balance: number,
    description: string,
    modeOfPayment: string,
    maturityDate: string,
    branch: string,
    balanceExpire: boolean,
    invested: boolean,
    reInvest: boolean,
    created_at: Date
}

export type listInvestmentPropss = {
    _id: string,
    clientId: {firstName: string, lastName: string},
    planId: string,
    txnNo: string,
    txnId: string,
    particular: string,
    type: string,
    currencyId: string,
    amount: number,
    balance: number,
    description: string,
    modeOfPayment: string,
    maturityDate: string,
    branch: string,
    balanceExpire: boolean,
    invested: boolean,
    reInvest: boolean,
    created_at: Date
}

export const listInvestmentProps: listInvestmentPropss[] = [];

type investmentsProp = {
    investmentId: string,
    days: number,
    payAmount: number,
    packageName: string,
    investmentAmount: number,
}

export type listProfitSharingProp = {
    clientId: string,
    txnNo: string,
    customerId: string,
    clientName: string,
    capitalInvested: number,
    capitalDate: string,
    packageName: string,
    branch: string,
    createdAt: string,
    investments: [investmentsProp],
    profitAmount: number
}

export type detailProps = {
    data: listProfitSharingProp,
    close: Function
}

export type transProps = {
    data: any,
    close: Function
}

export const listProfitSharingProps: listProfitSharingProp[] = [];

export type listOfProfitSharingProp = {
    initiatedOn: string,
    initiatedBy: string,
    clientName: string,
    clientId: string,
    withdrawDesc: string,
    withdrawAmount: number,
    withdrawId: string,
    adminStatus: boolean,
    paymentStatus: boolean,
}

export const listOfProfitSharingProps: listOfProfitSharingProp[] = [];