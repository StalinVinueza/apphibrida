import { useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Records from './pages/Records';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("ID"));

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact />
          <Route path="/records" component={Records} exact />
          
          {isAuthenticated ? (
            <Redirect exact from="/" to="/records" />
          ) : (
            <Redirect exact from="/" to="/login" />
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
