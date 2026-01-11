'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navigation: React.FC = () => {
  const { user, isLoading, isAuthConfigured } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Balance Sheet', icon: '📊' },
    { href: '/add-account', label: 'Add Account', icon: '➕' },
    { href: '/record-balances', label: 'Record Balances', icon: '💰' },
    { href: '/historical', label: 'Historical Tracking', icon: '📈' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
    { href: '/disclaimer', label: 'Privacy', icon: '📋' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📈</span>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">Personal Finance Tracker</span>
            <span className="text-lg font-bold text-gray-800 sm:hidden">Finance Tracker</span>
          </div>

          {/* Desktop Navigation - shown when user logged in OR in offline mode */}
          {(user || !isAuthConfigured) && (
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {/* Only show logout when Auth0 is configured and user is logged in */}
              {isAuthConfigured && user && (
                <a
                  href="/auth/logout"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                >
                  <span>🔒</span>
                  <span>Logout</span>
                </a>
              )}
            </div>
          )}
          {!user && isAuthConfigured && (
            <div className="hidden md:flex">
              <a
                href="/auth/login?screen_hint=signup"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                <span>🔑</span>
                <span>Login</span>
              </a>
            </div>
          )}

          {/* Mobile Menu Button - shown when user logged in OR in offline mode */}
          {(user || !isAuthConfigured) && (
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {/* Only show logout when Auth0 is configured and user is logged in */}
            {isAuthConfigured && user && (
              <a
                href="/auth/logout"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                <span className="text-lg">🔒</span>
                <span>Logout</span>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
