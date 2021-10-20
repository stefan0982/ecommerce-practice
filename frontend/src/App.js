import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AdminRoute from './pages/AdminRoute';
import UsersPage from './pages/UsersPage';

const persistor = persistStore( store );

function App() {

  return (
      <Provider store={ store }>
        <PersistGate loading={ null }
                     persistor={ persistor }>
          <BrowserRouter>
            <Switch>
              <Route path="/"
                     exact>
                <MainPage/>
              </Route>
              <Route path="/login"
                     exact>
                <LoginPage/>
              </Route>
              <Route path="/register"
                     exact>
                <RegisterPage/>
              </Route>
              <Route path="/products/:id"
                     exact
                     component={ ProductPage }/>
              <AdminRoute path="/users" component={UsersPage} exact />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;
