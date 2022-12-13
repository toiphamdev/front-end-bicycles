import { slice } from "lodash";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "../access/img/logo-bicycle.jpg";
import { handleUserLogout } from "../redux/actions/userAction";
import { getNotifyService, updateNotifyService } from "../services/userService";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifyArr, setNotifyArr] = useState([]);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  let fecthNotify = useSelector((state) => state.app.fecthNotify);
  let dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(handleUserLogout({ id: userInfo.id }));
  };
  const getNotify = async () => {
    let res = await getNotifyService(userInfo.email);
    if (res && res.errCode === 0) {
      setNotifyArr(res.data);
    }
  };

  const updateNotify = async (id) => {
    let res = await updateNotifyService({ id: id });
    getNotify();
  };

  useEffect(() => {
    getNotify();
  }, [fecthNotify]);

  return (
    <div style={{ zIndex: 10, position: "fixed", width: "100%", top: 0 }}>
      <Navbar color="info" light expand="md">
        <NavbarBrand style={{ height: "60px", width: "100px" }} href="/">
          <img className="h-100 w-100" src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Dịch vụ
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <Link className="nav-link" to="/history">
                    Lịch sử giao dịch
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link className="nav-link" to="/bicycle-rentting">
                    Xe đang thuê
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link className="nav-link" to="/search">
                    Tìm xe theo mã
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link className="nav-link" to="/post">
                Bài viết
              </Link>
            </NavItem>
            {isLoggedIn && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Thông báo
                  <MDBIcon
                    color="secondary mx-2"
                    icon="bell"
                    className="me-2"
                  />
                  <span
                    style={{
                      padding: "0px 6px",
                      position: "absolute",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#ffff",
                      top: "6px",
                      right: "20px",
                    }}
                    className="rounded-5 bg-danger"
                  >
                    {notifyArr.length}
                  </span>
                </DropdownToggle>
                <DropdownMenu
                  style={{ overflowY: "scroll", height: "300px" }}
                  className="scrollspy-example-2"
                  end
                >
                  {notifyArr.map((item) => {
                    return (
                      <DropdownItem
                        onClick={() => {
                          updateNotify(item.id);
                        }}
                        key={item.id}
                      >
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <span style={{ color: "blue" }}>Đánh dấu đã đọc</span>
                        <DropdownItem divider />
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <span
                    className="rounded-5 bg-secondary"
                    style={{
                      padding: "6px 14px",
                      fontSize: "20px",
                      backgroundImage: `url(${
                        userInfo.image ? userInfo.image : ""
                      })`,
                      backgroundSize: "contain",
                    }}
                  >
                    {!userInfo.image &&
                      userInfo.email.slice(0, 1).toUpperCase()}
                  </span>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <Link className="nav-link" to="/user-info">
                      Thông tin cá nhân
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />

                  <DropdownItem
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <span className="nav-link">Đăng xuất</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <Link className="nav-link" to="/login">
                  Đăng nhập
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
