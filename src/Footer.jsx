import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-gray-300 mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" className="h-8" alt="ECOMZY" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your one-stop destination for quality products at unbeatable prices. Shop smart, shop easy with ECOMZY.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: FaFacebook, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaYoutube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-navy-700 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/", label: "Home" },
                { to: "/cart", label: "Cart" },
                { to: "/admin", label: "Admin Panel" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Customer Service</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Returns & Refunds</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Shipping Info</li>
              <li className="hover:text-primary-400 transition-colors cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>123 Shopping Street, Commerce City</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>support@ecomzy.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ECOMZY. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
