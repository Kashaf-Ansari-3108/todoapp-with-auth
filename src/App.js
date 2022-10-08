import logo from './logo.svg';
import './App.css';
import TodoApp from './components/TodoApp';
import Login from './screens/login';
import Signup from './screens/signup';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
  
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route>
      <Route path='/todo' element={<TodoApp/>}></Route>
    </Route>
   </Routes>
  
  );
}

export default App;
