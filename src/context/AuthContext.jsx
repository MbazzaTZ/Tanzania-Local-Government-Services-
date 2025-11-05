import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-config";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userMeta, setUserMeta] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      const metadata = session?.user?.user_metadata || {};
      setUser(session?.user ?? null);
      setUserRole(metadata.role ?? null);
      setUserMeta(metadata);
      setLoading(false);
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      const metadata = currentUser?.user_metadata || {};
      setUser(currentUser);
      setUserRole(metadata.role ?? null);
      setUserMeta(metadata);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, role = "citizen", meta = {}) => {
    const metadata = { role, ...meta };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) toast.error(error.message);
    else toast.success(`Account created as ${role}`);
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else toast.success("Welcome!");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.success("Signed out");
  };

  const value = { user, userRole, userMeta, loading, signUp, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

