import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/Firebase.config';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Account created successfully!');
        setLoading(false);
      })
      .catch(error => {
        toast.error(error.message);
         setLoading(false);
      })
  };


  // login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login Successfully!');
        setLoading(false);
        return userCredential;
      })
      .catch(error => {
        toast.error(error.message);
        setLoading(false);
      });
  };


  // login with google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(res => {
        toast.success('Google Login Done!');
        setLoading(false);
        return res.user;
      })
      .catch(error => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  // update user profile
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then((user) => {
        toast.success('Profile Updated');
        setLoading(false)
        return user;
      })
      .catch(error => {
        toast.error(error.message);
      })
  };

  // email verification
  // const emailVerification = () => {
  //   setLoading(true);
  //   return sendEmailVerification(auth.currentUser)
  //     .then(() => {
  //       toast.success('Email verification sent!');
  //       setLoading(false)
  //     })
  // };

  // reset password


  // sign out
  const logOut = () => {
    setLoading(true);
    toast.success("Logout successfully!")
    return signOut(auth);
}

  // observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    googleLogin,
    updateUser,
    
    logOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
