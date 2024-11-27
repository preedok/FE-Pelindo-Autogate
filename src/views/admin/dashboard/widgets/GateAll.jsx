import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GateCard from './components/GateCard';
import api from '../../../../service/api';
import TransactionTable from './components/TransactionTable';

const GateAll = ({ view }) => {
    const [gateData, setGateData] = useState([]);
    const fetchGateData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/Lane', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log('response lane', response)
            console.log('response data lane', response.data)
            if (response.status === 200) {
                setGateData(response.data);
            } else {
                console.error('Failed to fetch gate data:', response);
            }
        } catch (error) {
            console.error('Error fetching gate data:', error);
        }
    };
    useEffect(() => {
        fetchGateData();
    }, []);

    const renderGateCards = (transactionType) => {
        const filteredGates = gateData.filter(
            (data) =>
                data.transactionType.toLowerCase() === transactionType.toLowerCase() &&
                !data.name.includes('_') &&
                !data.name.toLowerCase().includes('local')
        );
        return filteredGates.map((data) => (
            <GateCard
                key={data.id}
                isActive={data.active}
                gateNumber={data.name}
                name={data.name}
                id={data.id}
                className="w-full md:w-1/2 lg:w-1/3"
            />
        ));
    };
    AOS.init();
    AOS.refresh();
    return (
        <>
            {view === 'viewIn' ? (
                <div className='flex flex-col'>
                    <div className="flex flex-col justify-center m-3 md:flex-row md:flex-wrap px-3 mt-10  gap-4 ">
                        {renderGateCards('IN')}
                    </div>
                </div>
            ) : null}

            {view === 'viewOut' ? (
                <div className='flex flex-col'>
                    <div className="flex flex-col justify-center m-3 md:flex-row md:flex-wrap px-3 mt-10  gap-4 ">
                        {renderGateCards('OUT')}
                    </div>
                </div>
            ) : null}

            {view === 'import' ? (
                <>
                    <TransactionTable transactionType="import" />
                </>
            ) : null}
            {view === 'export' ? (
                <>
                    <TransactionTable transactionType="export" />
                </>
            ) : null}
        </>
    );
};

export default GateAll;