import React, { useState, useEffect } from "react";
import Layout from "../layout";
import {
  createSecurityGroup,
  loadSecuritySchema,
} from "../query/security-group";
import { securityGroupProps } from "../types/security-group";
import { toast } from "react-toastify";

const CreateSG = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  const [collectdata, setcollectdata] = useState<securityGroupProps>({
    _id: "",
    name: "",
    code: "",
    schema: [{ name: "", sitemap: [{ name: "", urlPath: "", access: false }] }],
    status: true,
  });
  const [alert, setalert] = useState<any>({
    alert: false,
    type: "",
    message: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    loadSecuritySchema()
      .then((res) => {
        setcollectdata(res.data.data);
        //   console.log(res.data);
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

  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    const evt = e.target as HTMLInputElement;
    setcollectdata({ ...collectdata, [evt.name]: evt.value });
  };

  const formCheckboxChange = (
    e: React.FormEvent<HTMLInputElement>,
    i: number,
    x: number
  ) => {
    const { checked }: any = e.target;
    const temp = collectdata;
    temp.schema[i].sitemap[x].access = checked;
    setcollectdata(temp);
    console.log(collectdata);
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
    createSecurityGroup(collectdata)
      .then(() => {
        setalert({
          alert: true,
          type: "success",
          message: "Security Group created",
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
  };
  return (
    <>
      <div className="card">
        <div className="card-header">Create Security Group</div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="w-full rounded-md p-2 border border-gray-200"
                placeholder="Name"
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
          </div>
          <div className="">
            {loading &&
              collectdata.schema !== undefined &&
              collectdata.schema.map((ss, i) => (
                <>
                  <h2 className="text-bold text-lg mt-5">{ss.name}</h2>
                  <div className="grid grid-cols-7 gap-4">
                    {ss.sitemap.map((s, x) => (
                      <div className="flex items-center">
                        <label>
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            onClick={(e) => formCheckboxChange(e, i, x)}
                          />{" "}
                          {s.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </>
              ))}
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

export default CreateSG;
