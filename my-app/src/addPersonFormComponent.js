import React, { Component } from 'react';
import {Person} from './Person';
import {addPersonToDB} from './databaseService';


export class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', age:0};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        console.log("handle sub");
        e.preventDefault();
        addPersonToDB(new Person(this.state.name, this.state.age)).then(()=>{

            this.props.getDataFromDb();
        });

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <label>
                    Name:
                    <input type="text"  name={'name'} onChange={this.handleInputChange} />
                </label>
                <label>
                    Age:
                    <input type="text" name='age' onChange={this.handleInputChange} />
                </label>
                <label>
                    Balance:
                    <input type="text"  name={'balance'} onChange={this.handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="text"  name={'email'} onChange={this.handleInputChange} />
                </label>
                <label>
                    Address:
                    <input type="text"  name={'address'} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// {/*<form onSubmit={this.handleSubmit} action="/api/login">*/}
