import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { investmentProps } from '../types/investment';

export const customerTransaction = (data: investmentProps) => {
    return create.post(serverURL + '/customer-transaction', data, {params: serverHeaders});
}

export const listTransaction = (data: investmentProps) => {
    return create.post(serverURL + '/list-transaction', data, {params: serverHeaders});
}

export const investmentCustomerList = () => {
    return create.post(serverURL + '/investment-customer-list',{}, {params: serverHeaders});
}

export const pushToInvestment = (data: string) => {
    return create.post(serverURL + '/push-to-investment', {_id: data}, {params: serverHeaders});
}

export const pushToReInvestment = (data: string) => {
    return create.post(serverURL + '/push-to-reinvestment', data, {params: serverHeaders});
}

export const pushToPartialInvestment = (data: string) => {
    return create.post(serverURL + '/push-to-partial-reinvestment', data, {params: serverHeaders});
}

export const pushToWithdraw = (data: string) => {
    return create.post(serverURL + '/push-to-investment-withdraw', data, {params: serverHeaders});
}

export const listProfitSharing = (data: string) => {
    return create.post(serverURL + '/list-profit-sharing', data, {params: serverHeaders});
}

export const disburseProfit = (data: any) => {
    return create.post(serverURL + '/disburse-profit', data, {params: serverHeaders});
}

export const listDirbuseProfit = (data: any) => {
    return create.post(serverURL + '/list-disburse-profit', data, {params: serverHeaders});
}

export const adminProfitApprove = (data: any) => {
    return create.post(serverURL + '/admin-profit-approve', data, {params: serverHeaders});
}