import React from 'react';
import { useNavigate } from 'react-router-dom';

import axious from 'axios';
import { useContext } from 'react';
import { Context } from '../../context';
import s from './style.module.sass';

export default function LogIn() {
	const navigate = useNavigate();


	const goHome = () => navigate('/main');
	const { setIsLoggenIn } = useContext(Context);
	console.log(setIsLoggenIn);

	const submit = async (event) => {
		event.preventDefault();
		setIsLoggenIn(true);
		goHome();
		const { login, password } = event.target;

		const auth_data = {
			login: login.value,
			password: password.value,
		};
		console.log(auth_data);
	}

	return (
				
			<form onSubmit={submit} className={s.loginForm}>
			<h2>Register</h2>
			<input
				type='text'
				name='login'
				placeholder='Login'
				// onChange={e => setLogin(e.target.value)}
			/>

			<input
				type='password'
				name='password'
				placeholder='Password'
				// onChange={e => setPassword(e.target.value)}
			/>

			<button>Submit</button>
		</form>

	);
}
