import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyFood = () => {
  const { user, loading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3000/foods?donatorEmail=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch your foods');
        setIsLoading(false);
      });
  }, [user, loading, navigate]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F0845C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/foods/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => {
            setFoods(prev => prev.filter(food => food._id !== id));
            toast.success('Food deleted successfully');
          })
          .catch(err => {
            console.error(err);
            toast.error('Failed to delete food');
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5 min-h-screen">
      <h2 className="text-2xl font-bold text-[#F0845C] mb-5">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <p>You have not added any foods yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food._id}>
                  <td>
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{food.foodName}</td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.pickupLocation}</td>
                  <td>{new Date(food.expireDate).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => navigate(`/update-food/${food._id}`)}
                      className="btn btn-sm bg-[#F0845C] text-white hover:bg-[#e5734c]"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFood;
