import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  deleteSecurityGroup,
  listSecurityGroup,
} from "../query/security-group";
import {
  listSecurityGroupsProps,
  securityGroupProps,
} from "../types/security-group";
import Link from "next/link";
import { toast } from "react-toastify";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listSecurityGroupsProps);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    listSecurityGroup()
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

  const deleteSG = (deleteid: string) => {
    deleteSecurityGroup(deleteid)
      .then((res) => {
        setloading(false);
        setcollectdata(res.data.data);
        setloading(true);
        toast.success("Security Group deleted successfully");
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
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between">
            <div>List Security Group</div>
            <div>
              <a
                href="/admin/security-group/create"
                className="btn btn-primary"
              >
                Create
              </a>
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
                      <div className="flex items-center gap-x-3">
                        <div className="">
                          <Link
                            href={"/admin/security-group/edit/" + data._id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </div>
                        <div className="">
                          <button
                            onClick={() => deleteSG(data._id)}
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
    </>
  );
};

export default ListSG;
