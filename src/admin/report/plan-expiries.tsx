import React, { useState, useEffect } from "react";
import Layout from "../layout";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { listPlanExpiriesReport, listPlanWiseReport } from "../query/report";
import { editReportProps, listPlanwiseReportProps } from "../types/report";
import {
  pushToPartialInvestment,
  pushToReInvestment,
  pushToWithdraw,
} from "../query/investment";

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
  const [alert, setalert] = useState({
    alert: false,
    option: 0,
    showamount: false,
    heading: "",
    message: "",
  });
  const [invid, setinvid] = useState<string>("");
  const [invamount, setinvamount] = useState<number>(0);
  useEffect(() => {
    listPlanExpiriesReport(router.query.planid as string)
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

  const confirmReinvest = (e: string) => {
    setinvid(e);
    setalert({
      alert: true,
      option: 1,
      showamount: false,
      heading: "Confirm ReInvestment",
      message: "Are you sure you want to re-invest?",
    });
  };

  const confirmPartialReinvest = (e: string) => {
    setinvid(e);
    setalert({
      alert: true,
      option: 2,
      showamount: true,
      heading: "Confirm Partial Reinvest",
      message: "",
    });
  };
  const confirmWithdraw = (e: string) => {
    setinvid(e);
    setalert({
      alert: true,
      option: 3,
      showamount: false,
      heading: "Confirm Wihdraw",
      message: "Are you sure you want to withdraw?",
    });
  };

  const closeEditPopup = () => {
    setalert({ ...alert, alert: false });
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between font-bold">
              <div>Plan Notification - Expiries</div>
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
                  <td className="border p-2">Mobile No.</td>
                  <td className="border p-2">Maturity Date</td>
                  <td className="border p-2">Capital Investment</td>
                  <td className="border p-2">Franchise</td>
                  <td className="border p-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2 text-blue-500">
                        {data.customerId}
                      </td>
                      <td className="border p-2">{data.clientName}</td>
                      <td className="border p-2">{data.phone}</td>
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
                      <td className="border p-2">₹{data.capitalInvested}</td>
                      <td className="border p-2">{data.branch}</td>
                      <td>
                        <div className="py-1">
                          <div className="pb-1">
                            <button
                              className="btn btn-danger"
                              onClick={() => confirmReinvest(data.investmentId)}
                            >
                              Re-Invest
                            </button>
                          </div>
                          <div className="pb-1">
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                confirmPartialReinvest(data.investmentId)
                              }
                            >
                              Partial-Invest
                            </button>
                          </div>
                          <div className="">
                            <button
                              className="btn btn-danger"
                              onClick={() => confirmWithdraw(data.investmentId)}
                            >
                              Invest Withdraw
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

        {alert.alert ? (
          <EditPlan data={alert} invid={invid} close={closeEditPopup} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
const EditPlan = (props: editReportProps) => {
  const closePopup = () => {
    props.close();
  };
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="mx-auto max-w-lg">
        <CreatePlan invid={props.invid} data={props.data} close={closePopup} />
      </div>
    </div>
  );
};

const CreatePlan = (props: editReportProps) => {
  const [collectdata, setcollectdata] = useState<any>({
    _id: "",
    withdrawAmount: "",
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
    const colte = collectdata;
    colte._id = props.invid;
    if (props.data.option === 1) {
      pushToReInvestment(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong");
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
    } else if (props.data.option === 2) {
      pushToPartialInvestment(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong");
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
    } else if (props.data.option === 3) {
      pushToWithdraw(collectdata)
        .then((res) => {
          if (res.data.status === true) {
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong");
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
    setTimeout(() => {
      props.close();
    }, 3000);
  };
  return (
    <>
      <div className="card">
        <div className="card-header">{props.data.heading}</div>
        <div className="card-body">
          {props.data.showamount ? (
            <>
              <div className="">
                <label>Withdraw Amount</label>
                <input
                  type="number"
                  name="withdrawAmount"
                  className="w-full rounded-md p-2 border border-gray-200"
                  placeholder=""
                  onChange={formChange}
                  value={collectdata.withdrawAmount}
                />
              </div>
            </>
          ) : (
            <>
              <div className="py-2">
                <div className="font-bold">{props.data.message}</div>
              </div>
            </>
          )}
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
          <div className="flex items-center justify-between border-t border-gray-200 pt-2">
            <div className="">
              <button className="btn btn-success" onClick={() => formSubmit()}>
                Submit
              </button>
            </div>
            <div className="">
              <button className="btn btn-danger" onClick={() => props.close()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListSG;
