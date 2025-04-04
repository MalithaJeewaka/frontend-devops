"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-[10vh] fixed top-0 left-0 flex justify-center items-center z-30 w-screen  text-white">
      <div className="max-w-7xl w-full mx-auto  flex justify-between h-full items-center px-10  text-sm ">
        <div className="flex-1 text-lg">
          <p>
            <Link href={"/"}>Eventure</Link>
          </p>
        </div>
        <nav className="flex-1">
          <ul className="flex items-center gap-3 justify-between">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/my-bookings"}>My Bookings</Link>
            </li>
            <li>
              <Link
                className="bg-red-500 px-4 py-1 rounded-xl hover:opacity-80 transition"
                href={"/login"}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
