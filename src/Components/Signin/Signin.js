import React, { Component } from 'react';

class Signin extends Component {

	constructor(props){
		super(props);
		this.state = {
			signinEmail: '',
			signinPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signinEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signinPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://young-basin-95333.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signinEmail,
				password: this.state.signinPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.id){
				this.props.loadUser(data)
				this.props.onRouteChange('home')
 
			} else{
				console.log("Invalid email or password");
			}
		})
	}

	render(){
		const  {onRouteChange } = this.props;
		return(
				<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
				<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
							<input 
							className="pa2 input-reset ba bg-transparent  w-100 white" 
							type="email" 
							name="email-address"  
							id="email-address" 
							onChange = {this.onEmailChange}	
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							<input 
							className="b pa2 input-reset ba bg-transparent w-100 white" 
							type="password" 
							name="password"  
							id="password" 
							onChange = {this.onPasswordChange}
							/>
						</div>
						</fieldset>
						<div className="">
						<input 
						onClick={this.onSubmitSignIn}
						className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
						type="submit" value="Sign in" 
						/>
						</div>
						<div className="lh-copy mt3">
						<p 
							onClick={() => onRouteChange('register')} 
							className="f6 link dim white db pointer">
						Register
						</p>
						</div>
				</div>
				</main>
			</article>
			);
	}

}

export default Signin;