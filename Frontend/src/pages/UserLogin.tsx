import React from "react";

const UserLogin: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 relative">
      {/* Background Image */}
      <img
        src="/images/blinkit.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover"
      />

      {/* Google Login Button */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <a
          href="/auth/google"
          className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Continue with Google
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
