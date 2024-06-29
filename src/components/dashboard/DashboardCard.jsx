// src/components/SummaryCard.jsx

import React, {useEffect, useState} from 'react';

export const DashboardCard = ({
     headerText,
     centerText,
     footerText,
     completedText,
     centerTextColor
 }) => {

    console.log({
        headerText,
        centerText,
        footerText,
        completedText,
        centerTextColor
    })
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(prev => !prev);
    }, [headerText,
        centerText,
        footerText,
        completedText,
        centerTextColor]);
    return (
        <div className="p-4 bg-white shadow-md rounded-lg w-full">
            <div className="text-gray-500 font-semibold text-lg mb-6">{headerText}</div>
            <div className={`text-6xl text-center font-bold ${centerTextColor}`}>{centerText}</div>
            <div className="text-gray-500 text-lg mt-2 text-center">{footerText}</div>
            <div className="text-gray-500 text-center mt-4">{completedText}</div>
        </div>
    );
};

