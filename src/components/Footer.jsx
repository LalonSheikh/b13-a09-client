import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">IdeaVault</h2>
            <p className="mt-4 text-base-content/70 leading-relaxed">
              Discover innovative startup ideas, share your creativity,
              collaborate with others, and turn imagination into reality.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>

            <ul className="space-y-3 text-base-content/70">
              <li>
                <Link href="/ideas" className="hover:bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition">
                  Ideas
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="hover:bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/add-idea"
                  className="hover:bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition"
                >
                  Add Idea
                </Link>
              </li>

              <li>
                <Link
                  href="/my-ideas"
                  className="hover:bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition"
                >
                  My Ideas
                </Link>
              </li>

              <li>
                <Link
                  href="/my-interactions"
                  className="hover:bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent transition"
                >
                  My Interactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-base-content/70">
              <p>info@ideavault.com</p>
              <p>01728502644</p>
              <p> Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

            <div className="flex items-center gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-base-100 flex items-center justify-center shadow hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-base-100 flex items-center justify-center shadow hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-base-100 flex items-center justify-center shadow hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-base-100 flex items-center justify-center shadow hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaGithub size={18} />
              </a>
            </div>

            <p className="mt-4 text-sm text-base-content/60">
              Join our growing community and stay connected.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-300 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} IdeaVault. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>

            <Link href="/cookies" className="hover:text-primary transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
