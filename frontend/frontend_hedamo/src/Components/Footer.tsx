import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-md border-t border-white/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Hedamo</h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Empowering consumers with AI-driven transparency reports for smarter, healthier, and more ethical purchasing decisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-gray-800 transition-colors">Home</a></li>
              <li><a href="/reports" className="text-gray-600 hover:text-gray-800 transition-colors">Reports</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-600 hover:text-gray-800 transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-600 hover:text-gray-800 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/30 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 Hedamo. All rights reserved. Made with ❤️ for conscious consumers.
          </p>
        </div>
      </div>
    </footer>
  );
}