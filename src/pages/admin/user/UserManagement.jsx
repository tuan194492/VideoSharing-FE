import { DashboardCard } from "../../../components/dashboard/DashboardCard";
import ReactTable from "react-table-6";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { userService } from "../../../api/user/user/index";
import { DateUtils } from "../../../utils/date/DateUtils";
import {UserStatus} from "../../../utils/enum/UserStatus";

const legendData = [
    { item: 'A', color: 'green', label: 'Active' },
    { item: 'S', color: 'red', label: 'Suspended' }
];

const columns = (handleActivate, handleSuspend) => [
    {
        Header: 'Id',
        accessor: 'id',
        Cell: props => <div className='text text-center'>{props.value}</div>,
        width: 50
    },
    {
        Header: 'Name',
        accessor: 'name',
        Cell: props => <div className='text'>{props.value}</div>,
        width: 300
    },
    {
        Header: 'Email',
        accessor: 'email',
        Cell: props => <div className='text'>{props.value}</div>,
        width: 300
    },
    {
        Header: 'Content',
        accessor: 'content',
        Cell: props => <div className='text text-blue-500 text-center'><a href={`/guest/channel/${props.original.id}`} className={'line-clamp-2 break-words'}> {props.original.shortname ?? "No short name"} </a></div>,
        width: 300
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: props => <div className='text text-center'>{props.value}</div>,
        width: 80
    },
    {
        Header: 'Created date time',
        accessor: 'createdAt',
        Cell: props => <div className='text text-center'>{DateUtils.formatDate(props.value)}</div>,
        width: 200
    },
    {
        Header: 'Actions',
        Cell: props => (
            <div className={'flex justify-evenly'}>
                {props.original.status === UserStatus.SUSPEND && (
                    <button
                        onClick={() => handleActivate(props.original.id)}
                        className="text-green-500"
                    >
                        Activate
                    </button>
                )}
                {props.original.status === UserStatus.ACTIVE && (
                    <button
                        onClick={() => handleSuspend(props.original.id)}
                        className="text-red-500 ml-2"
                    >
                        Suspend
                    </button>
                )}
            </div>
        )
    }
];

export const UserManagement = () => {
    const [userList, setUserList] = useState([]);
    const authContext= useContext(AuthContext);
    const token = authContext.token;
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const result = await userService.getAllUsers(token);
        if (!result.success) {
            toast.error(result.message);
        } else {
            setUserList(result.data);
        }
    };

    const handleActivate = async userId => {
        const result = await userService.activateUser(token, userId);
        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setUserList(prevState =>
                prevState.map(user =>
                    user.id === userId ? { ...user, status: UserStatus.ACTIVE } : user
                )
            );
        }
    };

    const handleSuspend = async userId => {
        const result = await userService.suspendUser(token, userId);
        if (!result.success) {
            toast.error(result.message);
        } else {
            toast.success(result.message);
            setUserList(prevState =>
                prevState.map(user =>
                    user.id === userId ? { ...user, status: UserStatus.SUSPEND } : user
                )
            );
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>User Management</div>
            <div className='mt-10'>
                <ReactTable
                    data={userList}
                    columns={columns(handleActivate, handleSuspend)}
                    defaultPageSize={10}
                    filterable
                    minRows={10}
                />
                <div className={'mt-6'}>
                    <ul>
                        {legendData.map((item, index) => (
                            <li key={index}>
                                {item.item}
                                <span
                                    style={{
                                        backgroundColor: item.color,
                                        width: '10px',
                                        height: '10px',
                                        display: 'inline-block',
                                        marginRight: '5px',
                                        marginLeft: '10px'
                                    }}
                                ></span>
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
