import {DashboardCard} from "../../../components/dashboard/DashboardCard";
import ReactTable from "react-table-6";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import {reportService} from "../../../api/admin/report";
import {DateUtils} from "../../../utils/date/DateUtils";
import {ReportStatus} from "../../../utils/enum/ReportStatus";
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
            return `/guest/video/detail/${report.video_id}`;
        case 'C':
            return `report.comment.content`;
        case 'U':
            return `/guest/channel/${report.channel_id}`;
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

const columns = (handleApprove, handleReject, handleRemarkChange) => [
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
        width: 300
    },
    {
        Header: 'Description',
        accessor: 'description',
        Cell: props => <div className='text'>{props.value}</div>,
        width: 300
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
                    readOnly={props.original.status !== ReportStatus.PENDING}
                    onChange={(e) => handleRemarkChange(e, props.original.id)}
                />
            </div>

        ),
        width: 300
    },
    {
        Header: 'Actions',
        Cell: props => (
            <div className={'flex justify-evenly'}>
                {props.original.status === ReportStatus.PENDING && <button onClick={() => handleApprove(props.original.id, props.original.approve_remark)} className="text-green-500">Approve</button>}
                {props.original.status === ReportStatus.PENDING && <button onClick={() => handleReject(props.original.id, props.original.approve_remark)} className="text-red-500 ml-2">Reject</button>}
            </div>
        )
    }
];

export const ReportManage = (props) => {
    const [reportList, setReportList] = useState([]);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchReportData = async () => {
        const result = await reportService.getAllReportsForAdmin(token);
        if (!result.success) {
            toast.error(result.message);
        } else {
            setReportList(result.data);
        }
    };

    const handleApprove = async (reportId, approveRemark) => {
        const result = await reportService.approveReport(token, reportId, approveRemark);
        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setReportList(prevState => prevState.map(report =>
                report.id === reportId ? { ...report, status: ReportStatus.APPROVED } : report
            ));        }
    };

    const handleReject = async (reportId, approveRemark) => {
        const result = await reportService.rejectReport(token, reportId, approveRemark);
        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setReportList(prevState => prevState.map(report =>
                report.id === reportId ? { ...report, status: ReportStatus.REJECTED } : report
            ));          }
    };

    const handleRemarkChange = (e, reportId) => {
        const { value } = e.target;
        setReportList(prevState => prevState.map(report =>
            report.id === reportId ? { ...report, approve_remark: value } : report
        ));
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Report Manage
            </div>
            <div
                className='mt-10'>
                <ReactTable
                    data={reportList}
                    columns={columns(handleApprove, handleReject, handleRemarkChange)}
                    defaultPageSize={6}
                    filterable
                    minRows={6}
                />
                <div className={'mt-6'}>
                    <ul>
                        {legendData.map((item, index) => (
                            <li key={index}>
                                {item.item}
                                <span style={{ backgroundColor: item.color, width: '10px', height: '10px', display: 'inline-block', marginRight: '5px', marginLeft: '10px' }}></span>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}