import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from "@mui/material/IconButton";
import { blueGrey } from '@mui/material/colors';
import { Avatar } from "@mui/material";

const style = {
    backgroundColor: "#282c34",
    color: "white",
    padding: "25px"
}

export const AuthStatus = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div style={style}>Loading ...</div>;
    }

    if (isAuthenticated) {
        return (
            <div style={style} className="container justify-content-center">
                <div className="row row-cols-md-3 justify-content-center">
                    <div className="col col-sm-2 offset-md-3 pe-5">
                        <h2>Blog.io</h2>
                    </div>
                    <div className="col col-md-5 d-flex align-items-center">
                            <span>Welcome, {user.name}!</span>
                            {user.picture?
                                <Avatar alt={user.name} src={user.picture} sx={{ marginInlineStart: 2 }} />
                                : 
                                <Avatar alt={user.name} src='' sx={{ marginInlineStart: 2 }} />
                                
                            }
                            <LogoutButton />
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={style} className="container justify-content-center">
                <div className="row row-cols-md-3 row-cols-auto justify-content-center">
                    <div className="col col-sm-3 offset-md-3">
                        <h2>Blog.io</h2>
                    </div>
                    <div className="col col-md-5">
                        <span>Have an account, now! </span>
                        <LoginButton />
                    </div>
                </div>
            </div>
        )
    }
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        // <button onClick={() => logout({ returnTo: window.location.origin })}>
        //     Log Out
        // </button>
        <IconButton 
        aria-label="add to favorites" 
        className="ms-1"
        // color="secondary"
        // sx={{ bgcolor: blueGrey[50] }}
        onClick={() => logout({ returnTo: window.location.origin })}>
            <LogoutIcon sx={{ color: "#ECF7FE" }} />
        </IconButton>
    );
};
