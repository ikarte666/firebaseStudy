import React, { useState, useEffect } from "react";
import MainRouter from "components/Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => {
                        return user.updateProfile(args);
                    },
                });
            } else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => {
                return user.updateProfile(args);
            },
        });
    };

    return (
        <>
            {init ? (
                <MainRouter
                    refreshUser={refreshUser}
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                />
            ) : (
                "Initializing..."
            )}
            {/* <footer>&copy; {new Date().getFullYear()}</footer> */}
        </>
    );
}

export default App;
