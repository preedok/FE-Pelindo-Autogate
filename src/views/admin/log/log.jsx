import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import "../style.css";
import ContentCard from '../../../components/common/Card/CardContent';
import Breadcrombs from '../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../components/specialized/DataTable/CustomTable";
const Log = () => {
  AOS.init();
  AOS.refresh();

  return (
    <>
      <Helmet>
        <title>TPK AUTOGATE Monitoring | Log</title>
      </Helmet>
      <section className="p-8 mx-5 rounded-lg w-full">
        <Breadcrombs
          menu={'Log'}
          submenu={'Sub Log'}
        />
        <div className='mt-5'>
          <ContentCard>
            Log
          </ContentCard>
        </div>
      </section>
    </>
  );
};

export default Log;


