import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  createCustomer,
  listCustomer,
  uploadFile,
  editCustomer,
  updateCustomer,
} from "../query/customer";
import { toast } from "react-toastify";
import { customerProps, listCustomerProps } from "../types/customer";
import { listPlan } from "../query/plan";
import { listplanProps } from "../types/plan";
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
  const [collectdata, setcollectdata] = useState<customerProps>({
    _id: "",
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    password: "",
    nominee: "",
    referredBy: "",
    branch: "",
    currentPlan: "",
    payoutDuration: "",
    referralEligibility: false,
    franchise: "",
    profilePhoto: {
      docId: "",
    },
    panDetails: {
      docId: "",
      panNo: "",
      nameOnPan: "",
      fatherName: "",
      dob: "",
    },
    aadharDetails: {
      docId: "",
      aadharNo: "",
      currentAddress: "",
      permanentAddress: "",
    },
    aadharBack: {
      docId: "",
    },
    bankAccountDetails: {
      docId: "",
      bankName: "",
      accountHolderName: "",
      bankACnumber: "",
      ifscCode: "",
      accountType: "",
      isJointAccount: false,
    },
    otherDocument: [],
    applicationReason: "",
    applicationStatus: 0,
    createdBy: "",
    status: false,
    created_at: new Date(),
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const [plan, setplan] = useState(listplanProps);
  const [listcustumer, setlistcustomer] = useState(listCustomerProps);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    if (router.query.id !== undefined) {
      editCustomer(router.query.id as string)
        .then((cus) => {
          setcollectdata(cus.data.data.user);
          setplan(cus.data.data.plan);
          setlistcustomer(cus.data.data.customer);
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

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    uploadFile(evt.files[0])
      .then((res) => {
        console.log(res);
        setcollectdata((prevState) => ({
          ...prevState,
          [evt.name]: {
            ...prevState[evt.name],
            docId: res.data.data,
          },
        }));
        toast.success("File uploaded successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formFileODChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    uploadFile(evt.files[0])
      .then((res: { data: { data: any } }) => {
        const temp: any = collectdata;
        temp.otherDocument.push(res.data.data);
        setcollectdata(temp);
        toast.success("File uploaded successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formSChange = (e: React.FormEvent<HTMLInputElement>, path: string) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata((prevState) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        [evt.name]: evt.value,
      },
    }));
  };

  const formScChange = (e: React.FormEvent<HTMLInputElement>, path: string) => {
    const evt = e.target as HTMLInputElement;
    const { checked }: any = e.target;
    setcollectdata((prevState) => ({
      ...prevState,
      [path]: {
        ...prevState[path],
        [evt.name]: checked,
      },
    }));
  };

  const formSubmit = () => {
    console.log(collectdata);
    // return;
    if (
      collectdata.firstName === "" ||
      collectdata.email === "" ||
      collectdata.password === ""
    ) {
      setalert({
        alert: true,
        type: "error",
        message: "*Some fields are required",
      });
      return;
    }
    setalert({
      alert: false,
      type: "",
      message: "",
    });
    updateCustomer(collectdata)
      .then((res) => {
        if (res.data.status === true) {
          setalert({
            alert: true,
            type: "success",
            message: "Customer updated",
          });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        // console.error(err);
        if (err?.response?.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
          setalert({
            alert: true,
            type: "error",
            message: err.data.data.message,
          });
        }
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-header">Create Customer</div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <label>
                Firstname<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.firstName}
              />
            </div>
            <div className="">
              <label>Lastname</label>
              <input
                type="text"
                name="lastName"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.lastName}
              />
            </div>
            <div className="">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.email}
              />
            </div>
            <div className="">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.phone}
              />
            </div>
            <div className="">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.password}
              />
            </div>
            <div className="">
              <label>Nominee</label>
              <input
                type="text"
                name="nominee"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                defaultValue={collectdata.nominee}
              />
            </div>
            <div className="">
              <label>
                Referred By<span className="text-red-500">*</span>
              </label>

              <select
                name="referredBy"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formSelectChange}
                value={collectdata.referredBy}
              >
                <option value="">Select</option>
                {listcustumer.map((pp) => (
                  <option value={pp._id}>
                    {pp.firstName + " " + pp.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label>
                Current Plan<span className="text-red-500">*</span>
              </label>
              <select
                name="currentPlan"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formSelectChange}
                value={collectdata.currentPlan}
              >
                <option value="">Select</option>
                {plan.map((pp) => (
                  <option value={pp._id}>{pp.packageName}</option>
                ))}
              </select>
            </div>

            <div className="">
              <h2 className="text-xl underline mt-3">Profile Picture</h2>
              <label></label>
              <input
                type="file"
                name="profilePhoto"
                className={`w-full rounded-md p-2 ${
                  collectdata.profilePhoto.docId !== ""
                    ? "border border-green-500"
                    : "border border-gray-200"
                }`}
                onChange={(e) => formFileChange(e)}
              />
              <div className="mt-2">
                <h2 className="text-xl underline mt-3">Aadhar card</h2>
                <label></label>
                <input
                  type="file"
                  name="aadharDetails"
                  className={`w-full rounded-md p-2 ${
                    collectdata.aadharDetails.docId !== ""
                      ? "border border-green-500"
                      : "border border-gray-200"
                  }`}
                  onChange={(e) => formFileChange(e)}
                />
              </div>
              <div className="mt-2">
                <label>Aadhar no</label>
                <input
                  type="text"
                  name="aadharNo"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "aadharDetails")}
                  defaultValue={collectdata.aadharDetails.aadharNo}
                />
              </div>
              <div className="mt-2">
                <label>Current address</label>
                <input
                  type="text"
                  name="currentAddress"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "aadharDetails")}
                  defaultValue={collectdata.aadharDetails.currentAddress}
                />
              </div>
              <div className="mt-2">
                <label>Permanent address</label>
                <input
                  type="text"
                  name="permanentAddress"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "aadharDetails")}
                  defaultValue={collectdata.aadharDetails.permanentAddress}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-xl underline mt-3">Other Document</h2>
                <label></label>
                <input
                  type="file"
                  name="otherDocument"
                  className={`w-full rounded-md p-2 border border-gray-200`}
                  onChange={(e) => formFileODChange(e)}
                />
                <br />
                {collectdata.otherDocument !== null &&
                  collectdata.otherDocument !== undefined &&
                  collectdata.otherDocument.map((doc, i) => (
                    <span className="btn btn-primary mx-1">
                      Document {i + 1}
                    </span>
                  ))}
              </div>
            </div>
            <div className="">
              <h2 className="text-xl underline mt-3">Pan Card</h2>
              <label></label>
              <input
                type="file"
                name="panDetails"
                className={`w-full rounded-md p-2 ${
                  collectdata.panDetails.docId !== ""
                    ? "border border-green-500"
                    : "border border-gray-200"
                }`}
                onChange={(e) => formFileChange(e)}
              />
              <div className="mt-2">
                <label>Pan no</label>
                <input
                  type="text"
                  name="panNo"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "panDetails")}
                  defaultValue={collectdata.panDetails.panNo}
                />
              </div>
              <div className="mt-2">
                <label>Name on PAN</label>
                <input
                  type="text"
                  name="nameOnPan"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "panDetails")}
                  defaultValue={collectdata.panDetails.nameOnPan}
                />
              </div>
              <div className="mt-2">
                <label>Father Name</label>
                <input
                  type="text"
                  name="fatherName"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "panDetails")}
                  defaultValue={collectdata.panDetails.fatherName}
                />
              </div>
              <div className="mt-2">
                <label>DOB</label>
                <input
                  type="text"
                  name="dob"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "panDetails")}
                  defaultValue={collectdata.panDetails.dob}
                />
              </div>
              <h2 className="text-xl underline mt-3">Bank Account</h2>
              <label></label>
              <input
                type="file"
                name="bankAccountDetails"
                className={`w-full rounded-md p-2 ${
                  collectdata.bankAccountDetails.docId !== ""
                    ? "border border-green-500"
                    : "border border-gray-200"
                }`}
                onChange={(e) => formFileChange(e)}
              />
              <div className="mt-2">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "bankAccountDetails")}
                  defaultValue={collectdata.bankAccountDetails.bankName}
                />
              </div>
              <div className="mt-2">
                <label>Account holder name</label>
                <input
                  type="text"
                  name="accountHolderName"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "bankAccountDetails")}
                  defaultValue={
                    collectdata.bankAccountDetails.accountHolderName
                  }
                />
              </div>
              <div className="mt-2">
                <label>Bank Account No.</label>
                <input
                  type="text"
                  name="bankACnumber"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "bankAccountDetails")}
                  defaultValue={collectdata.bankAccountDetails.bankACnumber}
                />
              </div>
              <div className="mt-2">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "bankAccountDetails")}
                  defaultValue={collectdata.bankAccountDetails.ifscCode}
                />
              </div>
              <div className="mt-2">
                <label>Account Type</label>
                <input
                  type="text"
                  name="accountType"
                  className="w-full rounded-md p-2 border border-gray-200"
                  onChange={(e) => formSChange(e, "bankAccountDetails")}
                  defaultValue={collectdata.bankAccountDetails.accountType}
                />
              </div>
              <div className="mt-2">
                <label>Is Joint Account</label>
                <br />
                <input
                  type="checkbox"
                  name="isJointAccount"
                  onChange={(e) => formScChange(e, "bankAccountDetails")}
                  defaultChecked={collectdata.bankAccountDetails.isJointAccount}
                />
              </div>
            </div>
          </div>
          <div className="py-3">
            <a
              className="btn cursor-pointer"
              onClick={formSubmit}
              type="button"
            >
              Submit
            </a>
          </div>
          <div className="">
            {alert.alert ? (
              <div
                className={`${
                  alert.type === "error" ? "bg-red-500" : "bg-green-500"
                } text-white px-2 py-1 rounded-md`}
              >
                {alert.message}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSG;
