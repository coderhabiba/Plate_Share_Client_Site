import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

const FoodReqModal = (
  { foodId, foodName, donator, showModal, setShowModal }
) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user?.email) return;

    setLoading(true);

    const form = e.target;
    const requestData = {
      foodId,
      foodName, 
      requesterEmail: user.email,
      name: user.displayName || user.name || 'Anonymous',
      photoURL: user.photoURL || 'https://i.ibb.co/8LQPQJ6s/user.png',
      donatorName: donator?.name || 'Unknown',
      donatorEmail: donator?.email || '',
      location: form.location.value,
      reason: form.reason.value,
      contact: form.contact.value,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:3000/food-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        toast.success('Request submitted!');
        form.reset();
        setShowModal(false);
      } else {
        toast.error('Failed to submit request.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal modal-open">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="modal-box relative">
        <h3 className="text-lg font-bold mb-4">Request Food</h3>
        <p className="mb-2">
          <strong>Food:</strong> {foodName}
        </p>
        <p className="mb-4">
          <strong>Donator:</strong> {donator?.name}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Your Location</label>
            <input
              type="text"
              name="location"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              name="reason"
              required
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Number</label>
            <input
              type="text"
              name="contact"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FoodReqModal;