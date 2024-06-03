import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useContext, useEffect, useState} from "react";
import {channelService} from "../../api/user/channel";
import {AuthContext} from "../../context/AuthContext";

export const ViewAnalytic = (props) => {
    const context = useContext(AuthContext);
    const channel = context.user;
    const [viewData, setViewData] = useState([]);
    const fetchData = async () => {
        const result = await channelService.getViewAnalytic(channel.id);
        if (result.success) {
            setViewData([{_id: '2024-01-06', viewCount: 10}, ...result.data.data]);
            console.log(result.data.data)
        }
    }

    const initData = async () => {
        await fetchData();
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className={'w-full h-full border-2 border-gray-200 rounded-xl'}>
            <div className={'text-white font-semibold bg-gray-400 p-3 pl-6 rounded-t-xl' }>
                View Analytic
            </div>
            <ResponsiveContainer width="100%" height="100%" className={'mt-8  p-3 pb-20'}>
                <LineChart
                    width={'100%'}
                    height={'100%'}
                    data={viewData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id"  padding={{ left: 30, right: 30 }} tick={{ display: 'none' }} />
                    <YAxis tickCount={2} domain={[0, parseInt(viewData.reduce((max, item) => (item.viewCount > max ? item.viewCount : max), -Infinity)) * 1.2]} />
                    <Tooltip />
                    <Legend values={"View"} />
                    <Line type="monotone" dataKey="viewCount" name={"View"} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
}