import React, {Component} from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";


class StartTeam extends Component {

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
            <div style={{backgroundColor: "#eee", color: "#000"}}>
                <Header/>
                <div className="container">
                    <div className="simpleBaner"></div>
                    <div className="createTeamFormBlock">
                        <h1>Contribute to a fund</h1>
                        <p>Please select from the list of funds to Contribute</p>
                        <form className="startteam-form">
                            <FormGroup bsSize="large">
                                <ControlLabel><span>Fund Name</span></ControlLabel>
                                <FormControl componentClass="select">
                                    <option value="select">Choose an existing Fund</option>
                                    <option value="select">Fund 1</option>
                                    <option value="select">Fund 2</option>
                                    <option value="select">Fund 3</option>
                                    <option value="other">...</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup  bsSize="large">
                                <ControlLabel><span>Amount to Contribute:</span></ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.value}
                                    placeholder=""
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            
                            <Button className="border-radius-unset" bsStyle="danger" bsSize="large" type="submit">Click to Contribute</Button>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(StartTeam);