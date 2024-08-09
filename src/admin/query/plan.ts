import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { planProps } from '../types/plan';

export const createPlan = (data: planProps) => {
    return create.post(serverURL + '/create-plan', data, {params: serverHeaders});
}

export const editPlan = (data: string) => {
    return create.post(serverURL + '/edit-plan', {_id: data}, {params: serverHeaders});
}

export const updatePlan = (data: planProps) => {
    return create.post(serverURL + '/update-plan', data, {params: serverHeaders});
}

export const listPlan = () => {
    return create.get(serverURL + '/list-plan', {params: serverHeaders});
}

export const deletePlan = (data: string) => {
    return create.post(serverURL + '/delete-plan', {_id: data}, {params: serverHeaders});
}
