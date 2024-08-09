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
import { investmentProps, listInvestmentProps } from "../types/investment";
import {
  customerTransaction,
  investmentCustomerList,
  listTransaction,
  pushToInvestment,
} from "../query/investment";
import { formatIndianRupee } from "@/src/stuff";

const ListSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState(listInvestmentProps);
  const [editcollectdata, seteditcollectdata] = useState<currencyProps>({
    _id: "",
    currencyCode: "",
    country: "",
    created_at: new Date(),
  });
  const [loading, setloading] = useState<boolean>(false);
  const [eloading, seteloading] = useState<boolean>(false);

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

  const closeEditPopup = () => {
    seteloading(false);
  };

  const pushInvest = (data: string) => {
    pushToInvestment(data)
      .then((res) => {
        toast.success(res.data.message);
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
    listTransaction(filter)
      .then((res) => {
        if (res.data.status === true) {
          setcollectdata(res.data.data);
          setloading(true);
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
      <div className="grid grid-cols-1 gap-x-4">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between">
              <div>List Transaction</div>
              <div>
                <button
                  onClick={() => seteloading(true)}
                  className="btn btn-primary"
                >
                  Add Trasnaction
                </button>
              </div>
            </div>
          </div>
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
                  <td className="border p-2">Created on</td>
                  <td className="border p-2">Client Name</td>
                  <td className="border p-2">Particulars</td>
                  <td className="border p-2">Txn No</td>
                  <td className="border p-2">Debit</td>
                  <td className="border p-2">Credit</td>
                  <td className="border p-2">Balance</td>
                  <td className="border p-2">Action</td>
                </tr>
              </thead>
              <tbody>
                {loading &&
                  collectdata !== undefined &&
                  collectdata.map((data, i) => (
                    <tr>
                      <td className="border p-2">
                        {new Date(data.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </td>
                      <td className="border p-2">
                        {data.clientId.firstName + " " + data.clientId.lastName}
                      </td>
                      <td className="border p-2">{data.particular}</td>
                      <td className="border p-2 text-blue-500">
                        TXN-0000{data.txnNo}
                      </td>
                      <td className="border p-2">
                        {data.type === "debit"
                          ? formatIndianRupee(data.amount)
                          : 0}
                      </td>
                      <td className="border p-2">
                        {data.type === "credit"
                          ? formatIndianRupee(data.amount)
                          : 0}
                      </td>
                      <td className="border p-2">
                        {formatIndianRupee(data.balance)}
                      </td>
                      <td className="border p-2">
                        <div className="flex items-center gap-x-3">
                          {data.invested === true ? (
                            <div className="">
                              <button className="btn btn-danger">
                                Invested
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {eloading ? <EditBranch data={prereq} close={closeEditPopup} /> : ""}
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
  const [collectdata, setcollectdata] = useState<investmentProps>({
    _id: "",
    clientId: "",
    planId: "",
    txnNo: "",
    txnId: "",
    particular: "Money deposit",
    type: "credit",
    currencyId: "",
    amount: 0,
    balance: 0,
    description: "Money deposit for test",
    modeOfPayment: "Cash",
    maturityDate: "",
    branch: "",
    balanceExpire: false,
    invested: false,
    reInvest: false,
    created_at: new Date(),
  });
  const [client, setclient] = useState<number | null>();
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const [prereq, setprereq] = useState<any>({
    currency: [],
    customer: [],
  });

  useEffect(() => {
    setprereq({
      currency: props.data.currency,
      customer: props.data.customer,
    });
  }, []);
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formSelectCLChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const evt = e.target as HTMLSelectElement;
    setclient(evt.value as any);
    const cus = prereq.customer[evt.value];
    console.log(cus);
    setcollectdata({
      ...collectdata,
      clientId: cus._id,
      planId: cus.currentPlan,
      branch: cus.franchise,
    });
  };
  const formSubmit = () => {
    const colte = collectdata;
    colte.amount = Number(colte.amount);
    // console.log(colte);
    // return;
    if (collectdata.clientId === "" || collectdata.amount === 0) {
      setalert({
        alert: true,
        type: "error",
        message: "Client and amount required!",
      });
      return;
    }
    customerTransaction(colte)
      .then((res) => {
        if (res.data.status === true) {
          setalert({
            alert: true,
            type: "success",
            message: res.data.message,
          });
          setcollectdata({
            ...collectdata,
            _id: "",
            clientId: "",
            planId: "",
            txnNo: "",
            txnId: "",
            particular: "",
            type: "",
            currencyId: "",
            amount: 0,
            balance: 0,
            description: "",
            modeOfPayment: "",
            maturityDate: "",
            branch: "",
          });
          setclient(null);
          toast.success(res.data.message);
        } else {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          props.close();
        }, 3000);
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
        <div className="card-header">Add Money</div>
        <div className="card-body">
          <div className="">
            <label>Client ID</label>
            <select
              name="clientId"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={(e) => formSelectCLChange(e)}
              value={client}
            >
              <option value="">Select</option>
              {prereq.customer !== undefined &&
                prereq.customer.map((req: any, i: number) => (
                  <option value={i}>
                    {req.firstName + " " + req.lastName}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <label>Currency ID</label>
            <select
              name="currencyId"
              className="w-full rounded-md p-2 border border-gray-200"
              onChange={formSelectChange}
              value={collectdata.currencyId}
            >
              <option value="">Select</option>
              {prereq.currency !== undefined &&
                prereq.currency.map((req: any) => (
                  <option value={req._id}>{req.currencyCode}</option>
                ))}
            </select>
          </div>
          <div className="">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full rounded-md p-2 border border-gray-200"
              placeholder="Country"
              onChange={formChange}
              value={collectdata.amount}
            />
          </div>
          <div className="flex justify-between items-center">
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
              <button className="btn btn-danger" onClick={() => props.close()}>
                Close
              </button>
            </div>
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
