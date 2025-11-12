import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const foodQuantityString = form.foodQuantity.value;
    const foodQuantityNumber = parseInt(foodQuantityString);
    const pickupLocation = form.pickupLocation.value;
    const expireDate = form.expireDate.value;
    const notes = form.notes.value;

    try {
      const newFood = {
        foodName,
        foodImage,
        foodQuantityNumber,
        pickupLocation,
        expireDate,
        notes,
        donator: {
          name: user?.displayName || user?.name || 'Unknown Donator',
          email: user?.email || 'Unknown Email',
          photoURL: user?.photoURL || 'https://i.ibb.co.com/8LQPQJ6s/user.png',
        },
        food_status: 'Available',
        createdAt: new Date().toISOString(),
      };
      // console.log(newFood);
      const res = await fetch(
        'https://plate-share-server-site.vercel.app/foods',
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(newFood),
        }
      );

      if (res.ok) {
        toast.success('Food added successfully!');
        form.reset();
      } else {
        toast.error('Failed to add food. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFF5F2]">
      <Toaster position="top-center" />
      <div className="w-full my-20 max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#F0845C] mb-6">
          Add Food
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Image URL
            </label>
            <input
              type="text"
              name="foodImage"
              placeholder="https://example.com/image.jpg"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Quantity
            </label>
            <input
              type="number"
              name="foodQuantity"
              placeholder="Serves 2 people"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <input
              type="date"
              name="expireDate"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Any extra info..."
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F0845C] py-2 text-white font-medium rounded-md hover:bg-[#e5734c] transition disabled:opacity-70"
          >
            {loading ? 'Adding...' : 'Add Food'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
