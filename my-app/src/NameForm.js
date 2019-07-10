import React, { Component } from 'react';
import {Person} from './Person';
import {addPersonToDB} from './databaseService';

//NameForm has its own data and behaviour so better to seperate it into
//it's own class and encapsulate the data.
export class NameForm extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //this is made generic so that every input can be handled here
    //rather than have a method for every input change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    //calls service to add someone to the DB
    handleSubmit = (e) => {
        e.preventDefault();
        addPersonToDB(new Person(this.state.name, this.state.age, this.state.balance,this.state.email, this.state.address)).then(()=>{

            //child passes info up to parent so state can be changed
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

