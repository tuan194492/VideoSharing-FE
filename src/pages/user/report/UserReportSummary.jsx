// src/ReportedVideos.js
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {DateUtils} from "../../../utils/date/DateUtils";
import {ReportStatus} from "../../../utils/enum/ReportStatus";
import {useNavigate} from "react-router-dom";
import {reportService} from "../../../api/admin/report";
import {toast} from "react-toastify";
import ReactTable from "react-table-6";
import {ReportType} from "../../../utils/enum/ReportType";

const legendData = [
    { item: 'A', color: 'green', label: 'Approved' },
    { item: 'P', color: 'blue', label: 'Pending approval' },
    { item: 'R', color: 'red', label: 'Rejected' }
];

function getVideoType(value) {
    switch (value) {
        case 'V':
            return 'Video';
        case 'C':
            return 'Comment';
        case 'U':
            return 'User';
        default:
            return 'Undefined';
    }
}

function getContent(report) {
    switch (report.type) {
        case 'V':
            return `/user/video/detail/${report.video_id}`;
        case 'C':
            return `report.comment.content`;
        case 'U':
            return `/user/channel/${report.channel_id}`;
        default:
            return 'Undefined';
    }
}

function getLink(report) {
    switch (report.type) {
        case 'V':
            return `${report.Video.title}`;
        case 'C':
            return `${report.Comment.value}`;
        case 'U':
            return `${report.Channel.name}`;
        default:
            return 'Undefined';
    }
}

const columns = () => [
    {
        Header: 'Id',
        accessor: 'id',
        Cell: props => <div className='text text-center'>{props.value}</div>,
        width: 50

    },
    {
        Header: 'Type',
        accessor: 'type',
        Cell: props => <div className='text text-center' title={getVideoType(props.value)}>{getVideoType(props.value)}</div>,
        width: 100
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: props => <div className='text text-center'>{props.value}</div>,
        width: 80
    },
    {
        Header: 'Content',
        accessor: 'content',
        Cell: props =>{
            if (props.original.type === ReportType.Comment) {
                return <div className='text text-black/[0.7] text-center line-clamp-2 break-words'>
                    {props.original.Comment?.value || 'Comment has been removed'}
                </div>
            } else {
                return <div className='text text-blue-500 text-center line-clamp-2 break-words'>
                    <a
                        href={getContent(props.original)}
                        className={'line-clamp-2 break-words'}> {getLink(props.original)} </a></div>
            }

        },
        width: 350
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: props => <div className='text line-clamp-2 break-words'>{props.value}</div>,
        width: 350
    },
    {
        Header: 'Created date time',
        accessor: 'createdAt',
        Cell: props => <span className='text'>{DateUtils.formatDate(props.value)}</span>,
        width: 200
    },
    {
        Header: 'Approve Remark',
        accessor: 'approve_remark',
        Cell: props => (
            <div className={'w-full h-full'}>
                <textarea
                    className={'w-full'}
                    value={props.original.approve_remark || ''}
                    readOnly={true}
                />
            </div>

        )
    }
];
export const UserReportSummary = () => {
    const [reportList, setReportList] = useState([]);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchReportData = async () => {
        const result = await reportService.getReportsByUser(token);
        if (!result.success) {
            toast.error(result.message);
        } else {
            setReportList(result.data);
        }
    };

    const handleRemarkChange = (e, reportId) => {
        const { value } = e.target;
        setReportList(prevState => prevState.map(report =>
            report.id === reportId ? { ...report, approveRemark: value } : report
        ));
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    return (
        <div className="container p-2">
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
                <h2 className="text-xl font-normal mb-4 mt-8">Reported list</h2>
                <div
                    className='mt-10'>
                    <ReactTable
                        data={reportList}
                        columns={columns()}
                        defaultPageSize={6}
                        filterable
                        minRows={6}
                    />
                    <div className={'mt-6'}>
                        <ul>
                            {legendData.map((item, index) => (
                                <li key={index}>
                                    {item.item}
                                    <span style={{
                                        backgroundColor: item.color,
                                        width: '10px',
                                        height: '10px',
                                        display: 'inline-block',
                                        marginRight: '5px',
                                        marginLeft: '10px'
                                    }}></span>
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};