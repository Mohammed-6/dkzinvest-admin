
export type userProps = {
  _id: string;
  name: string;
  userName: string;
  photo: string;
  zip: number;
  city: string;
  address: string;
  phone: number;
  dob: string;
  panNo: string;
  aadharNo: number;
  state: string;
  email: string;
  password: string;
  securityGroup: string;
  branch: string;
  franchise: string;
  rememberToken: string;
  status: boolean;
  verificationLink: string;
  emailVerified: boolean;
  affiliateCode: string;
  referralId: string;
  verified: boolean;
  details: string;
  kycStatus: number;
  kycInfo: string;
  kycRejectReason: string;
  isBanned: boolean;
  relationship: string;
  created_at: Date;
};

export const listUserProps: userProps[] = [];
