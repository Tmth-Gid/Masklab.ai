import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./login/Login";
import ForgotPassword from "./forgot_password/ForgotPassword";
import AdminPanel from "./admin_panel/AdminPanel";
import NavigationPanel from "./navigation_panel/NavigationPanel";
import StatsPanel from "./stats_panel/StatsPanel";
import ViewPanel from "./view_panel/ViewPanel";

function App() {
  return (
    <Suspense fallback={<div> Chargement... </div>}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/begin_password_reset" component={ForgotPassword} />
        <Route path="/admin_panel" component={AdminPanel} />
        <Route path="/navigation_panel" component={NavigationPanel} />
        <Route path="/stats_panel" component={StatsPanel} />
        <Route path="/view_panel" component={ViewPanel} />
      </Switch>
    </Suspense>
  );
}

export default App;