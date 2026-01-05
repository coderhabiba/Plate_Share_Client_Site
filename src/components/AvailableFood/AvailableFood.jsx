import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [displayFoods, setDisplayFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterLocation, setFilterLocation] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          'https://plate-share-server-site.vercel.app/foods'
        );
        const data = await res.json();
        const availableFoods = data.filter(
          food => food.food_status?.toLowerCase() === 'available'
        );
        setFoods(availableFoods);
        setDisplayFoods(availableFoods);
      } catch (error) {
        toast.error('Failed to fetch foods!');
      }
      setLoading(false);
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    let updatedFoods = [...foods];

    if (searchQuery) {
      updatedFoods = updatedFoods.filter(food =>
        food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterLocation) {
      updatedFoods = updatedFoods.filter(food =>
        food.pickupLocation.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    updatedFoods.sort((a, b) => {
      const dateA = new Date(a.expireDate);
      const dateB = new Date(b.expireDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setDisplayFoods(updatedFoods);
    setCurrentPage(1);
  }, [searchQuery, sortOrder, filterLocation, foods]);

  // Pagination Calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayFoods.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen max-w-[95%] lg:max-w-[90%] mx-auto py-12">
      <Toaster position="top-center" />

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-[#307A7F] elms-font mb-4 uppercase tracking-tight">
          Available Foods
        </h2>
        <p className="text-gray-500 font-medium">
          Browse and request fresh meals from our community
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-base-200 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 mb-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold opacity-60">Search Item</span>
          </label>
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered rounded-2xl focus:outline-[#F0845C]"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold opacity-60">Location</span>
          </label>
          <input
            type="text"
            placeholder="Pickup point..."
            className="input input-bordered rounded-2xl focus:outline-[#F0845C]"
            value={filterLocation}
            onChange={e => setFilterLocation(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold opacity-60">Sort Expiry</span>
          </label>
          <select
            className="select select-bordered rounded-2xl"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="asc">Soonest First</option>
            <option value="desc">Latest First</option>
          </select>
        </div>
        <button
          onClick={() => {
            setSearchQuery('');
            setFilterLocation('');
          }}
          className="btn bg-[#307A7F]/10 text-[#307A7F] border-none hover:bg-[#307A7F] hover:text-white rounded-2xl font-bold"
        >
          Clear Filters
        </button>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {currentItems.map(food => (
          <div
            key={food._id}
            className="bg-white dark:bg-base-100 border border-base-content/5 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group overflow-hidden h-full"
          >
            {/* Image & Detail rendering same as before */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#307A7F] text-white text-[10px] font-black px-3 py-1 rounded-lg">
                AVAILABLE
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-4 line-clamp-1">
                {food.foodName}
              </h3>
              <div className="text-sm space-y-2 mb-6 flex-grow">
                <p className="flex justify-between font-medium opacity-70">
                  <span>Quantity:</span>{' '}
                  <span>{food.foodQuantityNumber} portions</span>
                </p>
                <p className="flex justify-between font-medium opacity-70">
                  <span>Location:</span>{' '}
                  <span className="truncate ml-4">{food.pickupLocation}</span>
                </p>
                <p className="text-[#F0845C] font-black text-[10px] uppercase pt-2 tracking-widest">
                  Expires: {new Date(food.expireDate).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => navigate(`/food/${food._id}`)}
                className="w-full bg-[#F0845C] text-white py-3 rounded-2xl font-bold hover:bg-[#307A7F] transition-colors shadow-lg shadow-orange-100 dark:shadow-none"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="btn btn-circle bg-white border-gray-200 hover:bg-[#F0845C] hover:text-white disabled:opacity-30"
          >
            ❮
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`btn btn-circle font-bold transition-all ${
                currentPage === index + 1
                  ? 'bg-[#307A7F] text-white border-none scale-110 shadow-lg'
                  : 'bg-white border-gray-200 hover:border-[#307A7F] text-gray-500'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="btn btn-circle bg-white border-gray-200 hover:bg-[#F0845C] hover:text-white disabled:opacity-30"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default AvailableFood;
