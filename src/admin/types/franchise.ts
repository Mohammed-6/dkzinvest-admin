
export type franchiseProps = {
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

export type editFranchiseProps = {
  data: franchiseProps;
  close?: Function;
}
export const listFranchiseProps: franchiseProps[] = [];
