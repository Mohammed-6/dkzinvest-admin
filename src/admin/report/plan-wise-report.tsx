import React, { useState, useEffect } from "react";
import Layout from "../layout";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { listPlanWiseReport } from "../query/report";
import { listPlanwiseReportProps } from "../types/report";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState(listPlanwiseReportProps);
  const [planname, setplanname] = useState<string>("");
  useEffect(() => {
    listPlanWiseReport(router.query.planid as string)
      .then((result: any) => {
        // console.log(result);
        setcollectdata(result.data.data);
        setplanname(result.data.package);
      })
      .catch((err) => {
        // console.error(err);
        if (err.response.status === 400) {
          toast.error(err.response.statusText);
        } else {
          toast.error("Something went wrong");
        }
      });
  }, [router.isReady]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-4">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between font-bold">
              <div>Plan-Wise Data ({planname})</div>
              <div>
                {/* <button
                  className="btn btn-primary"
                >
                  Add Trasnaction
                </button> */}
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="py-2"></div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border">
                  <td className="border p-2">SL.No</td>
                  <td className="border p-2">Client ID</td>
                  <td className="border p-2">Client Name</td>
                  <td className="border p-2">Capital Investment</td>
                  <td className="border p-2">Activation Date</td>
                  <td className="border p-2">Maturity Date</td>
                  <td className="border p-2">Payout Time Period</td>
                  <td className="border p-2">Branch/Franchise</td>
                  <td className="border p-2">Created By</td>
                  <td className="border p-2">Created At</td>
                </tr>
              </thead>
              <tbody>
                {collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">{data.customerId}</td>
                      <td className="border p-2">{data.clientName}</td>
                      <td className="border p-2">₹{data.capitalInvested}</td>
                      <td className="border p-2">
                        {new Date(data.capitalDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                      </td>
                      <td className="border p-2">
                        {new Date(data.maturityDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }
                        )}
                      </td>
                      <td className="border p-2">{data.payoutOutTimePeriod}</td>
                      <td className="border p-2">{data.branch}</td>
                      <td className="border p-2">{data.createdBy}</td>
                      <td className="border p-2">
                        {new Date(data.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
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

export default ListSG;
