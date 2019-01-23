import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux'
import {Button, Tabs, Tab, Form, FormGroup, FormControl} from 'react-bootstrap';
import NavLink from './NavLink';

class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    async componentDidMount() {
        console.log()

        this.setState({user: this.props.user});
    }

    render() {
        const {user, isAuthenticated} = this.props;
        console.log(this.state);
        return (
            <div style={{backgroundColor: "#fff"}}>

                <Header/>

                <div style={{paddingTop: "118px"}}>
                    <div className="mainBanner">
                        <p className="mainBanerH1" style={{color:"#fff"}}>Family is why.</p>
                        <p style={{fontSize: "3rem", color:"#fff"}}>Life is why we walk. What's your reason?</p>
                    </div>
                </div>


                <div className="featureBanner">
                    <div className="mainPageBtnBlock">
                        <NavLink to="/login">
                            <Button bsStyle="danger" bsSize="large" className="mainPageBtn">Create a new Fund</Button>
                        </NavLink>
                    </div>
                    <div className="mainPageBtnBlock">
                        <NavLink to="/startteam">
                            <Button bsStyle="danger" bsSize="large" className="mainPageBtn">Contribute to a Fund</Button>
                        </NavLink>
                    </div>
       
                </div>

                <div className="mainPageSearch">
                    <div style={{textAlign: "center"}}>
                        <h1 className="mainPageSearchH1">Search for a Walker, Team or Event</h1>
                        <p className="mainPageSearchP">Looking for a walker or team to join or donate towards?</p>
                        <p className="mainPageSearchP">Put your money where your heart is.</p>
                        <p className="mainPageSearchP">Help create big science, like science that created the artificial
                            heart valve. Your donation will help scientists develop lifesaving breakthroughs. What will
                            you help us innovate next?</p>
                        <p className="mainPageSearchP">Simply enter their first name, last name or team name below and
                            click search.</p>
                    </div>
                    <div className="mainSeachBlockTabs">
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Walker">
                                <Form inline>
                                    <FormGroup controlId="formInlineName" bsSize="large">
                                        <FormControl type="text" placeholder="First Name"/>
                                        <FormControl type="text" placeholder="Last Name"/>
                                    </FormGroup>{' '}
                                    <Button className="border-radius-unset" bsStyle="danger" bsSize="large" type="submit">Search</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey={2} title="Team">
                                <Form inline>
                                    <FormGroup controlId="formInlineName" bsSize="large">
                                        <FormControl type="text" placeholder="Enter team name"/>
                                    </FormGroup>{' '}
                                    <Button className="border-radius-unset" bsStyle="danger" bsSize="large"  type="submit">Search</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey={3} title="Event">
                                <Form inline>
                                    <FormGroup controlId="formInlineName"  bsSize="large">
                                        <FormControl type="text" placeholder="Zip Code"/>
                                    </FormGroup>{' '}
                                    <Button className="border-radius-unset" bsStyle="danger" bsSize="large"  type="submit">Search</Button>
                                </Form>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);