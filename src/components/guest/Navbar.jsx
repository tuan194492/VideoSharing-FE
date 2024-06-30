import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";
import {HeaderWrapper} from "../../style/styled";
import {IMAGES} from "../../utils/images/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import {DropdownButton} from "../common/button/DropDownButton";
export default function Navbar() {
    const projectName = process.env.PROJECT_NAME || 'Video Sharing';
    const {clearAuthData} = useContext(AuthContext)
    const [searchParam, setSearchParam] = useState('');
    const [searchType, setSearchType] = useState('Video');
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';
    const navigate = useNavigate()

    const logout = () => {
        clearAuthData?.();
        toast.success('Logout successful!');
        navigate(`/${page}/login`)
    }
    const returnHome = () => {
        navigate(`/${page}`)
    }
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
                            onClick={e => navigate(`/guest/search?param=${searchParam}&searchType=${searchType}`)
                            }
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5'
                                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
                        </svg>
                        <input className='ml-2 bg-white outline-0 w-full ' type='text' name='search' id='search'
                               placeholder='Search...'
                               onChange={e => {
                                   setSearchParam(e.target.value);
                               }}
                        />
                        <div className={'relative ml-auto'}>
                            <DropdownButton
                                className={'w-full flex'}
                                options={[
                                    {
                                        value: 'Video',
                                        label: 'Video',
                                        onSelect: () => {
                                            setSearchType('Video');
                                        }
                                    },
                                    {
                                        value: 'Channel',
                                        label: 'Channel',
                                        onSelect: () => {
                                            setSearchType('Channel');
                                        }
                                    }]}
                            />
                        </div>


                    </div>
                </div>
                <div className="col-start-13 col-span-3">
                    <button
                        onClick={e => {
                            navigate('/user/login');
                        }}
                        className="md:flex bg-slate-100 items-center font-bold border-2 hover:border-gray-400  px-2 py-1 border-gray-200  rounded-md bg-white hidden">
                        <p className="text-blue-400  mr-[10px]">Login</p>
                        <FontAwesomeIcon icon={faSignIn} className="ml-[10px]"/>
                    </button>
                </div>

            </nav>
        </HeaderWrapper>
    )
        ;
}
