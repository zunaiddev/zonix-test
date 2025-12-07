import { Twitter, Linkedin, Instagram, Youtube, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-yellow-400/10 border-t border-yellow-400/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-black dark:text-white">ZONIX</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Empowering Bharat's Financial Future
            </p>
          </div>

          <div>
            <h4 className="text-black dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">About</a></li>
              <li><a href="#careers" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">Terms of Service</a></li>
              <li><a href="#compliance" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors">Compliance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#twitter" className="p-2 rounded-full bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/30 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#linkedin" className="p-2 rounded-full bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/30 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#instagram" className="p-2 rounded-full bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/30 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#youtube" className="p-2 rounded-full bg-yellow-400/20 text-yellow-500 hover:bg-yellow-400/30 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-400/20 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 ZONIX. All rights reserved. SEBI Registered | Made in Bharat 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
