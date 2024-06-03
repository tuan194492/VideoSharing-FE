// src/DashboardCard.js
import React from 'react';

export const ChannelDashboardCard = ({ title, subscribers, views, watchTime, topVideos }) => {
    return (
        <div className="bg-white rounded-lg shadow-md border-t-2 border-gray-200 p-6 m-4 w-full max-w-sm">
            <div className="pb-3 mb-3">
                <h3 className="text-lg font-normal">{title}</h3>
                <div className="text-4xl font-bold mt-4">{subscribers}</div>
                <div className="text-gray-500">Current subscribers</div>
            </div>
            <div className="border-t pt-3">
                <div className="mb-4">
                    <h4 className="text-md font-semibold">Summary</h4>
                    <p className="text-gray-500 text-sm">Last 28 days</p>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span>Views</span>
                    <span>{views}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                    <span>Watch time (hours)</span>
                    <span>{watchTime}</span>
                </div>
                <div className="border-t pt-3">
                    <h4 className="text-md font-semibold mb-4">Top videos</h4>
                    <p className="text-gray-500 text-sm">Last 48 hours · Views</p>
                </div>
            </div>
            <div className="mt-4 text-blue-500 text-sm font-semibold">
                Channel Analytics
            </div>
        </div>
    );
};
