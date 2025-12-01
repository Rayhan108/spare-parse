/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";

import toast from "react-hot-toast";
import { auth, googleProvider } from "@/firebase/firebase";

interface GoogleUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  accessToken: string;
}

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);

  // Google Sign In
  const signInWithGoogle = async (): Promise<GoogleUser | null> => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
 
      const accessToken = await user.getIdToken();

      const googleUser: GoogleUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        accessToken,
      };

      toast.success(`Welcome, ${user.displayName}!`);
      console.log("Google Sign In Success:", googleUser);
      
      return googleUser;
    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      
      // Handle specific errors
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign in cancelled");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup blocked! Please allow popups");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Out
  const signOutFromGoogle = async (): Promise<boolean> => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      return true;
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error("Logout failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    signOutFromGoogle,
    loading,
  };
};