import { useContext, useState } from 'react';
import {
  FaCamera,
  FaEnvelope,
  FaUserEdit,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import { AuthContext } from '../context/AuthContext';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); 
  const [isEditing, setIsEditing] = useState(false);

  // form state
  const [newName, setNewName] = useState(user?.displayName || '');
  const [newPhoto, setNewPhoto] = useState(user?.photoURL || '');

  const handleUpdate = async () => {
    try {
      // ১. Firebase Profile Update
      await updateUserProfile(newName, newPhoto);

      // MongoDB Update
      fetch(`https://your-server.com/users/${user.email}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: newName, image: newPhoto }),
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Update failed!', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 transition-colors duration-300">
      {/* Profile Header Card */}
      <div className="bg-[#307A7F] h-48 rounded-[2.5rem] relative mb-20 shadow-xl dark:shadow-none">
        <div className="absolute -bottom-16 left-10 flex flex-col md:flex-row items-end gap-6 w-full px-4">
          <div className="relative group">
            <img
              src={isEditing ? newPhoto : user?.photoURL}
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-8 border-white dark:border-base-100 object-cover shadow-lg"
              alt="User profile"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center">
                <FaCamera className="text-white text-2xl" />
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-black elms-font">
              {user?.displayName}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
              Community Contributor
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Card */}
        <div className="md:col-span-2 bg-white dark:bg-base-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black uppercase tracking-tight">
              {isEditing ? 'Update Profile' : 'Account Information'}
            </h3>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-sm bg-[#F0845C] text-white border-none rounded-xl px-4 hover:bg-[#307A7F] transition-all"
              >
                <FaUserEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="btn btn-sm btn-success text-white rounded-xl"
                >
                  <FaCheck /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-sm btn-ghost dark:text-slate-300"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Name field */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Full Name
              </p>
              {isEditing ? (
                <input
                  className="input input-bordered w-full dark:border-slate-700"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
              ) : (
                <p className="font-bold">
                  {user?.displayName}
                </p>
              )}
            </div>

            {/* Photo URL field - Only visible when editing */}
            {isEditing && (
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Photo URL
                </p>
                <input
                  className="input input-bordered w-full dark:border-slate-700"
                  value={newPhoto}
                  onChange={e => setNewPhoto(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center gap-6 pt-4 border-t dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[#F0845C]">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Email Address
                </p>
                <p className="font-bold text-slate-700 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Card */}
        <div className="bg-[#F0845C] rounded-[2.5rem] p-10 text-white flex flex-col justify-center items-center text-center shadow-lg shadow-orange-100 dark:shadow-none">
          <h4 className="text-lg font-bold mb-2 opacity-80">Member Since</h4>
          <p className="text-4xl font-black mb-4 tracking-tighter">2024</p>
          <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]">
            Verified Account
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
