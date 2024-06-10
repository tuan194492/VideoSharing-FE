import {DashboardCard} from "../../../components/dashboard/DashboardCard";

export const DashBoardSummary = (props) => {
    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3 '}>
                Dashboard
            </div>
            <div
                className='flex flex-row gap-4 mt-10'>
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
            </div>
        </div>
    )
}