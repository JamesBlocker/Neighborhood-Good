import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

class NewPost extends React.Component {

    state = {
        fields: { title: '', body: '', link: '', image_url: '' }
    }

    handleFormChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                [evt.target.name]: evt.target.value
            }
        })
    }

    handleFormSubmit(evt) {
        evt.preventDefault()
        httpClient.createPost(this.state.fields).then((ServerResponse) => {
            this.props.history.push("/posts")
        })
    }

    render() {
        const { title, body, link, image_url } = this.state.fields
        return (
            <div className="NewBar">
                <h1>New Post</h1>
                <Row>
                    <Col className="col-3"></Col>
                    <Col className="auto">
                        <Form className="small-form"onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                            <FormGroup>
                                {/* <Label for="title">Title</Label> */}
                                <Input name="title" type="text" placeholder="Title" value={title} />
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="body">Body</Label> */}
                                <Input className="text-heighth" name="body" type="textarea" rows="6" placeholder="Body" value={body} />
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="link">Web Link</Label> */}
                                <Input name="link" type="text" placeholder="Link" value={link} />
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="image_url">Image Url</Label> */}
                                <Input name="image_url" type="text" placeholder="Image Url" value={image_url} />                        
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </Col>
                    <Col className="col-3"></Col>
                </Row>
            </div>
        )
    }

}

export default NewPost