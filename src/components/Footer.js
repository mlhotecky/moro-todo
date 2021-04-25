import React from "react";
import {Grid, Row, Col} from "react-flexbox-grid";
import {faFacebook, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import FooterLink from "./FooterLink";

export default function Footer() {
    return (
        <div className="app-footer">
            <Grid className="footer-container">
                <Row className="footer-row">
                    <Col className="footer-left" sm={3}>
                        <Row>
                            <Col md={12}>Marek Lhotecký</Col>
                            <Col md={12}>React developer since 2018</Col>
                        </Row>
                    </Col>
                    <Col className="footer-right" sm={3}>
                        <FooterLink
                            icon={faFacebook}
                            size="2x"
                            link="https://www.facebook.com/marek.m.lhotecky"
                        />
                        <FooterLink
                            icon={faGithub}
                            size="2x"
                            link="https://github.com/mlhotecky"
                        />
                        <FooterLink
                            icon={faLinkedin}
                            size="2x"
                            link="https://www.linkedin.com/in/marek-lhoteck%C3%BD-457050186/"
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}