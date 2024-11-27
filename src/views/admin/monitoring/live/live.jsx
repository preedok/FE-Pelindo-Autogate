import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import ContentCard from '../../../../components/common/Card/CardContent';
import Breadcrombs from '../../../../components/common/Breadcrombs/Breadcrombss';
import CustomTable from "../../../../components/specialized/DataTable/CustomTable";
import LiveCard from "./components/LiveCard";
const Live = () => {
    return (
        <>
            <Helmet>
                <title>TPK AUTOGATE Monitoring | Live</title>
            </Helmet>
            <section className="p-8 mx-5 rounded-lg w-full">
                <Breadcrombs
                    menu={'Monitoring'}
                    submenu={'Live'}
                />
                <div className='mt-5'>
                    <ContentCard>
                        <div className="flex flex-col justify-center md:flex-row md:flex-wrap gap-4 ">
                            <LiveCard />
                            <LiveCard />
                        </div>
                    </ContentCard>
                </div>
            </section>
        </>
    )
}

export default Live
