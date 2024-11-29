import React from "react";
import ContentCard from "../../../components/common/Card/CardContent";
import Breadcrombs from "../../../components/common/Breadcrombs/Breadcrombss";
const Index = () => {
  return (
    <section className="p-6 mx-5 mt-[78px] rounded-lg w-full">
      <Breadcrombs menu={"Transaction"} submenu={"Sub Transaction"} />
      <div className="mt-5">
        <ContentCard>Transaction</ContentCard>
      </div>
    </section>
  );
};

export default Index;
