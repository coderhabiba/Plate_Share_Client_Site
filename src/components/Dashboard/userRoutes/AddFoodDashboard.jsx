import { useContext } from 'react';
import Swal from 'sweetalert2';
import {
  FaUtensils,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStickyNote,
  FaLayerGroup,
  FaImage,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const AddFoodDashboard = () => {
  const { user } = useContext(AuthContext);

  const handleAddFood = e => {
    e.preventDefault();
    const form = e.target;

    const newFood = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodQuantityNumber: parseInt(form.foodQuantity.value),
      pickupLocation: form.pickupLocation.value,
      expireDate: form.expireDate.value,
      notes: form.notes.value,
      donator: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      food_status: 'available',
    };

    fetch('https://plate-share-server-site.vercel.app/foods', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newFood),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Food Shared!',
            text: 'Your contribution is making a difference.',
            showConfirmButton: false,
            timer: 2000,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 p-8 bg-gradient-to-r from-[#307A7F] to-[#4a9ea3] rounded-[2rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              Post New Food
            </h2>
            <p className="opacity-90 font-medium">
              Fill the form to list your surplus food for those in need.
            </p>
          </div>
          <FaUtensils className="absolute -right-4 -bottom-4 text-white/10 text-9xl rotate-12" />
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-6 md:p-12 border border-slate-50">
          <form onSubmit={handleAddFood} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Food Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  <FaUtensils className="text-[#307A7F]" /> Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  required
                  placeholder="e.g., Homemade Pasta"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none text-black"
                />
              </div>

              {/* Food Image */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  <FaImage className="text-[#307A7F]" /> Food Image URL
                </label>
                <input
                  type="url"
                  name="foodImage"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none text-black"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  <FaLayerGroup className="text-[#307A7F]" /> Quantity
                  (Servings)
                </label>
                <input
                  type="number"
                  name="foodQuantity"
                  required
                  placeholder="How many people can eat?"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none text-black"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  <FaMapMarkerAlt className="text-[#307A7F]" /> Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  required
                  placeholder="e.g., Road 12, Sector 4, Uttara"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none text-black"
                />
              </div>

              {/* Expire Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  <FaCalendarAlt className="text-[#307A7F]" /> Expiration Date
                </label>
                <input
                  type="date"
                  name="expireDate"
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none text-black"
                />
              </div>

              {/* Read Only Donator Info */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                  Donor
                </label>
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500">
                  <img
                    src={user?.photoURL}
                    className="w-6 h-6 rounded-full"
                    alt=""
                  />
                  <span className="font-semibold">{user?.displayName}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider ml-1">
                <FaStickyNote className="text-[#307A7F]" /> Additional Notes
              </label>
              <textarea
                name="notes"
                required
                rows="4"
                placeholder="Tell us about the food condition or special instructions..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#307A7F] focus:ring-4 focus:ring-[#307A7F]/10 transition-all outline-none resize-none text-black"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#307A7F] hover:bg-[#255d61] text-white font-black py-5 rounded-2xl text-xl shadow-lg shadow-[#307A7F]/20 hover:shadow-xl hover:shadow-[#307A7F]/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Confirm & Post Food
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodDashboard;
