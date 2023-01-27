import React, {useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from '../../AuthProvider';
import s from './style.module.sass';

import axios from '../../api/axios';
const LOGIN_URL = '/auth';


export default function LogIn() {
	const logRef = useRef();
	const errRef = useRef();

	const [log, setLog] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);


	const navigate = useNavigate();
	const goHome = () => navigate('/main');
	const { setIsLoggenIn, setAuth } = useContext(AuthContext);
	
	// console.log(setIsLoggenIn);

	const submit = async (event) => {
		event.preventDefault();
		
		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ log, pwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				});
			console.log(JSON.stringify(response?.data));
			// console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ log, pwd, roles, accessToken });
			setLog('');
			setPwd('');
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status == 401) {
				setErrMsg('Unauthosized')
			} else {
				setErrMsg('Login Failer')
			}
			errRef.current.focus();
		}

		// setIsLoggenIn(true);
		// goHome();
		// const { login, password } = event.target;

		// const auth_data = {
		// 	login: login.value,
		// 	password: password.value,
		// };
		// console.log(auth_data);
	}

	useEffect(() => {
		logRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [log, pwd])


	return (

			<section>
				<p ref={errRef} className={errMsg ? 'errmsg' : "offscreen"} aria-live="assertive">{errMsg}</p>
				
				<form onSubmit={submit} className={s.loginForm}>
					<h2>Register</h2>
					<input
						type='text'
							id='login'
							ref={logRef}
							autoComplete="off"
							onChange={(e) => setLog(e.target.value)}
							value={log}
							placeholder='Login'
							required
						// onChange={e => setLogin(e.target.value)}
					/>

					<input
						type='password'
							id='password'
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						placeholder='Password'
						// onChange={e => setPassword(e.target.value)}
					/>

					<button>Submit</button>
				</form>
			</section>

	);
}
