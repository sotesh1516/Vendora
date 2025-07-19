import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-blue-600">Vendora</h2>
            <p className="text-sm text-gray-500 mt-1">
              Your campus marketplace for services.
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium text-gray-700">
            <a href="/about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="/contact" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
            <a href="/terms" className="hover:text-blue-600 transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-blue-600 transition-colors">
              Privacy
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex gap-4">
            {/* Facebook SVG */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border hover:bg-blue-50 transition-colors shadow-sm"
              title="Facebook"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H18l-.5 3h-2.3v7A10 10 0 0 0 22 12" />
              </svg>
            </a>

            {/* Twitter SVG */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border hover:bg-blue-50 transition-colors shadow-sm"
              title="Twitter"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.84-2.32 8.28 8.28 0 0 1-2.63 1A4.14 4.14 0 0 0 16 4c-2.3 0-4.16 1.9-4.16 4.3 0 .34.04.67.1.98-3.46-.18-6.53-1.87-8.59-4.45a4.3 4.3 0 0 0-.56 2.17c0 1.5.73 2.83 1.84 3.6a4.07 4.07 0 0 1-1.88-.53v.05c0 2.1 1.43 3.84 3.32 4.24a4.1 4.1 0 0 1-1.87.07c.53 1.73 2.07 3 3.9 3.04A8.32 8.32 0 0 1 2 19.54a11.76 11.76 0 0 0 6.29 1.88c7.55 0 11.68-6.41 11.68-11.97 0-.18 0-.35-.01-.53A8.6 8.6 0 0 0 22.46 6z" />
              </svg>
            </a>

            {/* Instagram SVG */}
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border hover:bg-blue-50 transition-colors shadow-sm"
              title="Instagram"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7A3 3 0 1 1 15 12a3 3 0 0 1-3 3zm4.8-8.7a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Vendora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
