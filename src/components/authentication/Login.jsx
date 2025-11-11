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
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5F2] px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-[#f0845c]/20">
        <h2 className="text-2xl font-semibold text-center text-[#F0845C] mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#F0845C] py-2 text-white font-medium shadow-md hover:bg-[#e5734c] transition-colors disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-px w-1/3 bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px w-1/3 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center w-full gap-2 rounded-md border border-gray-300 py-2 hover:bg-gray-50 transition disabled:opacity-70"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <Link
            to="/register"
            className="font-medium text-[#F0845C] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
