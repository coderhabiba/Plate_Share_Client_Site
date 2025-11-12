import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF5F2] px-4 text-center">
      <img
        src="https://i.ibb.co.com/mC65N8NF/error-404.png"
        alt="404"
        className="w-80 md:w-96 mb-6"
      />
      <h1 className="text-4xl font-bold text-[#F0845C] mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn bg-[#F0845C] text-white hover:bg-[#e5734c] transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
