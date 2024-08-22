import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { branchProps } from '../types/branch';

export const createBranch = (data: branchProps) => {
    return create.post(serverURL + '/create-branch', data, {params: serverHeaders});
}

export const editBranch = (data: string) => {
    return create.post(serverURL + '/edit-branch', {_id: data}, {params: serverHeaders});
}

export const updateBranch = (data: branchProps) => {
    return create.post(serverURL + '/update-branch', data, {params: serverHeaders});
}

export const listBranch = () => {
    return create.get(serverURL + '/list-branch', {params: serverHeaders});
}

export const deleteBranch = (data: string) => {
    return create.post(serverURL + '/delete-branch', {_id: data}, {params: serverHeaders});
}
