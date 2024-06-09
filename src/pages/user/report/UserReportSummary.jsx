// src/ReportedVideos.js
import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";

export const UserReportSummary = () => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const [reports, setReports] = useState([]);
    return (
        <div className="container mx-auto p-4">
            <div className="header flex items-center mb-8">
                <h1 className="text-xl font-normal">Thanks for reporting</h1>
            </div>
            <p className="mb-4">
                Any member of the community can flag content to us that they believe violates our Community Guidelines. When something is flagged, it's not automatically taken down. Flagged content is reviewed in line with the following guidelines:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Content that violates our <a href="" className="text-blue-500">Community Guidelines</a> is removed.</li>
                <li>Reports filed for content that has been deleted by the creator cannot be shown.</li>
            </ul>
            <a href="" className="text-blue-500 mb-4 inline-block">Learn more about reporting content.</a>
            <div>
                <h2 className="text-xl font-normal mb-4">Reported videos</h2>
            </div>
        </div>
    );
};