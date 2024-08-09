import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { createUser, editUser, loadUserProps, updateUser } from "../query/user";
import { userProps } from "../types/user";
import { toast } from "react-toastify";
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
  const [collectdata, setcollectdata] = useState<userProps>({
    _id: "",
    name: "",
    userName: "",
    photo: "",
    zip: null,
    city: "",
    address: "",
    phone: null,
    dob: "",
    panNo: "",
    aadharNo: null,
    state: "",
    email: "",
    password: "",
    securityGroup: "",
    branch: "",
    franchise: "",
    rememberToken: "",
    status: false,
    verificationLink: "",
    emailVerified: false,
    affiliateCode: "",
    referralId: "",
    verified: false,
    details: "",
    kycStatus: null,
    kycInfo: "",
    kycRejectReason: "",
    isBanned: false,
    relationship: "",
    created_at: new Date(),
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const [prereq, setprereq] = useState<any>({
    sg: [],
    br: [],
    fr: [],
  });
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    if (router.query.id !== undefined) {
      loadUserProps().then((user) => {
        setloading(false);
        setprereq({
          sg: user.data.data.sg,
          br: user.data.data.br,
          fr: user.data.data.fr,
        });
        setloading(true);
      });

      editUser(router.query.id as string)
        .then((res) => {
          setcollectdata(res.data.data);
          //   console.log(res.data);
          setloading(true);
        })
        .catch((err) => {
          // console.error(err);
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

  const formSubmit = () => {
    if (
      collectdata.name === "" ||
      collectdata.email === "" ||
      collectdata.securityGroup === "" ||
      collectdata.branch === "" ||
      collectdata.franchise === "" ||
      collectdata.userName === ""
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
    updateUser(collectdata)
      .then((res) => {
        if (res.data.status === true) {
          setalert({
            alert: true,
            type: "success",
            message: "User updated",
          });
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
        <div className="card-header">Edit User</div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <label>
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.name}
              />
            </div>
            <div className="">
              <label>
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="userName"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.userName}
              />
            </div>
            <div className="">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.address}
              />
            </div>
            <div className="">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.city}
              />
            </div>
            <div className="">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.state}
              />
            </div>
            <div className="">
              <label>Zipcode</label>
              <input
                type="text"
                name="zip"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.zip}
              />
            </div>
            <div className="">
              <label>
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.email}
              />
            </div>
            <div className="">
              <label>
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.password}
              />
            </div>
            <div className="">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.phone}
              />
            </div>
            <div className="">
              <label>Pan No.</label>
              <input
                type="text"
                name="panNo"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.panNo}
              />
            </div>
            <div className="">
              <label>DOB</label>
              <input
                type="date"
                name="dob"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formChange}
                value={collectdata.dob}
              />
            </div>
            <div className="">
              <label>
                Franchise<span className="text-red-500">*</span>
              </label>
              <select
                name="franchise"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formSelectChange}
                value={collectdata.franchise}
              >
                <option value="">Select</option>
                {prereq.fr.map((req, i) => (
                  <option value={req._id}>{req.name}</option>
                ))}
              </select>
            </div>
            <div className="">
              <label>
                Branch<span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formSelectChange}
                value={collectdata.branch}
              >
                <option value="">Select</option>
                {prereq.br.map((req, i) => (
                  <option value={req._id}>{req.name}</option>
                ))}
              </select>
            </div>
            <div className="">
              <label>
                Security Group<span className="text-red-500">*</span>
              </label>
              <select
                name="securityGroup"
                className="w-full rounded-md p-2 border border-gray-200"
                onChange={formSelectChange}
                value={collectdata.securityGroup}
              >
                <option value="">Select</option>
                {prereq.sg.map((req, i) => (
                  <option value={req._id}>{req.name}</option>
                ))}
              </select>
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
