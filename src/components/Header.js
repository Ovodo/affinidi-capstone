import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import {
  AffinidiLoginButton,
  useAffinidiProfile,
} from "@affinidi/affinidi-react-auth";
import "./Header.css";

const Header = ({ cartItems }) => {
  const { setProfile } = useContext(UserContext);
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: "/api/affinidi-auth/complete",
  });

  const [localProfile, setLocalProfile] = useState(null);

  useEffect(() => {
    // Convert objects to strings to compare them
    const currentProfileStr = JSON.stringify(profile);
    const localProfileStr = JSON.stringify(localProfile);

    // Only update if the stringified versions differ
    if (currentProfileStr !== localProfileStr) {
      setLocalProfile(profile);
      setProfile(profile); // assuming setProfile comes from a context and is stable
    }
  }, [profile]);

  const logout = () => {
    handleLogout();
    window.location.href = "/";
  };

  const renderLoginState = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      handleLogout();
      return (
        <div>
          <p>Unable to load user data. Please try again later.</p>
        </div>
      );
    }

    if (profile) {
      console.log("profile", profile);
      return (
        <div>
          <span style={{ fontSize: "14px", textTransform: "capitalize" }}>
            Welcome, {profile.givenName}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      );
    }

    return <AffinidiLoginButton />;
  };

  return (
    <header className='Header'>
      <Link to='/'>
        <h1>FashionFrenzy</h1>
      </Link>
      <nav>
        {renderLoginState()}
        <Link to='/cart' className='CartIcon'>
          <img src='/cart.png' alt='Cart' />
          <p>{cartItems.length}</p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
