import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Notfound from './pages/notfound';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Motoristas from './pages/motoristas';
import Carros from './pages/carros';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashboard/motoristas" component={Motoristas} />
                <Route exact path="/dashboard/carros" component={Carros} />
                <Route path="*" component={Notfound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;