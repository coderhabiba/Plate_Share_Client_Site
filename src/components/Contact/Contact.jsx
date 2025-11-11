import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="">
      <div className="py-20 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-start gap-10 container mx-auto">
        {/* left side */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#f0845c] text-lg" />
                info@plateshare.com
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#f0845c] text-lg" />
                Mymensingh,Bangladesh
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#f0845c] text-lg" />
                Mon-Fri 9AM–6PM PST
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600 mb-3">
              Need help with your account or have questions about how PlateShare
              works? Our support team is here to help!
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:border-[#f0845c] hover:text-[#f0845c] transition-all duration-300 hover:scale-105">
              Visit Help Center
            </button>
          </div>
        </div>

        {/* right side form */}
        <div className="lg:w-1/2 bg-[#F5F5F5] rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#f0845c] transition"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#f0845c] transition"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#f0845c] transition"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#f0845c] transition"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-[#f0845c] transition"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#f0845c] hover:bg-[#e46f48] text-white font-semibold py-3 rounded-md transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
