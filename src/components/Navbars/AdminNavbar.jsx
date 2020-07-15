/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
    Col,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    ListGroupItem,
    Media,
    Nav,
    Navbar,
    NavItem,
    NavLink,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import {connect} from "react-redux";


const mapStateToProps = state => {
    let authState = state.auth;
    return {fullName: authState.userInfo.fullName};
};

class AdminNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        localStorage.clear();
        this.props.history.push("/")
    }

    render() {
        return (
            <>
                <Navbar
                    className={classnames(
                        "navbar-top navbar-expand border-bottom",
                        {"navbar-dark bg-info": this.props.theme === "dark"},
                        {"navbar-light bg-secondary": this.props.theme === "light"}
                    )}
                >
                    <Container fluid>
                        <Collapse navbar isOpen={true}>


                            <Nav className="align-items-center ml-md-auto" navbar>
                                <NavItem className="d-xl-none">
                                    <div
                                        className={classnames(
                                            "pr-3 sidenav-toggler",
                                            {active: this.props.sidenavOpen},
                                            {"sidenav-toggler-dark": this.props.theme === "dark"}
                                        )}
                                        onClick={this.props.toggleSidenav}
                                    >
                                        <div className="sidenav-toggler-inner">
                                            <i className="sidenav-toggler-line"/>
                                            <i className="sidenav-toggler-line"/>
                                            <i className="sidenav-toggler-line"/>
                                        </div>
                                    </div>
                                </NavItem>
                                <NavItem className="d-sm-none">
                                    <NavLink onClick={this.openSearch}>
                                        <i className="ni ni-zoom-split-in"/>
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="nav-link" color="" tag="a">
                                        <i className="ni ni-bell-55"/>
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="dropdown-menu-xl py-0 overflow-hidden"
                                        right
                                    >
                                        <div className="px-3 py-3">
                                            <h6 className="text-sm text-muted m-0">
                                                You have <strong className="text-info">13</strong>{" "}
                                                notifications.
                                            </h6>
                                        </div>

                                        <ListGroup flush>
                                            <ListGroupItem
                                                className="list-group-item-action"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                tag="a"
                                            >
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            alt="..."
                                                            className="avatar rounded-circle"
                                                            src={require("assets/img/theme/team-1.jpg")}
                                                        />
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">John Snow</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>2 hrs ago</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">
                                                            Let's meet at Starbucks at 11:30. Wdyt?
                                                        </p>
                                                    </div>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="list-group-item-action"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                tag="a"
                                            >
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            alt="..."
                                                            className="avatar rounded-circle"
                                                            src={require("assets/img/theme/team-2.jpg")}
                                                        />
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">John Snow</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>3 hrs ago</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">
                                                            A new issue has been reported for Argon.
                                                        </p>
                                                    </div>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="list-group-item-action"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                tag="a"
                                            >
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            alt="..."
                                                            className="avatar rounded-circle"
                                                            src={require("assets/img/theme/team-3.jpg")}
                                                        />
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">John Snow</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>5 hrs ago</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">
                                                            Your posts have been liked a lot.
                                                        </p>
                                                    </div>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="list-group-item-action"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                tag="a"
                                            >
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            alt="..."
                                                            className="avatar rounded-circle"
                                                            src={require("assets/img/theme/team-4.jpg")}
                                                        />
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">John Snow</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>2 hrs ago</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">
                                                            Let's meet at Starbucks at 11:30. Wdyt?
                                                        </p>
                                                    </div>
                                                </Row>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="list-group-item-action"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                tag="a"
                                            >
                                                <Row className="align-items-center">
                                                    <Col className="col-auto">
                                                        <img
                                                            alt="..."
                                                            className="avatar rounded-circle"
                                                            src={require("assets/img/theme/team-5.jpg")}
                                                        />
                                                    </Col>
                                                    <div className="col ml--2">
                                                        <div
                                                            className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h4 className="mb-0 text-sm">John Snow</h4>
                                                            </div>
                                                            <div className="text-right text-muted">
                                                                <small>3 hrs ago</small>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm mb-0">
                                                            A new issue has been reported for Argon.
                                                        </p>
                                                    </div>
                                                </Row>
                                            </ListGroupItem>
                                        </ListGroup>

                                        <DropdownItem
                                            className="text-center text-info font-weight-bold py-3"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            View all
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="nav-link" color="" tag="a">
                                        <i className="ni ni-ungroup"/>
                                    </DropdownToggle>
                                    <DropdownMenu
                                        className="dropdown-menu-lg dropdown-menu-dark bg-default"
                                        right
                                    >
                                        <Row className="shortcuts px-4">
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                          <i className="ni ni-calendar-grid-58"/>
                        </span>
                                                <small>Calendar</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-orange">
                          <i className="ni ni-email-83"/>
                        </span>
                                                <small>Email</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                          <i className="ni ni-credit-card"/>
                        </span>
                                                <small>Payments</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                          <i className="ni ni-books"/>
                        </span>
                                                <small>Reports</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                          <i className="ni ni-pin-3"/>
                        </span>
                                                <small>Maps</small>
                                            </Col>
                                            <Col
                                                className="shortcut-item"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                xs="4"
                                                tag="a"
                                            >
                        <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                          <i className="ni ni-basket"/>
                        </span>
                                                <small>Shop</small>
                                            </Col>
                                        </Row>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="align-items-center ml-auto ml-md-0" navbar>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                        <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img
                            alt="..."
                            src={require("assets/img/theme/team-4.jpg")}
                        />
                      </span>
                                            <Media className="ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {this.props.fullName}
                        </span>
                                            </Media>
                                        </Media>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem className="noti-title" header tag="div">
                                            <h6 className="text-overflow m-0">Welcome!</h6>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-single-02"/>
                                            <span>My profile</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-settings-gear-65"/>
                                            <span>Settings</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-calendar-grid-58"/>
                                            <span>Activity</span>
                                        </DropdownItem>
                                        <DropdownItem
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className="ni ni-support-16"/>
                                            <span>Support</span>
                                        </DropdownItem>

                                        <DropdownItem
                                            onClick={e => {
                                                e.preventDefault();
                                                this.props.history.push(
                                                    `/admin/employees/reset`);
                                            }}
                                        ><i className="ni ni-support-16"/>
                                            <span>Forget Password</span>
                                        </DropdownItem>

                                        <DropdownItem divider/>
                                        <DropdownItem href="#pablo" onClick={this.logout}>
                                            <i className="ni ni-user-run"/>
                                            <span>Logout</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }
}

AdminNavbar.defaultProps = {
    toggleSidenav: () => {
    },
    sidenavOpen: false,
    theme: "dark"
};
AdminNavbar.propTypes = {
    toggleSidenav: PropTypes.func,
    sidenavOpen: PropTypes.bool,
    theme: PropTypes.oneOf(["dark", "light"])
};

export default connect(mapStateToProps)(AdminNavbar);
