import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Input, Row, Col } from 'reactstrap'


class SignUp extends React.Component {

    state = {
        fields: { name: '', email: '', password: '' }
    }

    onInputChange(evt) {
        this.setState({
            fields: {
                ...this.state.fields,
                [evt.target.name]: evt.target.value
            }
        })
    }

    onFormSubmit(evt) {
        evt.preventDefault()
        httpClient.signUp(this.state.fields).then(user => {
            console.log(user)
            this.setState({ fields: { name: '', email: '', password: '' } })
            if(user) {
                this.props.onSignUpSuccess(user)
                this.props.history.push('/posts')
            }
        })
    }

    render() {
        const { name, email, password } = this.state.fields
        return (
            <div>
				<Row>
                    <Col sm="3"></Col>
                    <Col>   
                            <h1>Sign Up</h1>
                            <Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                                <FormGroup>
                                    <Input sm={10} type="text" placeholder="Name" name="name" value={name} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" placeholder="Email" name="email" value={email} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type="password" placeholder="Password" name="password" value={password} />
                                </FormGroup>
                                <Button>Sign Up</Button>
                            </Form>
                    </Col>    
                    <Col sm="3"></Col>                    
               </Row>   
			</div>
        )
    }
}

export default SignUp