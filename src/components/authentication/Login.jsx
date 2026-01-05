import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, googleLogin, loading } = useContext(AuthContext);

  const from = location.state?.from?.pathname || '/';

  const saveUserToDb = async user => {
    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: 'user',
    };
    await fetch('https://plate-share-server-site.vercel.app/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    });
  };

  const handleDemoLogin = () => {
    const email = 'demo@user.com';
    const password = 'DemoPassword123';
    document.getElementById('email-input').value = email;
    document.getElementById('password-input').value = password;
    toast.success('Demo credentials filled!');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      await signInUser(email, password);
      toast.success('Welcome Back!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid email or password.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      await saveUserToDb(result.user);
      toast.success('Google Login Successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google Sign-In failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-base-300 px-4 py-10 font-sans">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-[2.5rem] bg-white dark:bg-base-100 p-8 md:p-12 shadow-2xl border border-base-content/5 relative overflow-hidden">
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F0845C] to-[#307A7F]"></div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-2 elms-font">Login</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
            Access your PlateShare Dashboard
          </p>
        </div>

        {/* Demo Button Section */}
        <div className="mb-8 p-4 bg-slate-50 dark:bg-base-200 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-3">
            Quick Testing?
          </p>
          <button
            onClick={handleDemoLogin}
            className="w-full btn btn-sm rounded-xl bg-[#307A7F] border-none text-white font-bold hover:bg-[#255f63] transition-all"
          >
            Fill Demo Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              name="email"
              required
              className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[10px] font-black text-[#307A7F] hover:text-[#F0845C] uppercase tracking-tighter transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password-input"
              type="password"
              name="password"
              required
              className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#F0845C] py-4 text-white font-black uppercase tracking-widest shadow-lg shadow-orange-100 dark:shadow-none hover:bg-[#d9734d] transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="divider my-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
          Social Access
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-base-100 py-3.5 hover:bg-slate-50 dark:hover:bg-base-200 transition-all font-bold text-slate-600 dark:text-slate-300"
        >
          <FcGoogle className="text-2xl" /> Google Account
        </button>

        <p className="mt-8 text-center text-xs font-bold text-slate-400">
          New here?{' '}
          <Link
            to="/register"
            className="text-[#307A7F] font-black hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
