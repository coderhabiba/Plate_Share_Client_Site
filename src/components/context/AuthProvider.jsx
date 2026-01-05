import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/Firebase.config';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // Fetch user role from MongoDB
  const fetchUserRole = async email => {
    try {
      const res = await fetch(
        `https://plate-share-server-site.vercel.app/users/role/${email}`
      );
      const data = await res.json();
      console.log('API Response (Role):', data?.role);

      // ডাটাবেসে রোল যা আছে সেটিই সেট করবে, না থাকলে 'user'
      setRole(data?.role || 'user');
    } catch (error) {
      console.error('Error fetching role:', error);
      setRole('user'); // Error হলেও যাতে অ্যাপ ক্র্যাশ না করে
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    setRole(null);
    return signOut(auth);
  };

  const resetPassword = async email => {
    setLoading(true);
    return await sendPasswordResetEmail(auth, email);
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      // ইউজার থাকলে আগে তার রোল নিয়ে আসবে, তারপর লোডিং ফলস করবে
      if (currentUser?.email) {
        await fetchUserRole(currentUser.email);
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }

      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signInUser,
    googleLogin,
    updateUserProfile,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
