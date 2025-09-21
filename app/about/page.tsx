// app/about/page.tsx
import Link from 'next/link'
import { FaReact,  FaGithub, FaLinkedin, FaArrowLeft, FaCode, FaRocket, FaMobile, FaGlobe } from 'react-icons/fa'
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiVercel } from 'react-icons/si'

export const metadata = {
  title: 'About - NewsHub Pro',
  description: 'Learn about NewsHub Pro - A modern news application built with cutting-edge web technologies.',
}

export default function AboutPage() {
  const techStack = [
    { name: 'Next.js 14', icon: SiNextdotjs, description: 'React framework with App Router' },
    { name: 'TypeScript', icon: SiTypescript, description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, description: 'Utility-first CSS framework' },
    { name: 'React Icons', icon: FaReact, description: 'Icon library for React' },
    { name: 'Vercel', icon: SiVercel, description: 'Deployment and hosting platform' },
  ]

  const features = [
    {
      icon: FaRocket,
      title: 'Server-Side Rendering',
      description: 'Lightning-fast page loads with SSR and static generation'
    },
    {
      icon: FaMobile,
      title: 'Fully Responsive',
      description: 'Optimized for all devices - mobile, tablet, and desktop'
    },
    {
      icon: FaGlobe,
      title: 'Real-time Data',
      description: 'Live news updates from trusted global sources'
    },
    {
      icon: FaCode,
      title: 'Modern Architecture',
      description: 'Built with latest web standards and best practices'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                NewsHub Pro
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              A modern, full-stack news application showcasing cutting-edge web development 
              technologies and professional software engineering practices.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Overview */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Overview</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  NewsHub Pro is a sophisticated news aggregation platform built with modern web technologies. 
                  It demonstrates advanced React patterns, server-side rendering, and responsive design principles.
                </p>
                <p>
                  The application fetches real-time news data from multiple sources, processes it efficiently, 
                  and presents it in an intuitive, user-friendly interface optimized for all devices.
                </p>
                <p>
                  This project showcases my expertise in full-stack development, API integration, 
                  performance optimization, and modern deployment practices.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h3>
              <div className="grid gap-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <feature.icon className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <tech.icon className="text-4xl text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Development Approach */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Development Approach</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Frontend Excellence</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Component-based architecture with React</li>
                  <li>• Type-safe development with TypeScript</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• Performance optimization techniques</li>
                  <li>• Accessibility best practices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Backend Integration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Server-side rendering with Next.js</li>
                  <li>• RESTful API integration</li>
                  <li>• Error handling and fallback systems</li>
                  <li>• Environment variable management</li>
                  <li>• Production deployment on Vercel</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Let&apos;s Connect</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Interested in discussing this project or exploring collaboration opportunities? 
              I&apos;d love to hear from you!
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="https://linkedin.com"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaGithub />
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}