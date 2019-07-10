// /client/App.js
import React, {Component} from 'react';
import {NameForm} from './addPersonFormComponent';
import {retrieveAllPeopleFromDB, deletePersonFromDB} from './databaseService';


class App extends Component {
    // initialize our state
    state = {
        data: [],
        id: 0,
        message: null,
        refresh: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
        this.getDataFromDb();
        console.log("data state", this.state.data);
        if (this.state.refresh) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.setState({intervalIsSet: interval});
        }
    }

    //closing resources when finished
    componentWillUnmount() {
        if (!this.state.refresh) {
            clearInterval(this.state.intervalIsSet);
            this.setState({intervalIsSet: null});
        }
    }

    // get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
        retrieveAllPeopleFromDB().then((res) => {
            this.setState({data:res })
        });
    };

    deleteFromDB = (data) => {
        deletePersonFromDB(data).then(()=> {
            console.log("in promiose");
            this.getDataFromDb()
        })
    };

    updateView(){}



    render() {
        const {data} = this.state;
        let count = 0;
        return (
            <div>
                <ul>
                    {console.log("jamie"+JSON.stringify(data))}
                    {data == undefined || data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((data) => (
                            <li style={{padding: '10px'}} key={count++}>
                                <span style={{color: 'gray'}}> name: </span> {data.name} <br/>
                                <span style={{color: 'gray'}}> age:</span> {data.age} <br/>
                                <span style={{color: 'gray'}}> balance:</span> {data.balance} <br/>
                                <span style={{color: 'gray'}}> email:</span> {data.email} <br/>
                                <span style={{color: 'gray'}}> address:</span> {data.address} <br/>

                                <button onClick={() => this.deleteFromDB(data)}>
                                    DELETE
                                </button>
                            </li>
                        ))}
                </ul>
                <br/>
                <div>
                    < NameForm getDataFromDb={this.getDataFromDb}/>
                </div>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({idToDelete: e.target.value})}
                        placeholder="put id of item to delete here"
                    />

                </div>
                <div style={{padding: '10px'}}>
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({idToUpdate: e.target.value})}
                        placeholder="id of item to update here"
                    />
                    <input
                        type="text"
                        style={{width: '200px'}}
                        onChange={(e) => this.setState({updateToApply: e.target.value})}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                        }
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        );
    }
}

export default App;