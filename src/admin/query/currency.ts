import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { currencyProps } from '../types/currency';

export const createCurrency = (data: currencyProps) => {
    return create.post(serverURL + '/create-currency', data, {params: serverHeaders});
}

export const editCurrency = (data: string) => {
    return create.post(serverURL + '/edit-currency', {_id: data}, {params: serverHeaders});
}

export const updateCurrency = (data: currencyProps) => {
    return create.post(serverURL + '/update-currency', data, {params: serverHeaders});
}

export const listCurrency = () => {
    return create.get(serverURL + '/list-currency', {params: serverHeaders});
}

export const deleteCurrency = (data: string) => {
    return create.post(serverURL + '/delete-currency', {_id: data}, {params: serverHeaders});
}
