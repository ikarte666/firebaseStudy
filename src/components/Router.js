import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const MainRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </>
                ) : (
                    <Route>
                        <Auth exact path="/" />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default MainRouter;