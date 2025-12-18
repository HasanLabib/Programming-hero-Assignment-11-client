import { GoogleAuthProvider } from 'firebase/auth';
import React, { createContext } from 'react';

export const AuthContext=createContext();
export const googleAuthProvider = new GoogleAuthProvider();
