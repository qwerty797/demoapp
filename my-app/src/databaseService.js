const url = 'http://localhost:3001/app/people/';

//make db
export function connectToDatabase() {


}

//post to db
export function addPersonToDB(person) {
   return fetch(url + 'postData', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(person),
    }).catch(error => console.log(error))

}

//delete from db
export function deletePersonFromDB(data) {

    return fetch(url + 'deleteData/'+data._id, {
        method: 'DELETE',
        headers: {'content-type': 'application/json'},
        // body: data,
        // body: JSON.stringify(data),
    }).catch(error => console.log(error))

}

//get from db
export function retrieveAllPeopleFromDB() {

    return fetch(url + 'getData')
        .then((data) => data.json())

}

