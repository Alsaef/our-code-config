'use client'

// components/PrivateRoute.js
import { useEffect } from 'react';
import { getUser } from '../util/getLocalUser/GetUser'; // Adjust path as per your project structure
import { redirect } from 'next/navigation';

const PrivateRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    useEffect(() => {
      const user = getUser();
      if (!user) {
        redirect("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default PrivateRoute;
