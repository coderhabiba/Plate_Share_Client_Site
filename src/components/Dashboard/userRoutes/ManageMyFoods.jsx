import { useContext, useEffect, useState } from 'react';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';


const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    fetch(
      `https://plate-share-server-site.vercel.app/foods?email=${user?.email}`
    )
      .then(res => res.json())
      .then(data => setMyFoods(data));
  }, [user]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#307A7F',
      cancelButtonColor: '#F0845C',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-site.vercel.app/foods/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setMyFoods(myFoods.filter(food => food._id !== id));
              Swal.fire('Deleted!', 'Food item has been removed.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-2xl font-black mb-6 text-slate-800">
        Manage Your Donations
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-none uppercase text-xs tracking-widest">
              <th className="rounded-l-2xl">Food Item</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th className="rounded-r-2xl text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bold text-slate-600">
            {myFoods.map(food => (
              <tr
                key={food._id}
                className="hover:bg-slate-50 transition-colors border-b border-gray-50"
              >
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={food.foodImage}
                      className="w-12 h-12 rounded-xl object-cover"
                      alt=""
                    />
                    <span className="font-black">{food.foodName}</span>
                  </div>
                </td>
                <td>{food.foodQuantityNumber} portions</td>
                <td>{new Date(food.expireDate).toLocaleDateString()}</td>
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="btn btn-sm bg-[#307A7F]/10 text-[#307A7F] border-none hover:bg-[#307A7F] hover:text-white rounded-lg">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white rounded-lg"
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

export default ManageMyFoods;
