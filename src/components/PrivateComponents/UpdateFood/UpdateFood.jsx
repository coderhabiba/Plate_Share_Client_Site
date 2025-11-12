import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const UpdateFood = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`https://plate-share-server-site.vercel.app/foods/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.donator?.email !== user?.email) {
          toast.error('You are not authorized to update this food.');
          navigate('/my-food');
          return;
        }
        setFood(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch food data.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedFood = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodQuantity: parseInt(form.foodQuantity.value),
      pickupLocation: form.pickupLocation.value,
      expireDate: form.expireDate.value,
      notes: form.notes.value,
    };

    try {
      const res = await fetch(
        `https://plate-share-server-site.vercel.app/foods/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFood),
        }
      );

      if (res.ok) {
        toast.success('Food updated successfully!');
        navigate('/my-food');
      } else {
        toast.error('Failed to update food.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
    setUpdating(false);
  };

  if (loading || !food)
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 my-20">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg rounded-2xl bg-transparent p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#F0845C] mb-6">
          Update Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              defaultValue={food.foodName}
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
              defaultValue={food.foodImage}
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
              defaultValue={food.foodQuantityNumber}
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
              defaultValue={food.pickupLocation}
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
              defaultValue={food.expireDate.split('T')[0]}
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
              defaultValue={food.notes}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-[#F0845C] focus:ring-[#F0845C]"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-[#F0845C] py-2 text-white font-medium rounded-md hover:bg-[#e5734c] transition disabled:opacity-70"
          >
            {updating ? 'Updating...' : 'Update Food'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
