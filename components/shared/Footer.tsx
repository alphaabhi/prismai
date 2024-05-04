
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-600">
      <div className="container mx-auto px-4">
        <Link href="/customer-support"><a className="mx-2">Customer Support</a></Link>
        <Link href="/terms-of-service"><a className="mx-2">Terms of Service</a></Link>
        <Link href="/privacy-policy"><a className="mx-2">Privacy Policy</a></Link>
        <Link href="/contact-us"><a className="mx-2">Contact Us</a></Link>
        <p className="mt-4">© {new Date().getFullYear()} PrismAi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
