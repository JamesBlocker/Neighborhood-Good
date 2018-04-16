import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

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
                
                {reverseList.map((p) => {
                    if(p.body.length > 90) {
                    return (
                        <Row key={p._id}>
                            <Col sm="2"></Col>
                            <Col sm="auto">
                                <Card key={p._id}>
                                    <CardImg top width="100%" src={p.image_url} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle>{p.title}</CardTitle>
                                    <CardSubtitle><a href={p.link} target="_blank">{p.link.slice(0,20)}</a></CardSubtitle>
                                    <CardText>{p.body.slice(0,90) + "..."}</CardText>
                                    <Link className="btn btn-warning"to={`/posts/${p._id}`}>More</Link>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm="2"></Col>    
                        </Row>                        
                    )
                } else {
                    return (
                        <Row key={p._id}>
                            <Col sm="2"></Col>
                            <Col sm="auto">
                                <Card key={p._id}>
                                    <CardImg top width="100%" src={p.image_url} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle>{p.title}</CardTitle>
                                    <CardSubtitle><a href={p.link}>{p.link}</a></CardSubtitle>
                                    <CardText>{p.body}</CardText>
                                    <Link className="btn btn-warning"to={`/posts/${p._id}`}>More</Link>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col sm="2"></Col>    
                        </Row>                        
                    )
                }
                })
            
            }

            </div>
        )
    }
}

export default Posts