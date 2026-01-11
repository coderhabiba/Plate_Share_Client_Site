import { useEffect, useState } from 'react';
import { FaTrashAlt, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // default: all

  useEffect(() => {
    fetch('https://plate-share-server-site.vercel.app/foods')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      });
  }, []);

  // Delete handler for Admin
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'As an admin, you are removing this permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#307A7F',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-site.vercel.app/foods/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setFoods(foods.filter(food => food._id !== id));
              Swal.fire('Deleted!', 'Food item has been removed.', 'success');
            }
          });
      }
    });
  };

  // Filter foods based on search
  const filteredFoods = foods.filter(food =>
    {
      const matchesSearch = food.foodName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || food.food_status === statusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-[#307A7F]"></span>
      </div>
    );

  return (
    <div className="rounded-[2.5rem] mt-10 p-6 md:p-10 shadow-sm border border-gray-100">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
            Inventory <span className="text-[#307A7F]">Management</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            Total {foods.length} items listed on PlateShare
          </p>
        </div>

        <div className="flex w-full gap-3">
          <div className="relative grow lg:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by food name..."
              className="w-full pl-12 pr-4 py-2 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#307A7F]/20 outline-none font-medium text-slate-600"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Status Filter Dropdown */}
          <select
            onChange={e => setStatusFilter(e.target.value)}
            className="select select-bordered bg-slate-50 border-none rounded-2xl text-slate-600 font-bold focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="requested">Requested</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#307A7F] font-black uppercase text-[11px] tracking-widest border-none">
              <th className="bg-transparent pl-4">Food & Donor</th>
              <th className="bg-transparent">Quantity</th>
              <th className="bg-transparent">Expiration</th>
              <th className="bg-transparent">Status</th>
              <th className="bg-transparent text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map(food => (
              <tr
                key={food._id}
                className="bg-white shadow-sm hover:bg-slate-50/50 transition-all group"
              >
                {/* Food & Donor Info */}
                <td className="rounded-l-2xl py-5 pl-4 border-y border-l border-slate-50">
                  <div className="flex items-center gap-4">
                    <img
                      src={food.foodImage}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      alt=""
                    />
                    <div>
                      <p className="font-black text-slate-800">
                        {food.foodName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        By: {food.donator?.name || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Quantity */}
                <td className="border-y border-slate-50">
                  <span className="font-bold text-slate-600">
                    {food.foodQuantityNumber} Servings
                  </span>
                </td>

                {/* Expiration */}
                <td className="border-y border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-700">
                      {new Date(food.expireDate).toLocaleDateString('en-GB')}
                    </span>
                    <span className="text-[9px] text-red-400 font-bold uppercase">
                      Must Pickup
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="border-y border-slate-50">
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                    ${
                      food.food_status === 'available'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {food.food_status}
                  </span>
                </td>

                {/* Actions */}
                <td className="rounded-r-2xl text-center border-y border-r border-slate-50">
                  <div className="flex justify-center gap-2">
                    <Link to={`/food/${food._id}`}>
                      <button className="btn btn-sm bg-blue-50 text-blue-600 border-none hover:bg-blue-600 hover:text-white rounded-xl shadow-none">
                        <FaEye />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white rounded-xl shadow-none"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFoods.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold">
              No items match your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
