import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
import { loginProps } from '../types/login';

export const adminLogin = (data: loginProps) => {
    return create.post(serverURL + '/login', data);
}
export const changePassword = (data: any) => {
    return create.post(serverURL + '/change-password', data, {params: serverHeaders});
}