import { useContext, useEffect, useState } from 'react';
import {
  FaUserShield,
  FaTrashAlt,
  FaEnvelope,
  FaIdBadge,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from './../../context/AuthContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useContext(AuthContext);
  //
  useEffect(() => {
    fetch('https://plate-share-server-site.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // make admin
  const handleMakeAdmin = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to make ${user.name} an Admin?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#307A7F',
      cancelButtonColor: '#F0845C',
      confirmButtonText: 'Yes, Make Admin!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(
          `https://plate-share-server-site.vercel.app/users/admin/${user._id}`,
          {
            method: 'PATCH',
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              const updatedUsers = users.map(u =>
                u._id === user._id ? { ...u, role: 'admin' } : u
              );
              setUsers(updatedUsers);
              Swal.fire('Success!', `${user.name} is now an Admin.`, 'success');
            }
          });
      }
    });
  };

  // Delete User Function
  const handleDeleteUser = user => {
    //
    if (user.email === currentUser.email) {
      return Swal.fire({
        icon: 'error',
        title: 'Action Denied',
        text: 'You cannot delete your own admin account!',
        confirmButtonColor: '#307A7F',
      });
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to remove ${user.name}. This cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#307A7F',
      confirmButtonText: 'Yes, delete user!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-site.vercel.app/users/${user._id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              const remainingUsers = users.filter(u => u._id !== user._id);
              setUsers(remainingUsers);
              Swal.fire('Deleted!', 'User has been removed.', 'success');
            }
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-[#307A7F]"></span>
      </div>
    );

  return (
    <div className="rounded-[2.5rem] mt-5 p-6 md:p-10 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
          User <span className="text-[#307A7F]">Authorities</span>
        </h2>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
          Manage system access and user roles ({users.length} total users)
        </p>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#307A7F] font-black uppercase text-[11px] tracking-widest border-none">
              <th className="bg-transparent pl-4">User Profile</th>
              <th className="bg-transparent">Contact Details</th>
              <th className="bg-transparent text-center">Current Role</th>
              <th className="bg-transparent text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="bg-white shadow-sm hover:bg-slate-50 transition-all group"
              >
                {/* Profile Image & Name */}
                <td className="rounded-l-2xl py-5 pl-4 border-y border-l border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          user.photo ||
                          'https://i.ibb.co/mRms3y8/user-placeholder.png'
                        }
                        className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-slate-100"
                        alt=""
                      />
                      <span className="absolute -top-2 -left-2 bg-slate-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-lg font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-black text-slate-800">
                      {user.name}
                    </span>
                  </div>
                </td>

                {/* Email Info */}
                <td className="border-y border-slate-50">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                    <FaEnvelope className="text-[#307A7F]" />
                    {user.email}
                  </div>
                </td>

                {/* Role Badge */}
                <td className="border-y border-slate-50 text-center">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                    ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <FaIdBadge />
                    {user.role || 'User'}
                  </div>
                </td>

                {/* Action Buttons */}
                <td className="rounded-r-2xl text-center border-y border-r border-slate-50">
                  <div className="flex justify-center gap-2">
                    {user.role !== 'admin' ? (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-[#307A7F]/10 text-[#307A7F] border-none hover:bg-[#307A7F] hover:text-white rounded-xl"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase italic">
                        Super Admin
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white rounded-xl"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
