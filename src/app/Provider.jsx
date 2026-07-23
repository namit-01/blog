"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Toaster } from "sonner";

const Provider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Toaster richColors position="top-right" />
      {children}
    </GoogleOAuthProvider>
  );
};

export default Provider;
