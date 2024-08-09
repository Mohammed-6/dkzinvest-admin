import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { franchiseProps } from '../types/franchise';

export const createFranchise = (data: franchiseProps) => {
    return create.post(serverURL + '/create-franchise', data, {params: serverHeaders});
}

export const editFranchise = (data: string) => {
    return create.post(serverURL + '/edit-franchise', {_id: data}, {params: serverHeaders});
}

export const updateFranchise = (data: franchiseProps) => {
    return create.post(serverURL + '/update-franchise', data, {params: serverHeaders});
}

export const listFranchise = () => {
    return create.get(serverURL + '/list-franchise', {params: serverHeaders});
}

export const deleteFranchise = (data: string) => {
    return create.post(serverURL + '/delete-franchise', {_id: data}, {params: serverHeaders});
}
