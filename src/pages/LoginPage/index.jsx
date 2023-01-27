import React from 'react';
import LogIn from '../../components/LogIn';
import s from './style.module.sass';


export default function LoginPage() {

  return (
    <div className={s.container}>
      <h1>LoginPage</h1>
      <LogIn/>
    </div>
  )
}
