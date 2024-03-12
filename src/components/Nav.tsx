import Link from "next/link";
import React from "react";

export const Nav = () => {
  return (
    <header>
      <nav>
        <Link href="">home</Link>
        <Link href="/about">about</Link>
        <Link href="/report">report</Link>
        <Link href="/todosCsr">todos-csr</Link>
        <Link href="/todosSsr">todos-ssr</Link>
      </nav>
    </header>
  );
};
