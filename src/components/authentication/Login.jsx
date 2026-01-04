import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signInUser, googleLogin, loading } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) return toast.error('Please fill in all fields.');

    try {
      await signInUser(email, password);
      form.reset();
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 transition-colors duration-300">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-3xl bg-base-100 p-10 shadow-xl border border-base-content/5">
        <h2 className="text-3xl font-bold text-center text-[#F0845C] mb-8 elms-font">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-base-content/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl bg-base-200 border border-base-content/10 px-4 py-3 focus:border-[#F0845C] focus:ring-1 focus:ring-[#F0845C] outline-none text-base-content transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-base-content/80 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl bg-base-200 border border-base-content/10 px-4 py-3 focus:border-[#F0845C] focus:ring-1 focus:ring-[#F0845C] outline-none text-base-content transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#F0845C] py-3 text-white font-bold shadow-lg hover:bg-[#e5734c] active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Divider Line */}
        <div className="my-8 flex items-center justify-center gap-3">
          <div className="h-px w-full bg-base-content/10" />
          <span className="text-sm text-base-content/40 font-medium">OR</span>
          <div className="h-px w-full bg-base-content/10" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full gap-3 rounded-xl border border-base-content/10 bg-base-100 py-3 hover:bg-base-200 transition-all active:scale-[0.98] disabled:opacity-70 group"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm font-bold text-base-content/80 group-hover:text-base-content">
            Continue with Google
          </span>
        </button>

        <p className="mt-8 text-center text-sm text-base-content/60 font-medium">
          New here?{' '}
          <Link
            to="/register"
            className="font-bold text-[#F0845C] hover:text-[#e5734c] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
