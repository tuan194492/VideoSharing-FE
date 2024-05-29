import {ChannelCard} from "../../../components/common/channel/ChannelCard";
import SearchBar from "../../../components/common/search/SearchBar";

export const SubscriptionHomePage = (props) => {

    return (
        <div>
            <div className={'font-extrabold text-4xl ml-3 '}>
                Subscription
            </div>
            <div className={'grid grid-cols-5 mt-12'}>
                <div className={'col-span-4 grid grid-cols-4 gap-6 pr-12'}>
                    <ChannelCard className={'col-span-1'} />
                    <ChannelCard className={'col-span-1'} />
                    <ChannelCard className={'col-span-1'} />
                    <ChannelCard className={'col-span-1'} />
                    <ChannelCard className={'col-span-1'} />
                    <ChannelCard className={'col-span-1'} />

                </div>
                <div className={'col-span-1 px-4'}>
                    <SearchBar />
                </div>

            </div>
        </div>

    )
}