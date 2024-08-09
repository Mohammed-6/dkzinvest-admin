import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  deleteSecurityGroup,
  listSecurityGroup,
} from "../query/security-group";
import {
  listFranchiseProps,
  franchiseProps,
  editFranchiseProps,
} from "../types/franchise";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  createFranchise,
  deleteFranchise,
  listFranchise,
  updateFranchise,
} from "../query/franchise";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listFranchiseProps);
  const [editcollectdata, seteditcollectdata] = useState({
    _id: "",
    name: "",
    code: "",
    location: "",
    contactPerson: "",
    landline: "",
    contactMail: "",
    address: "",
    status: true,
    created_at: new Date(),
  });
  const [loading, setloading] = useState<boolean>(false);
  const [eloading, seteloading] = useState<boolean>(false);
  useEffect(() => {
    listFranchise()
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
    deleteFranchise(deleteid)
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

  const editFranchise = (data: franchiseProps) => {
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
                  <td className="border p-2">Name</td>
                  <td className="border p-2">Code</td>
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
                      <td className="border p-2">{data.name}</td>
                      <td className="border p-2">{data.code}</td>
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
                              onClick={() => editFranchise(data)}
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
          <CreateFranchise data={editcollectdata} />
        </div>
        {eloading ? (
          <EditFranchise data={editcollectdata} close={closeEditPopup} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const EditFranchise = (props: editFranchiseProps) => {
  const closePopup = () => {
    props.close();
  };
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="mx-auto max-w-lg">
        <CreateFranchise data={props.data} close={closePopup} />
      </div>
    </div>
  );
};

const CreateFranchise = (props: editFranchiseProps) => {
  const [collectdata, setcollectdata] = useState<franchiseProps>({
    _id: "",
    name: "",
    code: "",
    location: "",
    contactPerson: "",
    landline: "",
    contactMail: "",
    address: "",
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

  const formTextareaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSubmit = () => {
    if (collectdata.name === "" || collectdata.code === "") {
      setalert({
        alert: true,
        type: "error",
        message: "Name and code required!",
      });
      return;
    }
    if (collectdata._id !== "") {
      updateFranchise(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            setalert({
              alert: true,
              type: "success",
              message: "Franchise updated",
            });
            setcollectdata({
              ...collectdata,
              _id: "",
              name: "",
              code: "",
              location: "",
              contactPerson: "",
              landline: "",
              contactMail: "",
              address: "",
              status: true,
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
      createFranchise(collectdata)
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
              name: "",
              code: "",
              location: "",
              contactPerson: "",
              landline: "",
              contactMail: "",
              address: "",
              status: true,
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

  return (
    <>
      <div className="card">
        <div className="card-header">
          {collectdata._id !== "" ? "Edit" : "Create"} Franchise
        </div>
        <div className="card-body">
          <div className="">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.name}
            />
          </div>
          <div className="">
            <label>Code</label>
            <input
              type="text"
              name="code"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder="Code"
              onChange={formChange}
              value={collectdata.code}
            />
          </div>
          <div className="">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.location}
            />
          </div>
          <div className="">
            <label>Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.contactPerson}
            />
          </div>
          <div className="">
            <label>Landline</label>
            <input
              type="text"
              name="landline"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.landline}
            />
          </div>
          <div className="">
            <label>Contact Mail</label>
            <input
              type="text"
              name="contactMail"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder=""
              onChange={formChange}
              value={collectdata.contactMail}
            />
          </div>
          <div className="">
            <label>Address</label>
            <textarea
              name="address"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formTextareaChange}
              value={collectdata.address}
            ></textarea>
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
