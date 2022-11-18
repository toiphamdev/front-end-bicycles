import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const SystemHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand style={{ height: "60px", width: "100px" }} href="/">
          <img className="h-100 w-100" src={logo} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Dịch vụ
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Cho thuê xe đạp</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Chạy roadshow</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
              <Link className="nav-link" to="/system/manage-ticket">
                Quản lí vé
              </Link>
            </NavItem>
            {isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {userInfo.name}
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>Cho thuê xe đạp</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Chạy roadshow</DropdownItem>
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
