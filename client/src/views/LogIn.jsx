import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Input, Row, Col } from 'reactstrap'

class LogIn extends React.Component {

    state = {
        fields: { email: '', password: '' }
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
        httpClient.login(this.state.fields).then(user => {
            this.setState({ fields: { email: '', password: '' } })
            if(user) {
                this.props.onLoginSuccess(user)
                this.props.history.push('/posts')
            }
        })
    }

    render() {
        const { email, password } = this.state.fields
        return (
            // <div className='LogIn'>
			// 	<div className='row'>
			// 		<div className='column column-33 column-offset-33'>
			// 			<h1>Log In</h1>
			// 			<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
			// 				<input type="text" placeholder="Email" name="email" value={email} />
			// 				<input type="password" placeholder="Password" name="password" value={password} />
			// 				<button>Log In</button>
			// 			</form>
			// 		</div>
			// 	</div>
            // </div>
            <div>
				<Row>
                    <Col sm="3"></Col>
                    <Col>   
                            <h1>Log In</h1>
                            <Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
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

export default LogIn