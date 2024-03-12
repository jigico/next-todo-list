import Link from "next/link";
import React from "react";

export const Nav = () => {
  return (
    <header className="p-8 shadow">
      <nav className="flex items-center justify-center gap-4">
        <Link href="">home</Link>
        <Link href="/about">about</Link>
        <Link href="/report">report</Link>
        <Link href="/todosCsr">todos-csr</Link>
        <Link href="/todosSsr">todos-ssr</Link>
      </nav>
    </header>
  );
};
