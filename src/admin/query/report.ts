import axios from 'axios';
const create = axios.create();
import {serverHeaders, serverURL} from '../../stuff'
// import  from '../types/report';

export const listPlanReport = () => {
    return create.get(serverURL + '/report-plan', {params: serverHeaders});
}

export const listPlanWiseReport = (data:string) => {
    return create.post(serverURL + '/plan-wise-users',{currentPlan: data}, {params: serverHeaders});
}

export const listPlanExpiriesReport = (data:string) => {
    return create.post(serverURL + '/list-plan-expires',{type: data}, {params: serverHeaders});
}