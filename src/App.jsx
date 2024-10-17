import './App.css';
import Home from './Home';
import About from'./About';
import Posts from'./Post';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';

function App() {
  return (<BrowserRouter>
    <div>
      <ui>
        <li><Link to = "/">Home</Link> </li>
        <li><Link to = "/about">About</Link></li>
        <li><Link to = "/post?fname=Anakanan&lname=Yardkasamsak">Posts</Link></li>
        <li><Link to = "post/1">Post id 1</Link></li>
        <li><Link to = "post/1">Post id 2</Link></li>
      </ui>
    </div>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/about" element = {<About/>}/>
      <Route path = "/post" element = {<Posts/>}/>
      <Route path = "/post/:id" element = {<Posts/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
