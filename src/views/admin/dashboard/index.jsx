import React from "react";
import ContentCard from "../../../components/common/Card/CardContent";
import Breadcrombs from "../../../components/common/Breadcrombs/Breadcrombss";
import Dashboard from "./components/Dashboard";
const Index = () => {
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombs menu={"Dashboard"} submenu={"Sub Dashboard"} />
      <ContentCard>
        <Dashboard />
      </ContentCard>
    </section>
  );
};

export default Index;
