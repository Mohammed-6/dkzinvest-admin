import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  deleteSecurityGroup,
  listSecurityGroup,
} from "../query/security-group";
import {
  listCurrencyProps,
  currencyProps,
  editCurrencyProps,
} from "../types/currency";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  createCurrency,
  deleteCurrency,
  listCurrency,
  updateCurrency,
} from "../query/currency";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listCurrencyProps);
  const [editcollectdata, seteditcollectdata] = useState<currencyProps>({
    _id: "",
    currencyCode: "",
    country: "",
    created_at: new Date(),
  });
  const [loading, setloading] = useState<boolean>(false);
  const [eloading, seteloading] = useState<boolean>(false);
  useEffect(() => {
    listCurrency()
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
    deleteCurrency(deleteid)
      .then((res) => {
        setloading(false);
        setcollectdata(res.data.data);
        setloading(true);
        toast.success("Currency deleted successfully");
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

  const editBranch = (data: currencyProps) => {
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
                  <td className="border p-2">C. Code</td>
                  <td className="border p-2">Country</td>
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
                      <td className="border p-2">{data.currencyCode}</td>
                      <td className="border p-2">{data.country}</td>
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
                              onClick={() => editBranch(data)}
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
          <CreateBranch data={editcollectdata} />
        </div>
        {eloading ? (
          <EditBranch data={editcollectdata} close={closeEditPopup} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const EditBranch = (props: editCurrencyProps) => {
  const closePopup = () => {
    props.close();
  };
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="mx-auto max-w-lg">
        <CreateBranch data={props.data} close={closePopup} />
      </div>
    </div>
  );
};

const CreateBranch = (props: editCurrencyProps) => {
  const [collectdata, setcollectdata] = useState<currencyProps>({
    _id: "",
    currencyCode: "",
    country: "",
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

  const formTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSubmit = () => {
    if (collectdata.currencyCode === "" || collectdata.country === "") {
      setalert({
        alert: true,
        type: "error",
        message: "Currency and country required!",
      });
      return;
    }
    if (collectdata._id !== "") {
      updateCurrency(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            setalert({
              alert: true,
              type: "success",
              message: "Currency updated",
            });
            setcollectdata({
              ...collectdata,
              _id: "",
              currencyCode: "",
              country: "",
            });
            setTimeout(() => {
              props.close();
            }, 1500);
            toast.success(res.data.message);
          } else {
            toast.success(res.data.message);
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
      createCurrency(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            setalert({
              alert: true,
              type: "success",
              message: "Currency created",
            });
            setcollectdata({
              ...collectdata,
              _id: "",
              currencyCode: "",
              country: "",
            });
            toast.success(res.data.message);
          } else {
            toast.success(res.data.message);
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

  return (
    <>
      <div className="card">
        <div className="card-header">
          {collectdata._id !== "" ? "Edit" : "Create"} Currency
        </div>
        <div className="card-body">
          <div className="">
            <label>Currency Code</label>
            <input
              type="text"
              name="currencyCode"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder="INR"
              onChange={formChange}
              value={collectdata.currencyCode}
            />
          </div>
          <div className="">
            <label>Country</label>
            <input
              type="text"
              name="country"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder="Country"
              onChange={formChange}
              value={collectdata.country}
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
