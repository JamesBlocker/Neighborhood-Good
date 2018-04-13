import React from 'react'
import httpClient from '../httpClient'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

class Posts extends React.Component {
    state = { posts: [] }

    componentDidMount() {
        httpClient.getPosts().then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({ posts: serverResponse.data })
        })
    }
    
    render() {
        const reverseList = this.state.posts.reverse()
        console.log(reverseList)
        return (
            <div className="Posts">
                <h1>Post Feed</h1>
                {/* <ul>
                    {this.state.posts.map((p) => {
                        return <li key={p._id}>{p.title} - {p._id}</li>
                    })}
                </ul> */}
                {reverseList.map((p) => {
                    return (
                        <Card key={p.id}>
                            <CardImg top width="100%" src={p.image_url} alt="Card image cap" />
                            <CardBody>
                            <CardTitle>{p.title}</CardTitle>
                            <CardSubtitle>{p.link}</CardSubtitle>
                            <CardText>{p.body}</CardText>
                            <Button>read more</Button>
                            </CardBody>
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default Posts