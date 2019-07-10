// /client/App.js
import React, {Component} from 'react';
import {NameForm} from './NameForm';
import {retrieveAllPeopleFromDB, deletePersonFromDB, updatePersonDB} from './databaseService';


class App extends Component {
    // initialize our state
    state = {
        data: [],
        refresh: false,
    };

    //on start up fetch all existing data in our db
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

    // get method that uses our service layer to contact our backend api to
    // fetch data from our database and set it on state
    getDataFromDb = () => {
        retrieveAllPeopleFromDB().then((res) => {
            this.setState({data:res })
        });
    };

    // delete method that uses our service layor to contact the backend api to
    // delete data from our database
    deleteFromDB = (data) => {
        deletePersonFromDB(data).then(()=> {
            console.log("in promiose");
            this.getDataFromDb()
        })
    };

    //sets the status of the checkbox and then use service layer
    //to update checkbox in background
    handleInputChange = (data) => {

        if(data.isChecked){
            data.isChecked =false;
        }else{
            data.isChecked =true;
        }

        updatePersonDB(data)

    };


    render() {
        const {data} = this.state;
        let count = 0;
        return (
            <div>
                <ul>
                    {console.log("display data"+JSON.stringify(data))}
                    {data == undefined || data.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : data.map((data) => (
                            <li style={{padding: '10px'}} key={count++}>
                                <span style={{color: 'blue'}}> name: </span> {data.name} <br/>
                                <span style={{color: 'blue'}}> age:</span> {data.age} <br/>
                                <span style={{color: 'blue'}}> balance:</span> {data.balance} <br/>
                                <span style={{color: 'blue'}}> email:</span> {data.email} <br/>
                                <span style={{color: 'blue'}}> address:</span> {data.address}
                                    <input
                                        type="checkbox"
                                        defaultChecked={data.isChecked}
                                        onChange={()=>this.handleInputChange(data)}
                                    />
                                    <br/>
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
            </div>
        );
    }
}

export default App;