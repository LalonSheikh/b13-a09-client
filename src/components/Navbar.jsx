import Link from "next/link";
import Image from "next/image";
import { Bulb } from "@gravity-ui/icons";

const Navbar = () => {
  const links = [
    <li key="home">
      <Link href="/">Home</Link>
    </li>,
    <li key="ideas">
      <Link href="/ideas">Ideas</Link>
    </li>,
    <li key="add-idea">
      <Link href="/add-idea">Add Idea</Link>
    </li>,
    <li key="my-idea">
      <Link href="/my-idea">My Ideas</Link>
    </li>,
    <li key="my-interactions">
      <Link href="/my-interactions">My Interactions</Link>
    </li>,
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link
          href="/"
          className="flex justify-center items-center text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent "
        >
          {" "}
          <Bulb className="text-2xl text-red-300 " />
          IdeaVolt
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
          <Link href="/signup">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </button>
              </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            // className="btn btn-ghost btn-circle avatar"
            className="btn btn-ghost  avatar"
          >
            <div className="flex items-center gap-3">
            
              <Link href="/signin">
                <button className="px-4 py-2 rounded-md hover:bg-gray-100">
                  Login
                </button>
              </Link>

            </div>
            {/* <ul className="flex gap-3">
              <li>
                <Link href="/signin">Login</Link>
              </li>{" "}
              <li>
                <Link href="/signup">Register</Link>
              </li>
            </ul> */}
            {/* <Image
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                /> */}
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>

            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
