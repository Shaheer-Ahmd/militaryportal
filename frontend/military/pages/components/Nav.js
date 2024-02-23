import Link from "next/link";
import React from "react";
export default function Nav() {
  return (
    <nav className="flex justify-between px-10 py-2 lg:px-16 fixed min-w-full items-center shadow-md top-0">
      <h1 className="font-semibold font-mono text-2xl text-blue-400">App</h1>
      <div className="flex items-center justify-center gap-4 text-blue-500 font-mono">
        <span className="hover:text-blue-800 cursor-pointer">Log-out</span>
        <Link to href={"/"}>
          <span className="hover:text-blue-800">Sign-in</span>
        </Link>
        <Link to href={"/signup"}>
          <span className="hover:text-blue-800">Sign-up</span>
        </Link>
      </div>
    </nav>
  );
}
