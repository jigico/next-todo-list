import type { CompanyInfo } from "@/types/CompanyInfo";
import React from "react";

const AboutPage = async () => {
  const response = await fetch("http://localhost:4000/companyInfo");
  const companyInfo: CompanyInfo = await response.json();

  return (
    <ul className="text-center">
      <li>회사명: {companyInfo?.name}</li>
      <li>회사 소개: {companyInfo?.description}</li>
      <li>회사 홈페이지 주소: {companyInfo?.url}</li>
    </ul>
  );
};
export default AboutPage;
