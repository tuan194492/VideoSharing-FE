import {useContext, useEffect, useState} from "react";
import {channelService} from "../../../../api/user/channel";
import {ChannelCard} from "../../../../components/common/channel/ChannelCard";
import {Pagination} from "flowbite-react";
import SearchBar from "../../../../components/common/search/SearchBar";
import {AuthContext} from "../../../../context/AuthContext";
import {ChannelCardWithoutSubscribe} from "../../../../components/common/channel/ChannelCardWithoutSubscribe";

export const SubscriberManage = (props) => {
    const authContext = useContext(AuthContext);
    const token = authContext.token;
    const user = authContext.user;
    const numberPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [showSubscriptionList, setShowSubscriptionList] = useState([]);
    const [filteredSubscriptionList, setFilteredSubscriptionList] = useState([]);
    const onPageChange = (page) => {
        setCurrentPage(page);
        setShowSubscriptionList(filteredSubscriptionList.slice((page - 1) * numberPerPage, page * numberPerPage));
    }

    const getSubscriptionList = async () => {
        const result = await channelService.getSubscriberList(user.id);
        console.log(result);
        if (result.success) {
            setSubscriptionList(result.data.data);
            setFilteredSubscriptionList(result.data.data);
            setShowSubscriptionList(result.data.data.slice(0, numberPerPage));
            setTotalPages(prev => Math.min(prev, Math.floor(result.data.data.length / numberPerPage)));
        }
    }

    const initData = async () => {
        await getSubscriptionList();
    }

    const filter = (keyword) => {
        console.log('Filter')
        console.log(keyword);
        if (!keyword) {
            setFilteredSubscriptionList(subscriptionList);
            setShowSubscriptionList(subscriptionList.slice(0, numberPerPage));
            setTotalPages(Math.floor(subscriptionList.length / numberPerPage));
            return;
        }
        setFilteredSubscriptionList(subscriptionList.filter(subscription => {
            return subscription.user.name.toLowerCase().includes(keyword.toLowerCase()) || subscription.user.shortname.toLowerCase().includes(keyword.toLowerCase());
        }));
        setShowSubscriptionList(filteredSubscriptionList.slice(0, numberPerPage));
        setTotalPages(Math.floor(filteredSubscriptionList.length / numberPerPage));
    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div>
            <div className={'font-extrabold text-3xl ml-3'}>
                Subscriber Management
            </div>
            <div className={'grid grid-cols-5 mt-12 '}>
                {
                    filteredSubscriptionList && filteredSubscriptionList.length > 0 &&

                    <div className={'col-span-4 pr-12 '}>
                        <div className={'grid grid-cols-4 gap-6'}>
                            {filteredSubscriptionList.map(subscription => {
                                return <ChannelCardWithoutSubscribe data={subscription} key={subscription.id}/>;
                            })}
                        </div>

                        <div className="flex overflow-x-auto sm:justify-center mt-8">
                            <Pagination layout="pagination" currentPage={currentPage} totalPages={totalPages}
                                        onPageChange={onPageChange}/>
                        </div>
                    </div>
                }
                {
                    filteredSubscriptionList && filteredSubscriptionList.length === 0 &&
                    <div className={'col-span-4 pr-12'}>
                        <div className="text-center mt-12">
                            <div className={'flex justify-center'}>
                                <img
                                    src={'https://cdn.dribbble.com/users/683081/screenshots/2728654/media/d6f3cc39f60fcd48bc2236264b4748b9.png'}
                                    alt={'No content'}/>
                            </div>
                            <p className="mt-8 text-sm text-gray-600">It looks like there's nothing here right now.
                                Check back later
                                or try something else.</p>
                        </div>
                    </div>
                }
                <div className={'col-span-1 px-4'}>
                    <SearchBar filter={filter}/>
                </div>


            </div>
        </div>

    )
}