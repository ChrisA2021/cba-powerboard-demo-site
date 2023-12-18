// Import the Image component from next/image
import Image from 'next/image';

// Create a component or use this code in your page
const XeroLogo = () => {
  return (
    <div>
      <Image
        src="/xero-logo.png" // Path to the image in the public directory
        alt="Xero Logo"
        width={150} // Width of the displayed image
        height={150} // Height of the displayed image
      />
    </div>
  );
};

export default XeroLogo;
