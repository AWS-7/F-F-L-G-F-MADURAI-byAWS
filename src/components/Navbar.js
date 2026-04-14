import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../images/femmeFlex_Strength_in_Style.png';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Health Bar', href: '#health-bar' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(17,17,17,0.97)'
            : 'linear-gradient(to bottom, rgba(17,17,17,0.8), transparent)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Image */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center"
            >
              <img
                src={logo}
                alt="Femme Flex"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="nav-link text-sm font-body font-medium tracking-wider text-white/80 hover:text-metallic-gold uppercase"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="px-5 py-2 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                  color: '#111',
                  borderRadius: '2px',
                }}
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80"
          onClick={() => setMenuOpen(false)}
        />

        {/* Side Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(180deg, #111 0%, #1a1a1a 100%)',
            borderLeft: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <img
              src={logo}
              alt="Femme Flex"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="w-full text-left py-4 px-3 text-sm font-medium tracking-widest uppercase text-white/80 hover:text-metallic-gold transition-colors border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="mt-4 w-full py-4 text-sm font-semibold tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                color: '#111',
                borderRadius: '2px',
              }}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
