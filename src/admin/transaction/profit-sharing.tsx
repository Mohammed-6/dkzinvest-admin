import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  disburseProfit,
  listProfitSharing,
  listTransaction,
} from "../query/investment";
import { toast } from "react-toastify";
import {
  detailProps,
  listInvestmentProps,
  listProfitSharingProp,
  listProfitSharingProps,
  transProps,
} from "../types/investment";
import { XMarkIcon } from "@heroicons/react/20/solid";
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
  const [collectdata, setcollectdata] = useState(listProfitSharingProps);
  const [singledata, setsingledata] = useState<listProfitSharingProp>();
  const [transdata, settransdata] = useState(listInvestmentProps);
  const [showdetail, setshowdetail] = useState<boolean>(false);
  const [showtrans, setshowtrans] = useState<boolean>(false);

  useEffect(() => {
    listProfitSharing("")
      .then((res) => {
        if (res.data.status === true) {
          setcollectdata(res.data.data);
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
  }, []);

  const toogleDetail = (data: listProfitSharingProp) => {
    setsingledata(data);
    setshowdetail(!showdetail);
  };

  const toogleTrans = (data: listProfitSharingProp) => {
    // setsingledata(data);
    setshowtrans(!showtrans);
  };

  const getTransaction = (cId: string) => {
    listTransaction({
      clientId: cId,
      fromDate: new Date(),
      toDate: new Date(),
    } as any)
      .then((data: any) => {
        setshowtrans(!showtrans);
        settransdata(data.data.data);
        // console.log(data.data.data);
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
          <div className="card-header">List Investment</div>
          <div className="card-body">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border">
                  <td className="border p-2">Created on</td>
                  <td className="border p-2">Client Name</td>
                  <td className="border p-2">Package Name</td>
                  <td className="border p-2">Investments</td>
                  <td className="border p-2">Capital Investment</td>
                  <td className="border p-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
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
                      <td className="border p-2">{data.clientName}</td>
                      <td className="border p-2">
                        {data.investments[0].packageName}
                      </td>
                      <td className="border p-2">
                        <div
                          className="text-blue-500 hover:cursor-pointer"
                          onClick={() => getTransaction(data.clientId)}
                        >
                          Investments
                        </div>
                      </td>
                      <td className="border p-2">₹{data.capitalInvested}</td>
                      <td className="border p-2">
                        <button
                          className="btn btn-success"
                          onClick={() => toogleDetail(data)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {showdetail ? <Detail data={singledata} close={toogleDetail} /> : ""}
        {showtrans ? <Trans data={transdata} close={toogleTrans} /> : ""}
      </div>
    </>
  );
};

const Detail = (props: detailProps) => {
  const disburseInvestmentProfit = (cId: string) => {
    if (cId === "") {
      toast.error("Input error");
      return;
    } else if (props.data.profitAmount === 0) {
      toast.error("Error!");
      props.close();
      return;
    }
    disburseProfit({ clientId: cId })
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
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <div>
                  Investment Detail({props.data.clientName})-
                  {props.data.customerId}
                </div>
                <div>
                  <XMarkIcon
                    className="w-6 hover:fill-gray-500 hover:cursor-pointer"
                    onClick={() => props.close()}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="pb-3 hidden">
                <div className="">
                  <label>Client Id</label>
                  <div className="font-bold">{props.data.customerId}</div>
                </div>
                <div className="">
                  <label>Client Name</label>
                  <div className="font-bold">{props.data.clientName}</div>
                </div>
              </div>
              <h2 className="border-b text-xl font-bold">Investment Details</h2>
              {props.data.investments.map((inv, i) => (
                <>
                  <div className="grid grid-cols-3 gap-x-3 items-center border-b py-2">
                    <div className="">
                      <label>Investment Id</label>
                      <div className="font-bold">{inv.investmentId}</div>
                    </div>
                    <div className="">
                      <label>Capital Amount</label>
                      <div className="font-bold">
                        {formatIndianRupee(inv.investmentAmount)}
                      </div>
                    </div>
                    <div className="">
                      <label>Profit Amount({inv.days} days)</label>
                      <div className="font-bold">
                        {formatIndianRupee(inv.payAmount)}
                      </div>
                    </div>
                  </div>
                  {i === props.data.investments.length - 1 ? (
                    <>
                      <div className="grid grid-cols-3 gap-x-3 pt-3">
                        <div className="col-span-2"></div>
                        <div className="font-bold">
                          <label>Final Profit Amount</label>
                          <div>
                            {formatIndianRupee(props.data.profitAmount)}
                          </div>
                          <br />
                          <button
                            className="btn btn-primary uppercase block w-full mb-1"
                            onClick={() =>
                              disburseInvestmentProfit(props.data.clientId)
                            }
                          >
                            disburse profit
                          </button>
                          <button
                            className="btn btn-danger uppercase block w-full"
                            onClick={() => props.close()}
                          >
                            close
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Trans = (props: transProps) => {
  const [collectdata, setcollectdata] = useState(listInvestmentProps);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    setcollectdata(props.data);
    setloading(true);
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 overflow-y-scroll">
        <div className="max-w-5xl mx-auto">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <div>Investment Detail</div>
                <div>
                  <XMarkIcon
                    className="w-6 hover:fill-gray-500 hover:cursor-pointer"
                    onClick={() => props.close()}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border">
                    <td className="border p-2">Created on</td>
                    <td className="border p-2">Client Name</td>
                    <td className="border p-2">Particulars</td>
                    <td className="border p-2">Txn No</td>
                    <td className="border p-2">Debit</td>
                    <td className="border p-2">Credit</td>
                    <td className="border p-2">Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {loading &&
                    collectdata !== undefined &&
                    collectdata.map((data, i) => (
                      <tr>
                        <td className="border p-2">
                          {new Date(data.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )}
                        </td>
                        <td className="border p-2">
                          {data.clientId.firstName +
                            " " +
                            data.clientId.lastName}
                        </td>
                        <td className="border p-2">{data.particular}</td>
                        <td className="border p-2 text-blue-500">
                          TXN-0000{data.txnNo}
                        </td>
                        <td className="border p-2">
                          {data.type === "debit"
                            ? formatIndianRupee(data.amount)
                            : formatIndianRupee(0)}
                        </td>
                        <td className="border p-2">
                          {data.type === "credit"
                            ? formatIndianRupee(data.amount)
                            : formatIndianRupee(0)}
                        </td>
                        <td className="border p-2">
                          {formatIndianRupee(data.balance)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfitSharing;
