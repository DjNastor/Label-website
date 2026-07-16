import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon, MusicIcon } from 'lucide-react';
export type Page =
'landing' |
'dashboard' |
'song-form' |
'generated-docs' |
'contract' |
'knowledge' |
'quiz';
interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}
export function Navbar({ currentPage, setPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks: {
    name: string;
    page: Page;
  }[] = [
  {
    name: 'Dashboard',
    page: 'dashboard'
  },
  {
    name: 'Generate Forms',
    page: 'song-form'
  },
  {
    name: 'Contracts',
    page: 'contract'
  },
  {
    name: 'Knowledge Hub',
    page: 'knowledge'
  },
  {
    name: 'Quiz',
    page: 'quiz'
  }];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="sticky top-0 z-50 bg-navy/90 backdrop-blur-md border-b border-navy-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => setPage('landing')}>
            
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mr-3 group-hover:bg-gold/20 transition-colors">
              <MusicIcon className="w-6 h-6 text-gold" />
            </div>
            <span className="font-syne font-bold text-2xl tracking-wider text-white group-hover:text-gold transition-colors">
              PHUSHA
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page)}
              className={`text-sm font-medium transition-colors hover:text-gold ${currentPage === link.page ? 'text-gold' : 'text-gray-300'}`}>
              
                {link.name}
              </button>
            )}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="bg-gold hover:bg-gold-hover text-navy font-semibold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(245,166,35,0.3)]">
              
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none">
              
              {isMobileMenuOpen ?
              <XIcon className="h-6 w-6" /> :

              <MenuIcon className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-navy-light border-b border-navy-lighter overflow-hidden">
          
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
              {navLinks.map((link) =>
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${currentPage === link.page ? 'bg-navy-lighter text-gold' : 'text-gray-300 hover:bg-navy-lighter hover:text-white'}`}>
              
                  {link.name}
                </button>
            )}
              <button
              onClick={() => handleNavClick('dashboard')}
              className="block w-full text-center mt-4 bg-gold hover:bg-gold-hover text-navy font-semibold px-4 py-3 rounded-lg transition-colors">
              
                Get Started
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}