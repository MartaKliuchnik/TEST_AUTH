import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';

import axious from 'axios';
import { useContext } from 'react';
import { Context } from '../../context';
import s from './style.module.sass';

export default function LogIn() {
	const userRef = useRef();
	const errRef = useRef();
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();


	// const goHome = () => navigate('/main');
	const { setIsLoggenIn } = useContext(Context);
	console.log(setIsLoggenIn);

	const submit = async (event) => {
		event.preventDefault();
		setIsLoggenIn(true);
		// goHome();
		// const { login, password } = event.target;

		// const auth_data = {
		// 	login: login.value,
		// 	password: password.value,
		// };
		// console.log(auth_data);
		try {
			const userData = await login({ user, password }).unwrap()
			dispatch(setCredentials({ ...userData, user }))
			setUser('')
			setPassword('')
			navigate('/main')
		} catch (err){
			if (!err?.response) {
				setErrMsg('No Server Response')
			} else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
		}
	};
	
	const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)
    
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    
	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [user, password])

	return (
		isLoading
			? <h1>Loading...</h1>
			: 
			// <section className="login">
            // <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

			// 	<h1>Employee Login</h1>
				
			<form onSubmit={submit} className={s.loginForm}>
			<h2>Register</h2>
			<input
				type='text'
				name='login'
				placeholder='Login'
				onChange={handleUserInput}
				value={user}
				ref={userRef}
				autoComplete='off'
				required
				// onChange={e => setLogin(e.target.value)}
			/>

			<input
				type='password'
				name='password'
				placeholder='Password'
				onChange={handlePwdInput}
				value={password}
				ref={userRef}
				required
				// onChange={e => setPassword(e.target.value)}
			/>

			<button>Submit</button>
		</form>

	);
}
