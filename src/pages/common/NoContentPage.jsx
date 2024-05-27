import {useNavigate} from "react-router-dom";

export const NoContentPage = (props) => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const page = role?.substring(1, role.length - 1).toLowerCase() || 'guest';
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <div className={'flex justify-center'}>
                    <img
                        src={'https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png'}
                        alt={'No content'}/>
                </div>
                <p className="mt-8 text-sm text-gray-600">It looks like there's nothing here right now. Check back later
                    or try something else.</p>
            </div>
        </div>
    );
}