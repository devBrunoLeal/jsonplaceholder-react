import React from 'react'

import { Switch, Route } from 'react-router-dom'
import Todos from './views/todos'
import Albums from './views/albums'
import Posts from './views/posts'
import Menu from './componentes/menu'
export default () => {
  return (

    <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/postagens" component={Posts} />
      <Route exact path="/todos" component={Todos} />
      <Route exact path="/albums" component={Albums} />

    </Switch>

  )
}