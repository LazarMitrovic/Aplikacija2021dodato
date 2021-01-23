//import react from 'react';
import Form from './components/Form';
import Login from './components/Login';
import Regist from './components/Regist';
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';


const App = ()=>{
   
    return(
        <div>
        <Router>
            <Switch>
             <Route exact path="/" component={Login}/>
             <Route exact path="/users" component={Form}/>
             <Route exact path="/registration" component={Regist}/>
            </Switch>
        </Router>
        </div>
    );
}
export default App;