import {useContext, useEffect} from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarContent,
    SidebarFooter
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {WrapperOwnerSideBar, WrapperSideBar} from "../../style/styled";
import {IMAGES} from "../../utils/images/images";
import {userFooterRoute} from "../../routes/userRoutes";
import {guestRoutes} from "../../routes/guestRoutes";
function initSidebarValue(arrayRoute) {
    arrayRoute.map((route) => {
        let count = 0;
        route?.subRoute.map((subRoute) => {
            if (true) {
                subRoute.able = 1;
                count++;
            }
        });
        route.able = 1;
    });
}
const Sidebar = ({ menuCollapse, setMenuCollapse }) => {
    const navigate = useNavigate();
    const { permission } = useContext(AuthContext);
    const arrayRoute = [...guestRoutes];
    // initSidebarValue(guestRoutes);
    useEffect(() => {
        console.log('Path name ' + window.location.pathname);
        if (window.location.pathname === '/guest') {
            navigate('/guest/homepage');
        }
    }, [window.location.pathname]);
    return (
        <WrapperOwnerSideBar style={{ width: !menuCollapse ? '250px' : '100px'}}>
            <ProSidebar collapsed={menuCollapse}>
                <Menu>
                    <MenuItem
                        hidden={!menuCollapse}
                        icon={IMAGES.icon.collapseOut }
                        onClick={setMenuCollapse}
                        style={{textAlign: "center", fontStyle: "12px"}}
                    >
                        {" "}
                    </MenuItem>
                    <MenuItem
                        value={"Hide menu"}
                        hidden={menuCollapse}
                        icon={IMAGES.icon.collapseIn}
                        onClick={setMenuCollapse}
                        style={{ fontStyle: "12px", float: "right"}}
                    >
                        {""}
                    </MenuItem>
                </Menu>
                <SidebarContent
                    style={{
                        marginTop: '5px',
                        flexGrow: '0.9'
                    }}
                >
                    { arrayRoute.filter(item => item.able == 1).map((item, index) => {
                        return (<Menu iconShape="square" key={item.path}>
                            <MenuItem
                                active={item.path === window.location.pathname || (index === 0 && window.location.pathname === '/')}
                                key = {item.path}
                                icon={item.icon}
                                onClick = {() => navigate(item.path || '')}
                                className={'hover:bg-gray-200 rounded-xl text-black/[0.7]'}
                            >
                                {item.title}
                            </MenuItem>
                        </Menu>)
                    })}
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="square">
                        {userFooterRoute.map((item) => (
                            <MenuItem
                                active={item.path === window.location.pathname}
                                onClick = {() => navigate(item.path || '')}
                                key={item.path}
                                icon={item.icon}
                                style={{
                                    font: 'normal normal normal 12px '
                                }}
                            >
                                {item.title}
                            </MenuItem>
                        ))}
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </WrapperOwnerSideBar>
    );
};

export default Sidebar;
