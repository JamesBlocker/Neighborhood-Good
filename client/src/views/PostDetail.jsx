import React from 'react'
import httpClient from '../httpClient'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

class PostDetail extends React.Component {
   state = {
       post: {_id: "", title: "", body: "", link: "", image_url: "", user: ""},
       modalOpen: false
   }

    handleEditClick() {
        this.setState({
            modalOpen: true
        })
    }

    handleDeleteClick() {
        httpClient.deletePost(this.props.match.params.id).then((serverResponse) => {
            this.props.history.push('/posts')
        })
    }

    handleEditFormSubmit(evt) {
        evt.preventDefault()
        const {title, body, link, image_url} = this.refs
        const postFormFields = {
            title: title.refs.title.value,
            body: body.refs.body.value,
            link: link.refs.link.value,
            image_url: image_url.refs.image_url.value
        }
        httpClient.updatePost(this.props.match.params.id, postFormFields).then((serverResponse) => {
            this.setState({
                modalOpen: false,
                post: serverResponse.data.post
            })
        })
    }

    componentDidMount() {
        httpClient.getPost(this.props.match.params.id).then((serverResponse) => {
            const details = serverResponse.data
            this.setState({
                post: {_id: details._id, 
                    title: details.title, 
                    body: details.body, 
                    link: details.link, 
                    image_url: details.image_url, 
                    user: details.user}
            })
        })
    }
    
    
    render() {
        const {modalOpen} = this.state
        const details = this.state.post
        if(!details) return <h1>Loading</h1>
        return (
           
            <div className="PostDetail" style={ {textAlign: 'center'} }>
                <h1>{details.title}</h1>
                <img src={details.image_url} alt={details.title} />
                <p>{details.body}</p>
                <div>
                    <Button onClick={this.handleEditClick.bind(this)} color="primary">Edit</Button>
                </div>

                <Modal isOpen={modalOpen}>
                    <ModalHeader>Edit Post</ModalHeader>
                    
                    <Form onSubmit={this.handleEditFormSubmit.bind(this)}>
                        <ModalBody>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input ref="title" innerRef="title" type="text" id="title" defaultValue={details.title} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="body">Title</Label>
                                    <Input ref="body" innerRef="body" type="text" id="body" defaultValue={details.body} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="link">Title</Label>
                                    <Input ref="link" innerRef="link" type="text" id="link" defaultValue={details.link} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="image_url">Image URL</Label>
                                    <Input ref="image_url" innerRef="image_url" type="text" id="image_url" defaultValue={details.image_url}/>
                                </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="info">Update</Button>
                            <Button type="button" onClick={this.handleDeleteClick.bind(this)} color="danger">Delete</Button>                        
                        </ModalFooter>
                    </Form>
                </Modal>

            </div>
        )
    }

}

export default PostDetail