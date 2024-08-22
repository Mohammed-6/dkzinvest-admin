import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import {
  Bars3BottomLeftIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  BellIcon,
  ChevronDoubleRightIcon,
  Cog6ToothIcon,
  CurrencyRupeeIcon,
  KeyIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainmenu = [
  {
    name: "Dashboard",
    icon: <HomeIcon className="w-6 fill-font-color group-hover:stroke-white" />,
    link: "/admin/dashboard",
    menu: [],
  },
  {
    name: "Security Group",
    icon: <KeyIcon className="w-6 fill-font-color group-hover:stroke-white" />,
    link: "/",
    menu: [
      {
        name: "List Security Group",
        link: "/admin/security-group",
      },
      {
        name: "Create SG",
        link: "/admin/security-group/create",
      },
    ],
  },
  {
    name: "User",
    icon: (
      <UserGroupIcon className="w-6 fill-font-color group-hover:stroke-white" />
    ),
    link: "",
    menu: [
      {
        name: "List User",
        link: "/admin/user",
      },
      {
        name: "Create User",
        link: "/admin/user/create",
      },
      {
        name: "Branch",
        link: "/admin/branch",
      },
      {
        name: "Franchise",
        link: "/admin/franchise",
      },
    ],
  },
  {
    name: "Customer",
    icon: (
      <UsersIcon className="w-6 fill-font-color group-hover:stroke-white" />
    ),
    link: "",
    menu: [
      {
        name: "List Customer",
        link: "/admin/customer",
      },
      {
        name: "Create Customer",
        link: "/admin/customer/create",
      },
      {
        name: "Plan",
        link: "/admin/plan",
      },
    ],
  },
  {
    name: "Investment",
    icon: (
      <CurrencyRupeeIcon className="w-6 fill-font-color group-hover:stroke-white" />
    ),
    link: "",
    menu: [
      {
        name: "Currency",
        link: "/admin/investment/currency",
      },
      {
        name: "Transaction",
        link: "/admin/investment/transaction",
      },
      {
        name: "Profit Sharing",
        link: "/admin/investment/profit-sharing",
      },
      {
        name: "Disburse Profit",
        link: "/admin/investment/disburse-profit",
      },
    ],
  },
  {
    name: "Report",
    icon: <BellIcon className="w-6 fill-font-color group-hover:stroke-white" />,
    link: "",
    menu: [
      {
        name: "Plan Wise Report",
        link: "/admin/investment/report",
      },
      {
        name: "Plan Notification",
        link: "/admin/investment/report/plan-notification",
      },
    ],
  },
  {
    name: "Change Password",
    icon: (
      <Cog6ToothIcon className="w-6 fill-font-color group-hover:stroke-white" />
    ),
    link: "/admin/change-password",
    menu: [],
  },
  {
    name: "Logout",
    icon: (
      <ArrowRightEndOnRectangleIcon className="w-6 fill-font-color group-hover:stroke-white" />
    ),
    link: "",
    menu: [],
  },
];

type lapoutProps = {
  children: React.ReactNode;
};
const Layout = (props: lapoutProps) => {
  const [showsidebar, setshowsidebar] = useState<boolean>(true);

  const toogleSidebar = () => {
    setshowsidebar(!showsidebar);
  };
  return (
    <>
      <div className="flex">
        <div
          className={`h-auto shadow-lg ${
            showsidebar ? "w-64" : "w-0 static"
          } duration-150`}
        >
          <div className={`${showsidebar ? "block" : "hidden"}`}>
            <Sidebar showSidebar={toogleSidebar} />
          </div>
        </div>
        <div className="w-full bg-white shadow-lg">
          <Header showSidebar={toogleSidebar} />
          <div className="min-h-screen">{props.children}</div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Footer />
        </div>
      </div>
    </>
  );
};

const Sidebar = (props: any) => {
  const router = useRouter();
  const tootleSidebar = () => {
    props.showSidebar();
  };
  const logout = () => {
    localStorage.removeItem("dkz_login_token");
    toast.success("Logout success!");
    router.push("/login");
  };
  return (
    <>
      <div className="flex justify-center">
        <img src="/images/logo.png" className="h-20 py-3 w-auto" />
      </div>
      <div className="flex items-center">
        <div className="h-0.5 bg-gray-200 rounded-full w-[80%]"></div>
        <div className="ml-2 hidden">
          <ChevronDoubleRightIcon
            className="stroke-black/60 h-7"
            onClick={tootleSidebar}
          />
        </div>
      </div>
      <div className="">
        <ul className="mt-6 mx-3">
          {mainmenu.map((menu) => (
            <>
              {menu.menu.length === 0 ? (
                <li className="text-color px-2 py-3 hover:bg-primary duration-150 hover:text-white rounded-md group">
                  <Link
                    href={menu.link}
                    onClick={() => (menu.name === "Logout" ? logout() : "")}
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="">{menu.icon}</div>
                      <div className="font-semibold">{menu.name}</div>
                    </div>
                  </Link>
                </li>
              ) : (
                <SubMenu menu={menu} />
              )}
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

const SubMenu = (props: any) => {
  const menu = props.menu;
  const [submenu, setsubmenu] = useState<boolean>(false);
  const showSub = () => {
    setsubmenu(!submenu);
  };
  return (
    <>
      <li className="group">
        <div
          className="text-color hover:cursor-pointer px-2 py-3 hover:bg-primary duration-150 hover:text-white rounded-md"
          onClick={showSub}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="">{menu.icon}</div>
              <div className="font-semibold">{menu.name}</div>
            </div>
            <div className="">
              <ChevronDownIcon className="w-4" />
            </div>
          </div>
        </div>
        <ul
          className={`list-disc ml-12 text-gray-500 duration-200  ${
            submenu ? "block" : "hidden"
          }`}
        >
          {menu.menu.map((mm: any) => (
            <li className="hover:text-black w-full py-1">
              <Link href={mm.link}>
                <span className="">{mm.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

const Header = (props: any) => {
  return (
    <>
      <div className="h-[60px] bg-white dark:bg-dark dark:border-gray/20 border-b-2 border-lightgray/10 flex items-center justify-between gap-2.5 px-7">
        <div className="flex-auto flex items-center gap-2.5">
          <div className="">
            <button type="button" className="">
              <Bars3BottomLeftIcon
                className="stroke-black/60 h-7"
                onClick={() => props.showSidebar()}
              />
            </button>
          </div>
          <div className="max-w-[180px] md:max-w-[350px] flex-1">
            <form className="hidden min-[420px]:block w-full">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  className="form-input ps-10 h-[42px] dark:border-lightgray/20 dark:text-white dark:bg-lightgray/10 border-2 border-gray/10 bg-gray/[8%] rounded-full text-sm text-dark placeholder:text-lightgray/80 focus:ring-0 focus:border-primary/80 focus:outline-0"
                  placeholder="Search..."
                />
                <MagnifyingGlassCircleIcon className="w-6 absolute fill-gray-400 bottom-2 left-3" />
              </div>
            </form>
          </div>
        </div>
        <div className="sm:block hidden flex-auto">
          <ul className="flex items-center gap-[30px]">
            <li>
              <Link
                className="flex items-center gap-2.5 text-lightgray hover:text-primary duration-300 text-sm font-semibold"
                href="/admin/user"
              >
                <span className="lg:block hidden">User</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2.5 text-lightgray hover:text-primary duration-300 text-sm font-semibold"
                href="/admin/customer"
              >
                <span className="lg:block hidden">Customer</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2.5 text-lightgray hover:text-primary duration-300 text-sm font-semibold"
                href="/admin/investment"
              >
                <span className="lg:block hidden">Investment</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <button type="button" className="flex items-center gap-2.5">
            <img
              className="h-[38px] w-[38px] rounded-full"
              src="/images/logo-sm.png"
              alt="Header Avatar"
            />
            <div className="text-start">
              <div className="flex items-center gap-1">
                <span className="hidden xl:block text-sm font-semibold">
                  User
                </span>
                <ChevronDownIcon className="w-4" />
              </div>
              <span className="hidden xl:block text-xs text-lightgray">
                Employee
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <div className="border-t-gray-200 border-b-0 border-l-0 border-r-0 border-t px-4 py-3">
        <div className="">© 2024 Dikazo Solutions Private Limited</div>
      </div>
    </>
  );
};

export default Layout;
