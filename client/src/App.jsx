import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import About from './pages/about';
import Profile from './pages/profile';
import Signup from './pages/signup';
import Header from './components/header';
import Action1 from './components/Action1';
import Faculty from './pages/faculty';
import Vendor from './pages/vendor';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter >
      <Header></Header>
      
      <Action1></Action1> 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Faculty" element={<Faculty />} />
        <Route path="/Vendor" element={<Vendor />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
