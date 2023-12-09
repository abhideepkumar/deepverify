import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center border-b-2 border-black p-4 bg-blue-100 px-10">
      <div>
        <Link href="/">
          <div className="text-2xl font-light text-gray-800">Deep<span className='font-extrabold'>Verify</span></div>
        </Link>
      </div>
      <div className="space-x-2 px-5">
        <Link href="#about" className='text-gray-600 hover:text-gray-800 px-3'>
          About
        </Link>
        <Link href="#contact" className='text-gray-600 hover:text-gray-800 px-3'>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
