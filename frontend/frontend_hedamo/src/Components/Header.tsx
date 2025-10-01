import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md z-50 border-b border-white/20">
      {/* Logo */}
      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
          Hedamo
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-white">
        <a href="/" className="hover:text-gray-300 transition-colors font-medium">
          Home
        </a>
        <a href="/reports" className="hover:text-gray-300 transition-colors font-medium">
          Reports
        </a>
        <a href="/about" className="hover:text-gray-300 transition-colors font-medium">
          About
        </a>
      </nav>

      {/* Desktop Auth */}
      <div className="hidden md:flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-white/20 backdrop-blur-md text-white font-medium rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-1 border border-white/30">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md md:hidden border-b border-gray-200">
          <nav className="flex flex-col gap-4 p-6">
            <a href="/" className="text-gray-800 hover:text-gray-600 font-medium">Home</a>
            <a href="/reports" className="text-gray-800 hover:text-gray-600 font-medium">Reports</a>
            <a href="/about" className="text-gray-800 hover:text-gray-600 font-medium">About</a>
            <div className="pt-4 border-t border-gray-200">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}