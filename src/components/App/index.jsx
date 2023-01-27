import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import Main from '../../pages/Main';
import {useState} from 'react';
import AuthContext from '../../AuthProvider';
import Header from '../../components/Header';

function App() {

  const [isLoggenIn, setIsLoggenIn] = useState(false);

  return (
    
    // <AuthContext.Provider
    //   value={{
    //   setIsLoggenIn,
    //   isLoggenIn
    //   }}
    // >

      <main className='App'>
        <Header/>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginPage/>} />
            <Route path='main' element={<Main />} />
          </Route>
        </Routes>
      </main>
    // </AuthContext.Provider>
    
  );
}

export default App;
