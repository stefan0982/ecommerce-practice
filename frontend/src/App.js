import { Provider }                     from 'react-redux'
import { store }                        from './store/store'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import MainPage                         from './pages/MainPage'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/*header*/}
        <Switch>
          <Route path="/" exact>
            <MainPage/>
          </Route>
        </Switch>
        {/*footer*/}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
