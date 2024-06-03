import {ViewAnalytic} from "../../../../components/dashboard/ViewAnalytic";

export const OverviewAnalytic = (props) => {
    return (
        <div className={'grid grid-cols-2'}>
            <div className={'col-span-1 h-[450px] p-8'}>
                <ViewAnalytic/>
            </div>
            <div className={'col-span-1 h-[450px] p-8'}>
                <ViewAnalytic/>
            </div>
        </div>
    )
}