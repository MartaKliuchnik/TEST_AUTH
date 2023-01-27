import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import Main from '../../pages/Main';
import {useState} from 'react';
import { Context } from '../../context';
import Header from '../../components/Header';

function App() {

  const [isLoggenIn, setIsLoggenIn] = useState(false);

  return (
    <Context.Provider value={{
      setIsLoggenIn,
      isLoggenIn
    }}>
      <Header/>
      <Routes>
        <Route path='/'>
          <Route index element={<LoginPage/>} />
          <Route path='main' element={<Main />} />
        </Route>
      </Routes>
    </Context.Provider>
    
  );
}

export default App;
