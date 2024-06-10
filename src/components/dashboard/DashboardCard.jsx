// src/components/SummaryCard.jsx

import React from 'react';

export const DashboardCard = ({
     headerText = 'Summary',
     centerText = '21',
     footerText = 'Due Tasks',
     completedText = 'Completed: 13',
     centerTextColor = 'text-blue-500'
 }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg w-full">
            <div className="text-gray-500 font-semibold text-lg mb-6">{headerText}</div>
            <div className={`text-6xl text-center font-bold ${centerTextColor}`}>{centerText}</div>
            <div className="text-gray-500 text-lg mt-2 text-center">{footerText}</div>
            <div className="text-gray-500 text-center mt-4">{completedText}</div>
        </div>
    );
};

