import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validatePassword = password => {
    const newErrors = {};
    if (!/[A-Z]/.test(password))
      newErrors.upper = 'Must contain at least one uppercase letter.';
    if (!/[a-z]/.test(password))
      newErrors.lower = 'Must contain at least one lowercase letter.';
    if (password.length < 6)
      newErrors.length = 'Must be at least 6 characters long.';
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const newUser = { name, email, photo };

    const pwdErrors = validatePassword(password);
    if (Object.keys(pwdErrors).length > 0) {
      toast.error('Please type a correct password with critaries.');
      return;
    }

    try {
      await createUser(email, password);
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        toast.success('Registration successful!');
        form.reset();
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error('Failed to save user in database.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log(result);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md rounded-2xl bg-transparent p-8 shadow-lg ring-1 ring-[#f0845c]/20">
        <h2 className="text-2xl font-semibold text-center text-[#F0845C] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              name="name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#F0845C] focus:ring-[#F0845C] outline-none"
              placeholder="••••••"
            />
            <ul className="mt-2 text-xs text-red-500 space-y-1">
              {errors.upper && <li>{errors.upper}</li>}
              {errors.lower && <li>{errors.lower}</li>}
              {errors.length && <li>{errors.length}</li>}
            </ul>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#F0845C] py-2 text-white font-medium shadow-md hover:bg-[#e5734c] transition-colors"
          >
            Register
          </button>
        </form>

        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-px w-1/3 bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px w-1/3 bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full gap-2 rounded-md border border-gray-300 py-2 hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-[#F0845C] hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
