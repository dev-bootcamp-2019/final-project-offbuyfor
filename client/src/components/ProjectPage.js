import React, {Component} from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {Col, Grid, ProgressBar, Row} from "react-bootstrap";

class ProjectPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};

    }
    check(){
        var check = sessionStorage.getItem('Loged in');
        if(check === null ){
            this.props.history.push("/login");
        }
    }

    async componentDidMount() {
        console.log()

        this.setState({user: this.props.user});
    }

    render() {
        const {user, isAuthenticated} = this.props;
        console.log(this.state);
        this.check();
        return (
            <div style={{backgroundColor: "#eee", color: "#000"}}>
                <Header/>
                <div className="container">
                    <div className="simpleBaner"></div>
                    <div className="projectBlock">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={12} md={4}>
                                    <div className="leftBlock">
                                        <div className="progressBar">
                                            <span className='progressText'>Donate</span>
                                        </div>
                                        <div className="progressCust" style={{width: "70%"}}></div>
                                        <div className="projGoals">
                                            <div className="projGoal1">
                                                <span className="cashStyle">$91,650</span>
                                                <div className="cashText">Our<br/>Progress</div>
                                            </div>
                                            <div className="projGoal2">
                                                <span className="cashStyle">$140,000</span>
                                                <div className="cashText">Our<br/>Goal</div>
                                            </div>
                                            <div className="projGoal3">
                                                <div className="shareBlock">
                                                    <p className="shareText">Share this page to help us reach our goal!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={8}>
                                    <div className="rightBlock">
                                        <h1><span style={{color: "#c10e21"}}>Life is why</span> we walk.</h1>
                                        <p className='rightBlockP'>Thanks to all our walkers, donors and volunteers who
                                            have accepted the
                                            challenge to help fight heart disease and stroke. We cannot achieve our
                                            mission without each one of you!</p>
                                        <Grid>
                                            <Row className="show-grid">
                                                <Col xs={12} md={2}>
                                                    <div className="col1">
                                                        <p className="colHeader">Date & Time</p>
                                                        <p>April 6, 2019<br/>
                                                        Check-In 8 AM<br/>
                                                       Starts 9 AM</p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={2}>
                                                    <div className="col2">
                                                        <p className="colHeader">Where</p>
                                                        <p> Koehler Center at University of Findlay
                                                            201 E Lincoln Street<br/>
                                                            Findlay, OH 45840<br/>
                                                            Get Directions
                                                        </p>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={2}>
                                                    <div className="col3">
                                                        <p className="colHeader">Contact</p>
                                                        <p> Your Northwest Ohio Heart Walk Team<br/>
                                                            Email<br/>
                                                            866-441-3686</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Grid>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    <div className="projectDescription">
                        <h1>Hancock County Heart Walk</h1>
                        <h2>Findlay, Ohio</h2>
                        <h2>Saturday, April 6, 2019</h2>
                        <p> By participating in the Heart Walk, you’re joining a million Heart Walk Heroes from across the nation raising funds for lifesaving science. Science that can teach us all how to live longer and be Healthy For Good.

                            <br/><br/>  Take a few minutes to consider the lives you are going to help change for the better through your leadership and donations. We’re talking more moms, dads, brothers, aunts and babies' lives saved. Help keep hearts everywhere beating. Let’s take steps together to cure heart disease and stroke.
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);