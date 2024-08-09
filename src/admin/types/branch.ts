
export type branchProps = {
  _id: string;
  name: string;
  code: string;
  location: string;
  contactPerson: string;
  landline: string;
  contactMail: string;
  address: string;
  status: boolean;
  created_at: Date;
};

export type editBranchProps = {
  data: branchProps;
  close?: Function;
}
export const listBranchProps: branchProps[] = [];
