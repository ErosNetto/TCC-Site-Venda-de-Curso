import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Index from '../pages/Index';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Configuracoes from '../pages/Configuracoes';
import Curso from '../pages/Curso';

import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Index} isClosed={false} />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />

      <MyRoute exact path="/home/" component={Home} isClosed />
      <MyRoute
        exact
        path="/configuracoes/"
        component={Configuracoes}
        isClosed
      />
      <MyRoute exact path="/cursos/:id/" component={Curso} isClosed />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}