import Link from "next/link";
import React from "react";
export default function Nav() {
  return (
    <nav className="flex justify-between px-10 py-2 lg:px-16 min-w-full items-center shadow-md">
      <h1 className="font-semibold font-mono text-2xl text-primary-first">App</h1>
      <div className="flex items-center justify-center gap-4 text-primary-first font-mono">
        <span className="hover:text-primary-tertiary cursor-pointer">Log-out</span>
        <Link to href={"/"}>
          <span className="hover:text-primary-tertiary">Sign-in</span>
        </Link>
        <Link to href={"/signup"}>
          <span className="hover:text-primary-tertiary">Sign-up</span>
        </Link>
      </div>
    </nav>
  );
}
