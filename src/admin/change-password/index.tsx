import React, { useState, useEffect } from "react";
import Layout from "../layout";
import { changePassword } from "../query/login";
import { toast } from "react-toastify";

const ListSG = () => {
  return (
    <Layout>
      <ChangePasswordForm />
    </Layout>
  );
};

const ChangePasswordForm = () => {
  const [collectdata, setcollectdata] = useState({
    oldpassword: "",
    password: "",
    conpassword: "",
  });

  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSubmit = () => {
    if (
      collectdata.oldpassword === "" &&
      collectdata.password !== collectdata.conpassword
    ) {
      setalert({
        alert: true,
        type: "error",
        message: "Both password does't match!",
      });
      return;
    }
    changePassword(collectdata)
      .then((res) => {
        if (res.data.status === true) {
          setalert({
            alert: true,
            type: "success",
            message: "Passwords changed successfully",
          });
          setcollectdata({
            ...collectdata,
            oldpassword: "",
            password: "",
            conpassword: "",
          });
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        // console.error(err);
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <div className="max-w-2xl">
      <div className="card">
        <div className="card-header">Change Password</div>
        <div className="card-body">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-gray-800 font-semibold mt-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="oldpassword"
              onChange={formChange}
              defaultValue={collectdata.oldpassword}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-800 font-semibold mt-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="password"
              onChange={formChange}
              defaultValue={collectdata.password}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-800 font-semibold mt-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="conpassword"
              onChange={formChange}
              defaultValue={collectdata.conpassword}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Confirm new password"
            />
          </div>
          <div className="mt-2">
            <button onClick={formSubmit} className="btn btn-success">
              Change Password
            </button>
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
    </div>
  );
};

export default ListSG;
