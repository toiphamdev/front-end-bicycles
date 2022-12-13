import React, { useState } from "react";
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

const SystemHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleLogout = async () => {
    await dispatch(handleUserLogout({ id: userInfo.id }));
  };
  return (
    <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand style={{ height: "60px", width: "100px" }} href="/">
          <img className="h-100 w-100" src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/system">
                Quản lí địa điểm
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/system/manage-bicycle">
                Quản lí xe đạp
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/system/manage-post">
                Quản lí bài viết
              </Link>
            </NavItem>
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
export default SystemHeader;
