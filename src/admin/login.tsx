import React, { useEffect, useState } from "react";
import { loginProps } from "./types/login";
import { adminLogin } from "./query/login";
import { useRouter } from "next/router";

const Login = () => {
  return (
    <>
      <Content />
    </>
  );
};

const Content = () => {
  const router = useRouter();
  const [collectdata, setcollectdata] = useState<loginProps>({
    email: "",
    password: "",
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
    if (collectdata.email == "" && collectdata.password == "") {
      setalert({ alert: true, type: "error", message: "Both fields required" });
      return;
    }
    adminLogin(collectdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          localStorage.setItem("dkz_login_token", res.data.token);
          setalert({ alert: true, type: "success", message: "Login success!" });
          // router.push("/admin/dashboard");
          window.location.href = "/admin/dashboard";
        } else {
          setalert({
            alert: true,
            type: "error",
            message: "Email or password incorrect!",
          });
        }
      })
      .catch(() => {
        setalert({
          alert: true,
          type: "error",
          message: "Something went wrong!",
        });
      });
  };
  return (
    <>
      <div className="h-full">
        <div className="container mx-auto flex justify-center min-w-0 h-full">
          <div className="card min-w-[320px] md:min-w-[450px] card-shadow">
            <div className="card-body md:p-10">
              <div className="text-center">
                <div className="logo w-auto">
                  <img
                    className="mx-auto w-[200px]"
                    src="/images/logo.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="">
                <div className="text-center mb-4">
                  <h3 className="mb-1 font-semibold text-2xl">Welcome!</h3>
                  <p>Please enter your credentials to sign in!</p>
                </div>
                <div>
                  <form action="#">
                    <div className="form-container">
                      <div className="form-item">
                        <label className="form-label">Email</label>
                        <div className="">
                          <input
                            className="form-input"
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            value={collectdata.email}
                            onChange={formChange}
                          />
                        </div>
                      </div>
                      <div className="form-item">
                        <label className="form-label">Password</label>
                        <div className="">
                          <span className="input-wrapper ">
                            <input
                              className="form-input"
                              type="password"
                              name="password"
                              autoComplete="off"
                              placeholder="Password"
                              value={collectdata.password}
                              onChange={formChange}
                            />
                            <div className="input-suffix-end">
                              <span className="cursor-pointer text-xl"></span>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="py-3">
                        <a
                          className="w-full block text-center btn cursor-pointer"
                          onClick={formSubmit}
                          type="button"
                        >
                          Sign In
                        </a>
                      </div>
                      <div className="">
                        {alert.alert ? (
                          <div
                            className={`${
                              alert.type === "error"
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white px-2 py-1 rounded-md`}
                          >
                            {alert.message}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
