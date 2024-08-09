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
import { deleteCustomer, listPageCustomer } from "../query/customer";
import { listCustomerProps } from "../types/customer";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listCustomerProps);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    listPageCustomer()
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
    deleteCustomer(deleteid)
      .then((res) => {
        setloading(false);
        setcollectdata(res.data.data);
        setloading(true);
        toast.success("Customer deleted successfully");
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
  const daysAgo = (date: Date) => {
    // Assuming startDate and endDate are JavaScript Date objects
    const startDate: any = new Date(date);
    const endDate: any = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = endDate - startDate;

    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMs / millisecondsPerDay);
    return differenceInDays;
  };
  function getMemberSince(registrationDate) {
    const currentDate: any = new Date();
    const dd: any = new Date(registrationDate);
    const diffInMilliseconds = currentDate - dd;

    // Calculate years, months, and days
    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
        (1000 * 60 * 60 * 24 * 30.436875)
    ); // Approximate months
    const days = Math.floor(
      (diffInMilliseconds % (1000 * 60 * 60 * 24 * 30.436875)) /
        (1000 * 60 * 60 * 24)
    );

    let memberSinceString = "";

    // Add years if they exist
    if (years > 0) {
      memberSinceString += `${years} year${years > 1 ? "s" : ""}`;
    }

    // Add months if they exist
    if (months > 0) {
      memberSinceString += `${years > 0 ? ", " : ""} ${months} month${
        months > 1 ? "s" : ""
      }`;
    }

    // Add days if they exist
    if (days > 0) {
      memberSinceString += `${years > 0 || months > 0 ? ", " : ""} ${days} day${
        days > 1 ? "s" : ""
      }`;
    }

    // Return the member since string
    return memberSinceString;
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between">
            <div>List Customer</div>
            <div>
              <a href="/admin/customer/create" className="btn btn-primary">
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
                <td className="border p-2">Mobile Number</td>
                <td className="border p-2">Email</td>
                <td className="border p-2">Current Plan</td>
                <td className="border p-2">Member since</td>
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
                    <td className="border p-2">
                      {data.firstName + " " + data.lastName}
                    </td>
                    <td className="border p-2">{data.phone}</td>
                    <td className="border p-2">{data.email}</td>
                    <td className="border p-2">
                      {data.currentPlan?.packageName}
                    </td>
                    <td className="border p-2">
                      {getMemberSince(data.created_at)}
                    </td>
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
                          <Link
                            href={"/admin/customer/view/" + data._id}
                            className="btn btn-primary"
                          >
                            View
                          </Link>
                        </div>
                        <div className="">
                          <Link
                            href={"/admin/customer/edit/" + data._id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
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
    </>
  );
};

export default ListSG;
