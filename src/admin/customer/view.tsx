import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  createCustomer,
  listCustomer,
  uploadFile,
  editCustomer,
  updateCustomer,
  customerDetail,
  updatePanStatus,
  updatePPStatus,
  updateAadharStatus,
  updateBADStatus,
  updateApplicationStatus,
  updateCustomerStatus,
} from "../query/customer";
import { toast } from "react-toastify";
import {
  customerProps,
  customerViewProps,
  listCustomerProps,
} from "../types/customer";
import { serverURL } from "@/src/stuff";
import { useRouter } from "next/router";

const CreateSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<customerViewProps>({
    _id: "",
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    password: "",
    nominee: "",
    referredBy: {
      _id: "",
      firstName: "",
      lastName: "",
    },
    currentPlan: {
      _id: "",
      packageName: "",
      payoutPeriod: "",
    },
    payoutDuration: "",
    referralEligibility: false,
    franchise: {
      _id: "",
      name: "",
    },
    profilePhoto: {
      docId: {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
        approvedBy: "",
      },
      _id: "",
    },
    panDetails: {
      docId: {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
        approvedBy: "",
      },
      panNo: "",
      nameOnPan: "",
      fatherName: "",
      dob: "",
      _id: "",
    },
    aadharDetails: {
      docId: {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
        approvedBy: "",
      },
      aadharNo: 0,
      currentAddress: "",
      permanentAddress: "",
      _id: "",
    },
    aadharBack: {
      docId: {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
      },
      _id: "",
    },
    bankAccountDetails: {
      docId: {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
        approvedBy: "",
      },
      bankName: "",
      accountHolderName: "",
      bankACnumber: "",
      ifscCode: "",
      accountType: "",
      isJointAccount: false,
      _id: "",
    },
    otherDocument: [
      {
        _id: "",
        mimetype: "",
        path: "",
        uploadedBy: "",
        docStatus: "",
        status: false,
      },
    ],
    applicationReason: "",
    applicationStatus: 0,
    createdBy: {
      _id: "",
      name: "",
    },
    status: false,
    created_at: "",
  });
  const [asdata, setasdata] = useState<any>({
    _id: "",
    applicationStatus: 0,
    applicationReason: "",
  });
  useEffect(() => {
    if (router.query.id !== undefined) {
      customerDetail(router.query.id as string)
        .then((cus) => {
          setcollectdata(cus.data.data);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.statusText);
          } else {
            toast.error("Something went wrong");
          }
        });
    }
  }, [router.isReady]);

  const changePancard = (data: string) => {
    let colte = {};
    if (data == "approve") {
      colte = {
        _id: router.query.id,
        docStatus: "approved",
        status: true,
      };
    } else if (data == "reject") {
      colte = {
        _id: router.query.id,
        docStatus: "rejected",
        status: false,
      };
    }
    updatePanStatus(colte)
      .then((res) => {
        console.log(res);
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const changePPcard = (data: string) => {
    let colte = {};
    if (data == "approve") {
      colte = {
        _id: router.query.id,
        docStatus: "approved",
        status: true,
      };
    } else if (data == "reject") {
      colte = {
        _id: router.query.id,
        docStatus: "rejected",
        status: false,
      };
    }
    updatePPStatus(colte)
      .then(() => {
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const changeAadharcard = (data: string) => {
    let colte = {};
    if (data == "approve") {
      colte = {
        _id: router.query.id,
        docStatus: "approved",
        status: true,
      };
    } else if (data == "reject") {
      colte = {
        _id: router.query.id,
        docStatus: "rejected",
        status: false,
      };
    }
    updateAadharStatus(colte)
      .then(() => {
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const changeBADcard = (data: string) => {
    let colte = {};
    if (data == "approve") {
      colte = {
        _id: router.query.id,
        docStatus: "approved",
        status: true,
      };
    } else if (data == "reject") {
      colte = {
        _id: router.query.id,
        docStatus: "rejected",
        status: false,
      };
    }
    updateBADStatus(colte)
      .then(() => {
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const formTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const evt = e.target as HTMLTextAreaElement;
    setasdata({ ...asdata, applicationReason: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setasdata({ ...asdata, applicationStatus: evt.value });
  };

  const applicationFormSubmit = () => {
    const colte = asdata;
    colte._id = router.query.id;
    updateApplicationStatus(colte)
      .then(() => {
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  const changeCustomerStatus = (data: string) => {
    let colte = {};
    if (data == "approve") {
      colte = {
        _id: router.query.id,
        status: true,
      };
    } else if (data == "reject") {
      colte = {
        _id: router.query.id,
        status: false,
      };
    }
    updateCustomerStatus(colte)
      .then(() => {
        toast.success("Customer successfully updated");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-header">View Customer</div>
        <div className="card-body">
          <h2 className="text-md text-primary font-bold">Personol Details</h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="">
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Frist Name:</div>
                  <div className="col-span-8">{collectdata.firstName}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Last Name:</div>
                  <div className="col-span-8">{collectdata.lastName}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Email:</div>
                  <div className="col-span-8">{collectdata.email}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Phone:</div>
                  <div className="col-span-8">{collectdata.phone}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Nominee:</div>
                  <div className="col-span-8">{collectdata.nominee}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Referred By:</div>
                  <div className="col-span-8">
                    {collectdata?.referredBy?.firstName +
                      " " +
                      collectdata?.referredBy?.lastName}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Plan:</div>
                  <div className="col-span-8">
                    {collectdata?.currentPlan?.packageName}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Payout option:</div>
                  <div className="col-span-8">
                    {collectdata?.currentPlan?.payoutPeriod}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">
                    Referral Eligiblity:
                  </div>
                  <div className="col-span-8">{"No"}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Status:</div>
                  <div className="col-span-8">
                    {collectdata.status ? "Active" : "InActive"}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Franchise:</div>
                  <div className="col-span-8">
                    {collectdata.franchise?.name}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Uploaded by:</div>
                  <div className="col-span-8">
                    {collectdata.createdBy?.name}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Comments:</div>
                  <div className="col-span-8">
                    {collectdata.applicationReason}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Status:</div>
                  <div className="col-span-8">
                    {collectdata.profilePhoto.docId._id !== "" ? (
                      <>
                        {collectdata.profilePhoto.docId.status
                          ? "Approved"
                          : collectdata.profilePhoto.docId.docStatus}
                      </>
                    ) : (
                      "Pending"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {collectdata.profilePhoto.docId._id !== "" ? (
                <>
                  <img
                    src={serverURL + "/" + collectdata.profilePhoto.docId.path}
                    className="w-[50%] p-4"
                  />
                  <div className="flex gap-x-4 my-4">
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => changePPcard("reject")}
                      >
                        Reject
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-success"
                        onClick={() => changePPcard("approve")}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="py-3" />
          <h2 className="text-md text-primary font-bold">PAN Details</h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="">
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">PAN Number:</div>
                  <div className="col-span-8">
                    {collectdata.panDetails.panNo}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Name on PAN Card:</div>
                  <div className="col-span-8">
                    {collectdata.panDetails.nameOnPan}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Father Name:</div>
                  <div className="col-span-8">
                    {collectdata.panDetails.fatherName}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Date of Birth:</div>
                  <div className="col-span-8">{collectdata.panDetails.dob}</div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Status:</div>
                  <div className="col-span-8">
                    {collectdata.panDetails.docId._id !== "" ? (
                      <>
                        {collectdata.panDetails.docId.status
                          ? "Approved"
                          : collectdata.panDetails.docId.docStatus}
                      </>
                    ) : (
                      "Pending"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {collectdata.panDetails.docId._id !== "" ? (
                <>
                  {collectdata.panDetails.docId.mimetype ===
                  "application/pdf" ? (
                    <a
                      href={serverURL + "/" + collectdata.panDetails.docId.path}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Link
                    </a>
                  ) : (
                    <img
                      src={serverURL + "/" + collectdata.panDetails.docId.path}
                      className="w-[50%] p-4"
                    />
                  )}
                  <div className="flex gap-x-4 my-4">
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => changePancard("reject")}
                      >
                        Reject
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-success"
                        onClick={() => changePancard("approve")}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="py-3" />
          <h2 className="text-md text-primary font-bold">Aadhar Details</h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="">
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Aadhar Number:</div>
                  <div className="col-span-8">
                    {collectdata.aadharDetails.aadharNo}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Current address:</div>
                  <div className="col-span-8">
                    {collectdata.aadharDetails.currentAddress}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Permanent address:</div>
                  <div className="col-span-8">
                    {collectdata.aadharDetails.permanentAddress}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Status:</div>
                  <div className="col-span-8">
                    {collectdata.aadharDetails.docId._id !== "" ? (
                      <>
                        {collectdata.aadharDetails.docId.status
                          ? "Approved"
                          : collectdata.aadharDetails.docId.docStatus}
                      </>
                    ) : (
                      "Pending"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {collectdata.aadharDetails.docId._id !== "" ? (
                <>
                  {collectdata.aadharDetails.docId.mimetype ===
                  "application/pdf" ? (
                    <a
                      href={
                        serverURL + "/" + collectdata.aadharDetails.docId.path
                      }
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Link
                    </a>
                  ) : (
                    <img
                      src={
                        serverURL + "/" + collectdata.aadharDetails.docId.path
                      }
                      className="w-[50%] p-4"
                    />
                  )}
                  <div className="flex gap-x-4 my-4">
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => changeAadharcard("reject")}
                      >
                        Reject
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-success"
                        onClick={() => changeAadharcard("approve")}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <hr className="py-3" />
          <h2 className="text-md text-primary font-bold">
            Bank Account Details
          </h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="">
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Bank Name:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.bankName}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Account Holder:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.accountHolderName}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Bank A/C Number:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.bankACnumber}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">IFSC Code:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.ifscCode}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Account Type:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.accountType}
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-b-gray-300 py-3">
                  <div className="col-span-4 font-bold">Is Joint Account:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.isJointAccount
                      ? "Yes"
                      : "No"}
                  </div>
                </div>
                <div className="grid grid-cols-12 py-3">
                  <div className="col-span-4 font-bold">Status:</div>
                  <div className="col-span-8">
                    {collectdata.bankAccountDetails.docId._id !== "" ? (
                      <>
                        {collectdata.bankAccountDetails.docId.status
                          ? "Approved"
                          : collectdata.bankAccountDetails.docId.docStatus}
                      </>
                    ) : (
                      "Pending"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8">
              {collectdata.bankAccountDetails.docId._id !== "" ? (
                <>
                  {collectdata.bankAccountDetails.docId.mimetype ===
                  "application/pdf" ? (
                    <a
                      href={
                        serverURL +
                        "/" +
                        collectdata.bankAccountDetails.docId.path
                      }
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Link
                    </a>
                  ) : (
                    <img
                      src={
                        serverURL +
                        "/" +
                        collectdata.bankAccountDetails.docId.path
                      }
                      className="w-[50%] p-4"
                    />
                  )}
                  <div className="flex gap-x-4 my-4">
                    <div className="">
                      <button
                        className="btn btn-danger"
                        onClick={() => changeBADcard("reject")}
                      >
                        Reject
                      </button>
                    </div>
                    <div className="">
                      <button
                        className="btn btn-success"
                        onClick={() => changeBADcard("approve")}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <hr className="py-3" />
          <h2 className="text-md text-primary font-bold">
            Customer Application Update
          </h2>
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <div className="">
                <label className="">Application Description</label>
                <textarea
                  className="border border-gray-300 rounded-md h-16 w-full"
                  onChange={formTextareaChange}
                  defaultValue={collectdata.applicationReason}
                />
              </div>
              <div className="">
                <label className="">Application Option</label>
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  onChange={formSelectChange}
                  value={collectdata.applicationStatus}
                >
                  <option value="">Select</option>
                  <option value="0">Pending</option>
                  <option value="1">Approved</option>
                  <option value="2">Rejected</option>
                  <option value="3">Deleted</option>
                </select>
              </div>
              <div className="my-2">
                <button
                  className="btn btn-primary"
                  onClick={applicationFormSubmit}
                >
                  Submit
                </button>
              </div>
              <hr className="py-3" />
              <h2 className="text-md text-primary font-bold">
                Customer Status Update
              </h2>
              <div className="my-2">
                <div className="flex justify-between items-center">
                  <div className="">
                    <button
                      className="btn btn-danger"
                      onClick={() => changeCustomerStatus("reject")}
                    >
                      Reject
                    </button>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-success"
                      onClick={() => changeCustomerStatus("approve")}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSG;
