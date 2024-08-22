import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  deleteSecurityGroup,
  listSecurityGroup,
} from "../query/security-group";
import { listplanProps, planProps, editPlanProps } from "../types/plan";
import Link from "next/link";
import { toast } from "react-toastify";
import { createPlan, deletePlan, listPlan, updatePlan } from "../query/plan";
import { uploadFile } from "../query/customer";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listplanProps);
  const [editcollectdata, seteditcollectdata] = useState<planProps>({
    _id: "",
    packageName: "",
    duration: null,
    percentage: null,
    payoutPeriod: "",
    capitalReturn: false,
    withdrawInstallment: null,
    minAmount: 0,
    maxAmount: 0,
    terms: "",
    offerClaim: "",
    banner: "",
    status: true,
    created_at: new Date(),
  });
  const [loading, setloading] = useState<boolean>(false);
  const [eloading, seteloading] = useState<boolean>(false);
  useEffect(() => {
    listPlan()
      .then((res) => {
        setcollectdata(res.data.data);
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
  }, []);

  const deleteUsr = (deleteid: string) => {
    deletePlan(deleteid)
      .then((res) => {
        setloading(false);
        setcollectdata(res.data.data);
        setloading(true);
        toast.success("Franchise deleted successfully");
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

  const editPlan = (data: planProps) => {
    seteloading(false);
    seteditcollectdata(data);
    seteloading(true);
  };

  const closeEditPopup = () => {
    seteloading(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between">
              <div>List User</div>
              <div>
                {/* <a href="/admin/user/create" className="btn btn-primary">
                  Create
                </a> */}
              </div>
            </div>
          </div>
          <div className="card-body">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border">
                  <td className="border p-2">S.No</td>
                  <td className="border p-2">Package Name</td>
                  <td className="border p-2">Duration</td>
                  <td className="border p-2">%</td>
                  <td className="border p-2">Payout Period</td>
                  <td className="border p-2">Created on</td>
                  <td className="border p-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {loading &&
                  collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">{data.packageName}</td>
                      <td className="border p-2">{data.duration}</td>
                      <td className="border p-2">{data.percentage}</td>
                      <td className="border p-2">{data.payoutPeriod}</td>
                      <td className="border p-2">
                        {new Date(data.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </td>
                      <td className="border p-2">
                        <div className="flex items-center gap-x-3">
                          <div className="">
                            <button
                              onClick={() => editPlan(data)}
                              className="btn btn-primary"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="">
                            <button
                              onClick={() => deleteUsr(data._id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="">
          <CreatePlan data={editcollectdata} />
        </div>
        {eloading ? (
          <EditPlan data={editcollectdata} close={closeEditPopup} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const EditPlan = (props: editPlanProps) => {
  const closePopup = () => {
    props.close();
  };
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
      <div className="mx-auto max-w-lg">
        <CreatePlan data={props.data} close={closePopup} />
      </div>
    </div>
  );
};

const CreatePlan = (props: editPlanProps) => {
  const [collectdata, setcollectdata] = useState<planProps>({
    _id: "",
    packageName: "",
    duration: null,
    percentage: null,
    payoutPeriod: "",
    capitalReturn: false,
    withdrawInstallment: null,
    minAmount: 0,
    maxAmount: 0,
    terms: "",
    offerClaim: "",
    banner: "",
    status: true,
    created_at: new Date(),
  });

  useEffect(() => {
    setcollectdata(props.data);
  }, []);

  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const evt = e.target as HTMLTextAreaElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked }: any = e.target;
    const temp = collectdata;
    temp.capitalReturn = checked;
    setcollectdata(temp);
    // console.log(collectdata);
  };

  const formSubmit = () => {
    if (
      collectdata.packageName === "" ||
      collectdata.percentage === null ||
      collectdata.payoutPeriod === ""
    ) {
      setalert({
        alert: true,
        type: "error",
        message: "Name, percentage and payout period required!",
      });
      return;
    }
    if (collectdata._id !== "") {
      updatePlan(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            setalert({
              alert: true,
              type: "success",
              message: "Plan updated",
            });
            setcollectdata({
              ...collectdata,
              _id: "",
              packageName: "",
              duration: null,
              percentage: null,
              payoutPeriod: "",
              capitalReturn: false,
              withdrawInstallment: null,
              status: true,
              created_at: new Date(),
            });
            setTimeout(() => {
              props.close();
            }, 1500);
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
    } else {
      createPlan(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            setalert({
              alert: true,
              type: "success",
              message: "Franchise created",
            });
            setcollectdata({
              ...collectdata,
              _id: "",
              packageName: "",
              duration: null,
              percentage: null,
              payoutPeriod: "",
              capitalReturn: false,
              withdrawInstallment: null,
              status: true,
              created_at: new Date(),
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
    }
  };

  const getDuration = () => {
    let duration = [];
    const num = 12 * 4;
    for (let i = 0; i < num; i++) {
      duration.push(`<option value="${i}">${i} month</option>`);
    }
    return duration;
  };
  const getPercentage = () => {
    let percentage = [];
    for (let i = 0; i < 15; i++) {
      percentage.push(`<option value="${i}">${i} month</option>`);
    }
    return percentage;
  };

  const formFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    uploadFile(evt.files[0])
      .then((res) => {
        console.log(res);
        setcollectdata((prevState) => ({
          ...prevState,
          banner: res.data.data,
        }));
        toast.success("File uploaded successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          {collectdata._id !== "" ? "Edit" : "Create"} Plan
        </div>
        <div className="card-body">
          <div className="">
            <label>Package Name</label>
            <input
              type="text"
              name="packageName"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.packageName}
            />
          </div>
          <div className="">
            <label>Package Banner</label>
            <input
              type="file"
              name="banner"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formFileChange}
            />
          </div>
          <div className="">
            <label>Duration</label>
            <select
              name="duration"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formSelectChange}
              value={collectdata.duration}
            >
              {getDuration().map((value, i) => (
                <>
                  <option value={i + 1}>{i + 1} Month</option>
                </>
              ))}
            </select>
          </div>
          <div className="">
            <label>Percentage</label>
            <select
              name="percentage"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formSelectChange}
              value={collectdata.percentage}
            >
              {getPercentage().map((value, i) => (
                <>
                  <option value={i + 1}>{i + 1} %</option>
                </>
              ))}
            </select>
          </div>
          <div className="">
            <label>Payout Period</label>
            <select
              name="payoutPeriod"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formSelectChange}
              value={collectdata.payoutPeriod}
            >
              {getDuration().map((value, i) => (
                <>
                  <option value={i + 1}>{i + 1} Month</option>
                </>
              ))}
            </select>
          </div>
          <div className="">
            <label>Capital Return</label>
            <br />
            <label>
              <input
                type="checkbox"
                name="capitalReturn"
                defaultChecked={collectdata.capitalReturn}
                onClick={(e) => formCheckboxChange(e)}
                onChange={(e) => formCheckboxChange(e)}
              />
              {collectdata.capitalReturn ? "Yes" : "No"}
            </label>
          </div>
          <div className="">
            <label>Withdraw Installment</label>
            <select
              name="withdrawInstallment"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formSelectChange}
              value={collectdata.withdrawInstallment}
            >
              {getDuration().map((value, i) => (
                <>
                  <option value={i + 1}>{i + 1} Month</option>
                </>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div className="">
              <label>Min Amount</label>
              <input
                type="number"
                name="minAmount"
                className="w-full rounded-md p-2 border border-gray-200"
                placeholder=""
                onChange={formChange}
                defaultValue={collectdata.minAmount}
              />
            </div>
            <div className="">
              <label>Max Amount</label>
              <input
                type="number"
                name="maxAmount"
                className="w-full rounded-md p-2 border border-gray-200"
                placeholder=""
                onChange={formChange}
                defaultValue={collectdata.maxAmount}
              />
            </div>
          </div>
          <div className="">
            <label>Terms and Conditions</label>
            <textarea
              name="terms"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formTextareaChange}
              defaultValue={collectdata.terms}
            />
          </div>
          <div className="">
            <label>Offer Claim</label>
            <textarea
              name="offerClaim"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formTextareaChange}
              defaultValue={collectdata.offerClaim}
            />
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

export default ListSG;
