import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { userProps } from '../types/user';


export const loadUserProps = () => {
    return create.get(serverURL + '/load-user-props', {params: serverHeaders});
}

export const createUser = (data: userProps) => {
    return create.post(serverURL + '/create-user', data, {params: serverHeaders});
}

export const editUser = (data: string) => {
    return create.post(serverURL + '/edit-user', {_id: data}, {params: serverHeaders});
}

export const updateUser = (data: userProps) => {
    return create.post(serverURL + '/update-user', data, {params: serverHeaders});
}

export const listUser = () => {
    return create.get(serverURL + '/list-user', {params: serverHeaders});
}

export const deleteUser = (data: string) => {
    return create.post(serverURL + '/delete-user', {_id: data}, {params: serverHeaders});
}
