import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/Router";
import { activeLink } from "../utils/ActiveLink";
import { Button } from "react-bootstrap";

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPage = activeLink(ROUTER.Home, pathname);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-fluid">
          <ul className="navbar-nav mx-auto  mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link
                to={ROUTER.Home}
                className={
                  activeLink(ROUTER.Home, pathname) ? "activeLink" : "Link"
                }
              >
                Table
              </Link>
            </li>
            <li className="nav-item mx-lg-5">
              <Link
                to={ROUTER.AddUser}
                className={
                  activeLink(ROUTER.AddUser, pathname) ? "activeLink" : "Link"
                }
              >
                Add User
              </Link>
            </li>
            <li className="nav-item mt-1">
              <Button
                size="sm"
                className="px-5 py-1 btn-warning fs-4"
                onClick={() => navigate(isPage ? ROUTER.AddUser : ROUTER.Home)}
              >
                {isPage ? "Table" : "Add User"}
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
