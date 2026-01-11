import { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext';

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://plate-share-server-site.vercel.app/foods?donatorEmail=${user?.email}`
      )
        .then(res => res.json())
        .then(data => {
          setMyFoods(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

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
              Swal.fire({
                title: 'Deleted!',
                text: 'Food item has been removed.',
                icon: 'success',
                confirmButtonColor: '#307A7F',
              });
            }
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#307A7F]"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
            Manage My <span className="text-[#307A7F]">Donations</span>
          </h2>
          <p className="text-slate-500 font-medium">
            You have shared {myFoods.length} food items so far.
          </p>
        </div>
        <Link
          to="/dashboard/add-food-dashboard"
          className="btn bg-[#307A7F] hover:bg-[#255d61] text-white border-none rounded-2xl px-6"
        >
          Add More Food
        </Link>
      </div>

      <div className="overflow-x-auto">
        {myFoods.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-slate-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-400">
              No foods found!
            </h3>
            <p className="text-slate-400">
              Start your journey by sharing some extra food.
            </p>
          </div>
        ) : (
          <table className="table w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-none uppercase text-xs tracking-widest">
                <th className="rounded-l-2xl py-5">Food Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Expiry Date</th>
                <th className="rounded-r-2xl text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold text-slate-600">
              {myFoods.map(food => (
                <tr
                  key={food._id}
                  className="bg-white hover:bg-slate-50 transition-all shadow-sm rounded-2xl"
                >
                  <td className="py-4 border-y border-l border-slate-50 first:rounded-l-2xl">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={food.foodImage}
                          className="w-14 h-14 rounded-2xl object-cover shadow-md"
                          alt=""
                        />
                      </div>
                      <div>
                        <span className="block font-black text-slate-800">
                          {food.foodName}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">
                          {food.pickupLocation}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border-y border-slate-50">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm">
                      {food.foodQuantityNumber} Servings
                    </span>
                  </td>
                  <td className="border-y border-slate-50">
                    <div
                      className={`badge badge-ghost border-none font-bold text-[10px] uppercase p-3 ${
                        food.food_status === 'available'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {food.food_status}
                    </div>
                  </td>
                  <td className="border-y border-slate-50">
                    <span className="text-slate-500 text-sm">
                      {new Date(food.expireDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td className="text-center border-y border-r border-slate-50 rounded-r-2xl">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/update-food/${food._id}`}
                        className="btn btn-sm bg-[#307A7F]/10 text-[#307A7F] border-none hover:bg-[#307A7F] hover:text-white rounded-xl transition-all"
                        title="Edit Food"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="btn btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white rounded-xl transition-all"
                        title="Delete Food"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageMyFoods;
