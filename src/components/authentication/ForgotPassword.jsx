import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useContext(AuthContext); 

  const handleReset = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email); 
      toast.success('Reset link sent to your email!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-base-300 px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md rounded-[2.5rem] bg-white dark:bg-base-100 p-8 md:p-12 shadow-2xl border border-base-content/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#307A7F]"></div>

        <div className="mb-8">
          <Link
            to="/login"
            className="flex items-center gap-2 text-[10px] font-black text-[#307A7F] uppercase tracking-widest hover:text-[#F0845C] transition-colors mb-6"
          >
            <FaArrowLeft /> Back to Login
          </Link>
          <h2 className="text-3xl font-black mb-2 elms-font text-slate-800 dark:text-white">
            Forgot Password?
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl bg-slate-50 dark:bg-base-200 border-none px-5 py-4 focus:ring-2 focus:ring-[#F0845C] outline-none transition-all font-medium placeholder:text-slate-400"
              placeholder="e.g. user@plate-share.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#307A7F] py-4 text-white font-black uppercase tracking-widest shadow-lg shadow-teal-100 dark:shadow-none hover:bg-[#255f63] transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-10 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
          <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold leading-relaxed text-center">
            Note: If you don't see the email in your inbox, please check your
            **Spam** or **Junk** folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
