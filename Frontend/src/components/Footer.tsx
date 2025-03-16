import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        {/* Add your footer content here */}
        <p>&copy; {new Date().getFullYear()} Blinkit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
