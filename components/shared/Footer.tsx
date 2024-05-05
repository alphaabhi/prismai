
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <Link href="/customer-support"><a>Customer Support</a></Link>
      <Link href="/terms-of-service"><a>Terms of Service</a></Link>
      <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
      <Link href="/contact-us"><a>Contact Us</a></Link>
      <p>© 2024 PrismAi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
