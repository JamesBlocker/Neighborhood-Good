import React from 'react'
import httpClient from '../httpClient'

class Posts extends React.Component {
    state = { posts: [] }

    componentDidMount() {
        httpClient.getPosts().then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({ posts: serverResponse.data })
        })
    }

    render() {
        console.log(this.state.posts)
        return (
            <div className="Posts">
                <h1>Post Feed</h1>
                <ul>
                    {this.state.posts.map((p) => {
                        return <li key={p._id}>{p.title} - {p._id}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Posts