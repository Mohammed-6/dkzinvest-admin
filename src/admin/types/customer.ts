type profileSchema = {
  docId: string,
};

type panCardSchema = {
  docId: string,
  panNo: string;
  nameOnPan: string;
  fatherName: string;
  dob: string;
};
type aadharCardSchema = {
  docId: string,
  aadharNo: string;
  currentAddress: string;
  permanentAddress: string;
};
type aadharBackSchema = {
  docId: string,
};
type bankAccountSchema = {
  docId: string,
  bankName: string;
  accountHolderName: string;
  bankACnumber: string;
  ifscCode: string;
  accountType: string;
  isJointAccount: boolean;
};

type planSchema = {
  _id: string;
  packageName: string;
}
export type customerProps = {
  _id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
  nominee: string;
  referredBy: string;
  branch: string;
  currentPlan: any;
  payoutDuration: string;
  referralEligibility: boolean;
  franchise: string;
  profilePhoto: profileSchema;
  panDetails: panCardSchema;
  aadharDetails: aadharCardSchema;
  aadharBack: aadharBackSchema;
  bankAccountDetails: bankAccountSchema;
  otherDocument: [];
  applicationReason: string;
  applicationStatus: number;
  createdBy: string;
  status: boolean;
  created_at: Date;
};

export const listCustomerProps: customerProps[] = [];

export type customerViewProps = {
    _id: string,
    customerId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    password: string,
    nominee: string,
    referredBy: {
      _id: string,
      firstName: string,
      lastName: string,
    },
    currentPlan: {
      _id: string,
      packageName: string,
      payoutPeriod: string,
    },
    payoutDuration: string,
    referralEligibility: boolean,
    franchise: {
      _id: string,
      name: string,
    },
    profilePhoto: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean,
        approvedBy: string,
      },
      _id: string,
    },
    panDetails: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean,
        approvedBy: string,
      },
      panNo: string,
      nameOnPan: string,
      fatherName: string,
      dob: string,
      _id: string,
    },
    aadharDetails: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean,
        approvedBy: string,
      },
      aadharNo: number,
      currentAddress: string,
      permanentAddress: string,
      _id: string,
    },
    aadharBack: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean
      },
      _id: string,
    },
    bankAccountDetails: {
      docId: {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean,
        approvedBy: string,
      },
      bankName: string,
      accountHolderName: string,
      bankACnumber: string,
      ifscCode: string,
      accountType: string,
      isJointAccount: boolean,
      _id: string,
    },
    otherDocument: [
      {
        _id: string,
        mimetype: string,
        path: string,
        uploadedBy: string,
        docStatus: string,
        status: boolean
      }
    ],
    applicationReason: string,
    applicationStatus: number,
    createdBy: {
      _id: string,
      name: string,
    },
    status: boolean,
    created_at: string,
  }