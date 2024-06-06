import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import {HeaderWrapper} from "../../style/styled";
import {IMAGES} from "../../utils/images/images";
import {ImageUtils} from "../../utils/images/ImageUtils";

import socket from "./../../context/Socket";
import {NotificationButton} from "../common/notification/NotificationButton";

function handleMessageFromServer(data) {
    switch (data.type) {
        case 'Comment':
            toast.success(`User ${data.actor_id} commented on video ${data.video_id}`);
            break;
        case 'Like':
            toast.success(`${data.actor_id} liked on video ${data.video_id}`);
            break;
        default:
            break;
    }
}

export default function Navbar() {
    const projectName = process.env.PROJECT_NAME || 'Video Sharing';
    const {clearAuthData, user} = useContext(AuthContext)
    const [searchParam, setSearchParam] = useState('');
    console.log(user)
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';
    const navigate = useNavigate()
    const logout = () => {
        clearAuthData?.();
        toast.success('Logout successful!');
        navigate(`/${page}/login`)
    }
    const returnHome = () => {
        navigate(`/${page}/homepage`)
    }
    const goToPersonal = () => {
        navigate(`/${page}/studio`)
    }

    const goToUploadVideoPage = () => {
        navigate(`/${page}/video/create`)
    }

    useEffect(() => {
        if (user) {
            socket.on(`user${user.id}`, (data) => {
                // console.log(data);
                toast.success(JSON.stringify(data));
                handleMessageFromServer(data);
            })
        }

        return () => {
            socket.off(`user${user?.id}`)
        }
    }, []);



    return (
        <HeaderWrapper className="w-full fixed top-0">
            <nav className='border-0 grid grid-cols-12 w-screen px-10 py-5 z-10 bg-white'>
                <div className='col-span-3 flex items-center cursor-pointer' onClick={returnHome}>
                    <img height={65} width={65} src={IMAGES.icon.appLogo}/>
                    <h1 className='text-xl text-black font-bold'
                        style={{marginLeft: 10, color: "black"}}> {projectName}</h1>
                </div>
                <div className='col-span-5 flex items-center '>
                    <div
                        className='w-screen md:flex items-center border-2 hover:border-gray-400  px-2 py-1 border-gray-200  rounded-md bg-white hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 pt-0.5 text-gray-500 cursor-pointer'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            onClick={e => navigate(`/user/search?param=${searchParam}`)
                            }
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5'
                                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
                        </svg>
                        <input className='ml-2  bg-white outline-0 ' type='text' name='search' id='search'
                               placeholder='Search...'
                               onChange={e => {
                                   setSearchParam(e.target.value);
                               }}
                        />
                    </div>
                </div>
                <div className="col-start-10 col-span-3">
                    <ul className='flex justify-end items-center space-x-6 ml-6'>
                        <li className="cursor-pointer">
                            <button type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={goToUploadVideoPage}>
                                Upload
                            </button>

                        </li>
                        <li>
                            <div className="cursor-pointer">
                                <img
                                    src={user.avatar ? ImageUtils.createImageSrcFromBuffer(user.avatar.data)  : IMAGES.icon.avatar}
                                    className="rounded-full border-2"
                                    style={{
                                        width: '43px',
                                        height: '43px',
                                    }}
                                    onClick={goToPersonal}
                                />
                            </div>
                        </li>
                        <li>
                            <NotificationButton />
                        </li>
                        <li>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6 text-white'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='black'
                                strokeWidth='2'
                                onClick={logout}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                />
                            </svg>
                        </li>
                    </ul>
                </div>

        </nav>
</HeaderWrapper>
)
    ;
}
