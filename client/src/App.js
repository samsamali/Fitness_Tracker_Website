import {ThemeProvider, styled} from 'styled-components';
import {lightTheme} from './utils/Themes';
import { BrowserRouter } from "react-router-dom"
import Authentication from './pages/Authentication';
import Documentation from "./pages/Documentation";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Workouts from './pages/Workout';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container=styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
background-color: ${({theme}) => theme.bg};
color:${({theme}) => theme.text_primary};
overflow-x:hidden;
overflow-y:hidden;
transition: all 0.2s ease;

`
function App() {
  const {currentUser} = useSelector((state) => state.user)
   return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
      {currentUser ? (
        <Container>
          <Navbar currentUser={currentUser} />
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
           <Route path="/documentation" element={<Documentation />} />   
          </Routes>
        </Container>
      ) : (
        <Container>
          <Authentication />
        </Container>
      )}
      
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
