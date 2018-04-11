import React from 'react'
import httpClient from '../httpClient'

class Profile extends React.Component {

    state = {
        fields: httpClient.getCurrentUser()
    }

    handleEditClick() {
        console.log("clicked")
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Profile</h1>
                <h2>{this.state.fields.name}</h2>
                <button onClick={this.handleEditClick.bind(this)}>Edit</button>
            </div>
        )
    }
}

export default Profile