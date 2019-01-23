import React, {Component} from 'react';
import Header from './Header';
import {connect} from "react-redux";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.user1 = {
            username: "user1",
            password: "password1"
        };
        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    check = event => {
        event.preventDefault();
        if (this.state.username === this.user1.username && this.state.password === this.user1.password) {
            sessionStorage.setItem('Loged in', "true");
            this.props.history.push("/project");
        } else {
            alert("Wrong username or password")
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="loginFormBlock">
                    <form className="loginPageForm" onSubmit={this.handleSubmit}>
                        <ControlLabel><span className="formLabel">Enter details to create a new fund</span></ControlLabel>
                        <FormGroup bsSize="large" controlId="fundname">
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.username}
                                placeholder="fundname"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup bsSize="large" controlId="fundhardcap">
                            <FormControl
                                type="text"
                                value={this.state.password}
                                placeholder="fundhardcap"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup bsSize="large" controlId="benefitiaryaddress">
                            <FormControl
                                type="text"
                                value={this.state.password}
                                placeholder="benefitiaryaddress"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button className="border-radius-unset width100" bsStyle="danger" bsSize="large"
                                type="submit" disabled={!this.validateForm()} onClick={this.check}>Create Fund</Button>
                    </form>
                </div>

            </div>

        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);