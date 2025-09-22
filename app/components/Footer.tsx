// components/Footer.tsx
import Link from 'next/link'
import { FaRegNewspaper, FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <FaRegNewspaper className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl">NewsHub Pro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              A professional news application showcasing modern web development with Next.js 13+, 
              TypeScript, and cutting-edge design patterns. Built with performance, accessibility, 
              and user experience in mind.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://linkedin.com" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link 
                href="https://github.com/areeba75" 
                className="text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="GitHub Profile"
              >
                <FaGithub size={20} />
              </Link>
              {/* <Link 
                href="https://twitter.com" 
                className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Twitter Profile"
              >
                <FaTwitter size={20} />
              </Link> */}
              <Link 
                href="mailto:areebaars1@gmail.com" 
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                aria-label="Email Contact"
              >
                <FaEnvelope size={20} />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors hover:underline">
                  Headlines
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors hover:underline">
                  About Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/category/technology" className="hover:text-white transition-colors hover:underline">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/world" className="hover:text-white transition-colors hover:underline">
                  World News
                </Link>
              </li>
              <li>
                <Link href="/category/business" className="hover:text-white transition-colors hover:underline">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-white transition-colors hover:underline">
                  Sports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} NewsHub Pro. Built by Areeba with <FaHeart className="inline text-red-500 mx-1" /> using Next.js</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Powered by</span>
                <Link href="https://newsapi.org" className="text-blue-400 hover:text-blue-300 transition-colors">
                  NewsAPI
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tech Stack Credits */}
          <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              Built with <span className="text-blue-400">Next.js 14</span>, <span className="text-blue-400">TypeScript</span>, <span className="text-teal-400">Tailwind CSS</span> • 
              Deployed on <span className="text-gray-300">Vercel</span> • 
              News data from <span className="text-orange-400">NewsAPI</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer