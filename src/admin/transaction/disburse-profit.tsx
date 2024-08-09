import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  adminProfitApprove,
  investmentCustomerList,
  listDirbuseProfit,
} from "../query/investment";
import { toast } from "react-toastify";
import { listOfProfitSharingProps } from "../types/investment";
import { formatIndianRupee } from "@/src/stuff";

const ProfitSharing = () => {
  return (
    <>
      <Layout>
        <Content />
      </Layout>
    </>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listOfProfitSharingProps);
  const [prereq, setprereq] = useState<any>({
    currency: [],
    customer: [],
  });
  const [filter, setfilter] = useState<any>({
    clientId: "",
    fromDate: "",
    toDate: "",
  });
  useEffect(() => {
    investmentCustomerList()
      .then((result: any) => {
        // console.log(result);
        setprereq({
          currency: result.data.data.currency,
          customer: result.data.data.customer,
        });
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

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setfilter({ ...filter, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setfilter({ ...filter, [evt.name]: evt.value });
  };
  const formSubmit = () => {
    console.log(filter);
    if (filter.fromDate === "" || filter.toDate === "") {
      toast.error("Both dates are required");
      return;
    }
    listDirbuseProfit(filter)
      .then((res) => {
        if (res.data.status === true) {
          setcollectdata(res.data.data);
          //   setloading(true);
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

  const approveProfit = (data: string) => {
    adminProfitApprove({ id: data })
      .then((res) => {
        if (res.data.status === true) {
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
    <>
      <div className="">
        <div className="card">
          <div className="card-header">List Disburse Profit</div>
          <div className="card-body">
            <div className="py-6">
              <div className="grid grid-cols-4 gap-x-4 items-center">
                <div className="">
                  <label>Select Client</label>
                  <select
                    className="w-full px-2 py-3 border border-gray-200 rounded-md"
                    onChange={formSelectChange}
                  >
                    <option value="">Select</option>
                    {prereq.customer !== undefined &&
                      prereq.customer.map((req: any, i: number) => (
                        <option value={req._id}>
                          {req.firstName + " " + req.lastName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    className="w-full px-2 py-3 border border-gray-200 rounded-md"
                    onChange={formChange}
                  />
                </div>
                <div className="">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    className="w-full px-2 py-3 border border-gray-200 rounded-md"
                    onChange={formChange}
                  />
                </div>
                <div className="">
                  <button className="btn btn-success" onClick={formSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border">
                  <td className="border p-2">Initiated on</td>
                  <td className="border p-2">Initiated by</td>
                  <td className="border p-2">Client Name</td>
                  <td className="border p-2">Client Id</td>
                  <td className="border p-2">Withdraw Description</td>
                  <td className="border p-2">Withdraw Amount</td>
                  <td className="border p-2">Withdraw status</td>
                  <td className="border p-2">Disburse status</td>
                  <td className="border p-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
                      <td className="border p-2">
                        {new Date(data.initiatedOn).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                      </td>
                      <td className="border p-2">{data.initiatedBy}</td>
                      <td className="border p-2">{data.clientName}</td>
                      <td className="border p-2">{data.clientId}</td>
                      <td className="border p-2 w-[30%]">
                        {data.withdrawDesc}
                      </td>
                      <td className="border p-2">
                        {formatIndianRupee(data.withdrawAmount)}
                      </td>
                      <td className="border p-2">
                        {data.adminStatus ? "Approved" : "Pending"}
                      </td>
                      <td className="border p-2">
                        {data.paymentStatus ? "Approved" : "Pending"}
                      </td>
                      <td className="border p-2">
                        {data.paymentStatus ? (
                          "Profit Disburse"
                        ) : (
                          <>
                            {data.adminStatus ? (
                              "Disburse Pending"
                            ) : (
                              <button
                                className="btn btn-success"
                                onClick={() => approveProfit(data.withdrawId)}
                              >
                                Approve
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitSharing;
