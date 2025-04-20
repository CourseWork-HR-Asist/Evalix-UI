import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'

const GoogleAuthAppProvider = ({children}: {children: React.ReactNode}) => {
    const clientId = import.meta.env.VITE_Google_Client_ID
    return (
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
    );
}

export default GoogleAuthAppProvider