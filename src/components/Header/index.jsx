import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import s from './style.module.sass'

export default function Header() {

  const { isLoggenIn, setIsLoggenIn } = useContext(Context);
  
  const handleLogOut = () => {
    setIsLoggenIn(false)
  }

  return (
    <nav className={s.header}>
      {isLoggenIn
        ? <div className={s.container}>
          <MeetingRoomIcon />
          <NavLink to='/' onClick={handleLogOut}>
            LOGOUT
          </NavLink>
        </div>
        : <p className={s.info_text}>Welcome!</p>
      }
      </nav >
  )
}
