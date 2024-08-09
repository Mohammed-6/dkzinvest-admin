import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { securityGroupProps } from '../types/security-group';

export const loadSecuritySchema = () => {
    return create.get(serverURL + '/load-security-group-schema', {params: serverHeaders});
}

export const createSecurityGroup = (data: securityGroupProps) => {
    return create.post(serverURL + '/create-security-group', data, {params: serverHeaders});
}

export const editSecurityGroup = (data: string) => {
    return create.post(serverURL + '/edit-security-group', {_id: data}, {params: serverHeaders});
}

export const updateSecurityGroup = (data: securityGroupProps) => {
    return create.post(serverURL + '/update-security-group', data, {params: serverHeaders});
}

export const listSecurityGroup = () => {
    return create.get(serverURL + '/list-security-group', {params: serverHeaders});
}

export const deleteSecurityGroup = (data: string) => {
    return create.post(serverURL + '/delete-security-group', {_id: data}, {params: serverHeaders});
}
