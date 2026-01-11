import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../context/AuthContext';


const Register = () => {
  const {
    createUser,
    googleLogin,
    updateUserProfile
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validatePassword = password => {
    const newErrors = {};
    if (!/[A-Z]/.test(password)) newErrors.upper = 'Uppercase required';
    if (!/[a-z]/.test(password)) newErrors.lower = 'Lowercase required';
    if (password.length < 6) newErrors.length = 'Min 6 characters';
    setErrors(newErrors);
    return newErrors;
  };

  const saveUserToDb = async (name, email, photo) => {
    const newUser = { name, email, photo, role: 'user' };
    try {
      const res = await fetch(
        'https://plate-share-server-site.vercel.app/users',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newUser),
        }
      );
      return res.ok;
    } catch (err) {
      console.error('DB Save Error:', err);
      return false;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const pwdErrors = validatePassword(password);
    if (Object.keys(pwdErrors).length > 0) {
      setLoading(false);
      return toast.error('Check password requirements');
    }

    try {
      // 1. Create User in Firebase
      await createUser(email, password);
      // 2. Update Firebase Profile
      await updateUserProfile(name, photo);
      // 3. Save to MongoDB
      const dbSuccess = await saveUserToDb(name, email, photo);

      if (dbSuccess) {
        toast.success('Welcome to PlateShare!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      await saveUserToDb(user.displayName, user.email, user.photoURL);

      toast.success('Logged in with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-base-300 flex items-center justify-center py-20 px-4">
      <Toaster position="top-center" />

      <div
        data-aos="zoom-in"
        className="w-full max-w-4xl bg-white dark:bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100 dark:border-none"
      >
        {/* Left Side: Visual/Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#307A7F] p-12 text-white relative">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl font-black mb-6 elms-font text-center">
            Start Sharing <br /> Today
          </h2>
          <p className="text-center opacity-80 font-medium leading-relaxed mb-8">
            Connect with people, share extra food, and help build a hunger-free
            community.
          </p>
          <div className="w-full h-56 bg-white/10 rounded-[2rem] border border-white/20 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl mb-4 animate-bounce">🍲</div>
            <p className="text-xs font-black uppercase tracking-widest opacity-60">
              Every Plate Counts
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-14">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-400 text-sm mb-8 font-bold uppercase tracking-widest">
            Join the PlateShare family
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              />
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                required
                className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
            />

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={e => validatePassword(e.target.value)}
                className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              />

              {/* Password Requirement Chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold transition-all ${
                    !errors.length
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  6+ Chars
                </span>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold transition-all ${
                    !errors.upper
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  Uppercase
                </span>
                <span
                  className={`text-[10px] px-2 py-1 rounded-full font-bold transition-all ${
                    !errors.lower
                      ? 'bg-green-100 text-green-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  Lowercase
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-[#F0845C] border-none text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#307A7F] shadow-xl shadow-orange-100 dark:shadow-none mt-4 h-14"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Register Now'
              )}
            </button>
          </form>

          <div className="divider my-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Fast Track Access
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn btn-outline w-full rounded-2xl border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all gap-3 h-14"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-bold text-slate-600">Google Account</span>
          </button>

          <p className="mt-8 text-center text-sm font-bold text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#307A7F] font-black hover:underline underline-offset-4 transition-all"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
