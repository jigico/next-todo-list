"use client";

import type { CompanyInfo } from "@/types/CompanyInfo";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AboutPage = () => {
  const { data, isLoading, isError } = useQuery<CompanyInfo>({
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/company");
      const company = await response.json();

      return company;
    },
    queryKey: ["companyInfo"]
  });

  if (isError) {
    return <div>에러가 발생했습니다</div>;
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <ul>
      <li>회사명: {data?.name}</li>
      <li>회사 소개: {data?.description}</li>
      <li>회사 홈페이지 주소: {data?.url}</li>
    </ul>
  );
};
export default AboutPage;
