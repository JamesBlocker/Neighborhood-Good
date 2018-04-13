import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
// import PostDetail from './PostDetail'

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
                <h1>{this.state.fields.name}</h1>
                {/* <Button onClick={this.handleEditClick.bind(this)}>Edit</Button> */}
           
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

                {/* <ul> */}
                    {this.state.posts.map((p) => {
                        if(p.user._id === currentUser) return (
                            <Row key={p._id} className="low-margin">
                                <Col xs="3">
                                    <Link className="btn btn-warning"to={`/posts/${p._id}`}>&#2011;</Link>
                                </Col>
                                <Col xs="auto">
                                    {p.title}
                                </Col>
                            </Row>
                            
                        )
                    })}
                {/* </ul> */}
           
            </div>
        )
    }
}

export default Profile