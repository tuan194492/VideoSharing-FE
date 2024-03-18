import { useContext } from "react";
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
import {WrapperSideBar} from "../../style/styled";
import {IMAGES} from "../../utils/images/images";
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
    const arrayRoute = [];
    initSidebarValue(arrayRoute);
    return (
        <WrapperSideBar style={{ width: !menuCollapse ? "250px" : "70px" }}>
            <ProSidebar collapsed={menuCollapse}>
                <SidebarContent
                    style={{
                        background: "white"
                    }}
                >

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
                    {arrayRoute.map((item, index) =>
                        !item.subRoute.length ? (
                            item.able ? (
                                <Menu iconShape="square">
                                    <MenuItem
                                        active={
                                            item.path === window.location.pathname ||
                                            (index === 0 && window.location.pathname === "/")
                                        }
                                        key={item.path}
                                        icon={item.icon}
                                        onClick={() => navigate(item.path || "")}
                                        style={{
                                            font: "normal normal normal 12px",
                                        }}
                                    >
                                        {item.title}
                                    </MenuItem>
                                </Menu>
                            ) : (
                                ""
                            )
                        ) : item.able ? (
                            <Menu>
                                <SubMenu
                                    suffix={<span className="badge yellow"></span>}
                                    title={item.title}
                                    icon={item.icon}
                                    style={{
                                        font: "normal normal normal 12px ",
                                        marginBottom: 0,
                                    }}
                                >
                                    {item.subRoute.map((e) =>
                                        e.able && permission.includes(e.permission) ? (
                                            <MenuItem
                                                active={e.path === window.location.pathname}
                                                key={e.path}
                                                icon={e.icon}
                                                onClick={() => navigate(e.path || "")}
                                                style={{
                                                    font: "normal normal normal 12px ",
                                                }}
                                            >
                                                {e.title}
                                            </MenuItem>
                                        ) : (
                                            ""
                                        )
                                    )}
                                </SubMenu>
                            </Menu>
                        ) : (
                            ""
                        )
                    )}
                    {/* </Menu> */}
                </SidebarContent>
                <SidebarFooter>

                </SidebarFooter>
            </ProSidebar>
        </WrapperSideBar>
    );
};

export default Sidebar;
