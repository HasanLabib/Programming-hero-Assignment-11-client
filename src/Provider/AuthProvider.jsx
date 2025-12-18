import React, { useEffect, useState } from "react";
import { AuthContext, googleAuthProvider } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUser = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authData = {
    createUser,
    user,
    loading,
    setUser,
    setLoading,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUser,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
