import {DashboardCard} from "../../../components/dashboard/DashboardCard";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {dashboardService} from "../../../api/admin/dashboard";
import {DateUtils} from "../../../utils/date/DateUtils";
import {StringUtils} from "../../../utils/string/StringUtils";
import {toast} from "react-toastify";

export const DashBoardSummary = (props) => {
    const authContext = useContext(AuthContext);
    const token  = authContext.token;
    const [dashboardData, setDashboardData] = useState();
    const [settings, setSettings] = useState({
        view_count_percent: 0,
        point_for_like: 0,
        point_for_dislike: 0,
        point_for_watch: 0,
        point_for_comment: 0
    });
    const fetchDashboard = async () => {
        const result = await dashboardService.getAdminDashboardData(token)
        if (result.success) {
            setDashboardData(result.data.data);
        }
    }

    const fetchSettings = async () => {
        const result = await dashboardService.getSettings(token);
        if (result.success) {
            console.log(result.data.data) // TODO: Display settings in the input fields.
            setSettings(result.data.data);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings({
            ...settings,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have an API endpoint to update the settings
        const result = await dashboardService.updateSettings(token, settings);
        if (result.success) {
            toast.success('Update settings successfully');
        } else {
            toast.error(result.message);
        }
    };

    useEffect(() => {
        fetchDashboard();
        fetchSettings();
    }, []);

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Dashboard
            </div>
            <div
                className='flex flex-row gap-4 mt-10'>
                <DashboardCard
                    headerText="Total Active Users"
                    centerText={dashboardData?.totalActiveUsers}
                    footerText="Total Active Users"
                    completedText=""
                    centerTextColor="text-green-500"
                />
                <DashboardCard
                    headerText="Total Suspended Users"
                    centerText={dashboardData?.totalSuspendUsers}
                    footerText="Total Suspended Users"
                    completedText=""
                    centerTextColor="text-red-500"
                />
                <DashboardCard
                    headerText="Total Videos"
                    centerText={dashboardData?.totalVideos}
                    footerText="Total Videos"
                    completedText=""
                    centerTextColor="text-blue-500"
                />
                <DashboardCard
                    headerText="Total Watch Time"
                    centerText={StringUtils.formatNumber(dashboardData?.totalWatchTime / 60)}
                    footerText="Total Watch Time (minutes)"
                    completedText=""
                    centerTextColor="text-purple-500"
                />
            </div>
            <div className="font-extrabold text-3xl ml-3 mt-12">Settings</div>
            <div className="flex flex-col gap-4 mt-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-row gap-4">
                        <label className="w-1/2">
                            View Count Percent
                            <input
                                type="number"
                                name="view_count_percent"
                                value={settings.view_count_percent}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                        <label className="w-1/2">
                            Points for Like
                            <input
                                type="number"
                                name="point_for_like"
                                value={settings.point_for_like}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label className="w-1/2">
                            Points for Dislike
                            <input
                                type="number"
                                name="point_for_dislike"
                                value={settings.point_for_dislike}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                        <label className="w-1/2">
                            Points for Watch
                            <input
                                type="number"
                                name="point_for_watch"
                                value={settings.point_for_watch}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label className="w-1/2">
                            Points for Comment
                            <input
                                type="number"
                                name="point_for_comment"
                                value={settings.point_for_comment}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Update Settings
                    </button>
                </form>
            </div>
        </div>
    )
}