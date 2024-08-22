import axios from "axios";
const create = axios.create();
import { serverHeaders, serverURL } from "../../stuff";
import { customerProps } from "../types/customer";

export const loadCustomerProps = () => {
  return create.get(serverURL + "/load-customer-props", {
    params: serverHeaders,
  });
};

export const uploadFile = (data: File) => {
  return create.post(
    serverURL + "/upload-single",
    { attachment: data },
    {
      params: serverHeaders,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const createCustomer = (data: customerProps) => {
  return create.post(serverURL + "/create-customer", data, {
    params: serverHeaders,
  });
};

export const editCustomer = (data: string) => {
  return create.post(
    serverURL + "/edit-customer",
    { _id: data },
    { params: serverHeaders }
  );
};

export const updateCustomer = (data: customerProps) => {
  return create.post(serverURL + "/update-customer", data, {
    params: serverHeaders,
  });
};

export const listCustomer = () => {
  return create.get(serverURL + "/list-customer", { params: serverHeaders });
};

export const listPageCustomer = () => {
  return create.get(serverURL + "/list-page-customer", {
    params: serverHeaders,
  });
};

export const customerDetail = (data:string) => {
  return create.post(serverURL + "/customer-detail",{_id: data}, { params: serverHeaders });
};

export const updatePPStatus = (data:any) => {
    return create.post(serverURL + "/update-profilePhoto-status", data, { params: serverHeaders });
  };
  
export const updateAadharStatus = (data:any) => {
    return create.post(serverURL + "/update-aadharDetails-status", data, { params: serverHeaders });
  };
  
export const updateBADStatus = (data:any) => {
    return create.post(serverURL + "/update-bankAccountDetails-status", data, { params: serverHeaders });
  };

export const updatePanStatus = (data:any) => {
    return create.post(serverURL + "/update-panDetails-status", data, { params: serverHeaders });
  };
  
export const updateCustomerStatus = (data:any) => {
    return create.post(serverURL + "/update-customer-status", data, { params: serverHeaders });
  };
  
export const updateApplicationStatus = (data:any) => {
    return create.post(serverURL + "/update-customer-application-status", data, { params: serverHeaders });
  };

export const deleteCustomer = (data: string) => {
  return create.post(
    serverURL + "/delete-customer",
    { _id: data },
    { params: serverHeaders }
  );
};
