import React from 'react'
import httpClient from '../httpClient'
// import { ServerResponse } from 'http';

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
                <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                <input name="title" type="text" placeholder="Title" value={title} />
                <input name="body" type="text" placeholder="Body" value={body} />
                <input name="link" type="text" placeholder="Link" value={link} />
                <input name="image_url" type="text" placeholder="Image Url" value={image_url} />
                <button>Submit</button>
                </form>
            </div>
        )
    }

}

export default NewPost