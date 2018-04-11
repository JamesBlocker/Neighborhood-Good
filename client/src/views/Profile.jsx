import React from 'react'
import httpClient from '../httpClient'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

class Profile extends React.Component {

    state = {
        fields: httpClient.getCurrentUser(),
        modalOpen: false,
        posts: []
    }

    handleEditClick() {
        console.log("clicked")
        this.setState({
            modalOpen: true
        })
    }

    handleEditFormSubmit(evt) {
        evt.preventDefault()
        const {name, email} = this.refs
        const postFormFields = {
            name: name.refs.name.value,
            email: email.refs.email.value,
        }
        httpClient.updatePost(this.props.match.params.id, postFormFields).then((serverResponse) => {
            console.log(serverResponse.data.fields.name)
            
            // this.setState({
            //     modalOpen: false,
            //     fields: serverResponse.data.user
            // })
        })
    }

    componentDidMount() {
        httpClient.getPosts().then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({ posts: serverResponse.data })
        })
    }

    render() {
        console.log(this.state)
        const {modalOpen} = this.state
        const details = this.state.fields
        const currentUser = httpClient.getCurrentUser()._id
        return (
            <div>
                <h1>Profile</h1>
                <h2>{this.state.fields.name}</h2>
                <Button onClick={this.handleEditClick.bind(this)}>Edit</Button>
           
                <Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Profile</ModalHeader>
                    
                    <Form onSubmit={this.handleEditFormSubmit.bind(this)}>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input ref="name" innerRef="name" type="text" id="name" defaultValue={details.name} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input ref="email" innerRef="email" type="text" id="email" defaultValue={details.email} />
                                </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="info">Update</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                <ul>
                    {/* if(this.state.posts.user._id === httpClient.getCurrentUser) {} */}
                    {this.state.posts.map((p) => {
                        if(p.user._id === currentUser) return <li key={p._id}>{p.title} - {p._id} - {p.user._id}</li>
                    })}
                </ul>
           
            </div>
        )
    }
}

export default Profile