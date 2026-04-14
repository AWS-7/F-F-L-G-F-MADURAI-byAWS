import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

const branches = [
  {
    name: 'Kadachanenthal Branch',
    address: 'Kadachanenthal, Madurai, Tamil Nadu',
    phone: '93442 49843',
    hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
  },
  {
    name: 'Othakkadai Branch',
    address: 'Othakkadai, Madurai, Tamil Nadu',
    phone: '90808 82873',
    hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
  },
];

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Health Bar', href: '#health-bar' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/femme_flexmdu59?igsh=YmlodGZvMGdodHRx' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/18EeaQWTW1/' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919080882873' },
];

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #111 0%, #0a0a0a 100%)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(128,0,128,0.08) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6" data-aos="fade-up">
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center mb-2">
            <span
              className="font-display font-black text-2xl sm:text-3xl tracking-[0.15em] leading-none"
              style={{ color: '#D4AF37' }}
            >
              FEMME
            </span>
            <span
              className="font-display font-black text-2xl sm:text-3xl tracking-[0.15em] -mt-1 leading-none"
              style={{ color: '#800080' }}
            >
              FLEX
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '50%',
                  color: 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4AF37';
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          {/* Quick Links */}
          <div className="text-center">
            <h4
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#D4AF37' }}
            >
              Links
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/50 hover:text-white text-xs tracking-wider transition-colors duration-200 nav-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#D4AF37' }}
            >
              Contact
            </h4>
            <div className="space-y-2">
                <a
                  href="tel:9344249843"
                  className="text-white/50 hover:text-white text-xs transition-colors duration-200 block"
                >
                  93442 49843
                </a>
                <a
                  href="tel:9080882873"
                  className="text-white/50 hover:text-white text-xs transition-colors duration-200 block"
                >
                  90808 82873
                </a>
                <p className="text-white/30 text-xs tracking-wider">Mon–Sat: 5:30 AM – 9:00 PM</p>
            </div>
          </div>

          {/* Branches */}
          <div className="text-center">
            <h4
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#D4AF37' }}
            >
              Branches
            </h4>
            <div className="space-y-3">
              {branches.map((branch) => (
                <div key={branch.name}>
                  <p className="text-white/70 text-xs font-semibold mb-1">{branch.name}</p>
                  <p className="text-white/40 text-xs leading-relaxed">{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="text-center pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-white/30 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} Femme Flex | Madurai, India
          </p>
          <p className="text-white/20 text-xs mt-1 tracking-wider">
            Developed By <span style={{ color: '#800080' }}>AWS - Agni Web Solutions</span> | <span style={{ color: '#D4AF37' }}>9080700642</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
