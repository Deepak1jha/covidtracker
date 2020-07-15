import React from "react";
import PropTypes from "prop-types";
import {Breadcrumb, BreadcrumbItem, Col, Container, Row} from "reactstrap";

class AlternativeHeader extends React.Component {

  render() {
    return (
      <>
        <div className="header">
          <Container fluid>
            <div className="header-body">
              <Row className="align-items-center py-4">
                <Col lg="6" xs="7">
                  <h6 className="h2 d-inline-block mb-0">{this.props.heading}</h6>{" "}
                  <Breadcrumb
                    className="d-none d-md-inline-block ml-md-4"
                    listClassName="breadcrumb-links"
                  >
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <i className="fas fa-home"/>
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.props.parentName}
                      </a>
                    </BreadcrumbItem>
                    <BreadcrumbItem aria-current="page" className="active">
                      {this.props.name}
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Col>
                <Col className="text-right" lg="6" xs="5">
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

AlternativeHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
  heading: PropTypes.string
};

export default AlternativeHeader;
