// app/contact/page.tsx
import Link from 'next/link'
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaArrowLeft, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export const metadata = {
  title: 'Contact - NewsHub Pro',
  description: 'Get in touch to discuss NewsHub Pro or explore collaboration opportunities.',
}

export default function ContactPage() {
  const contactMethods = [
    {
      icon: FaEnvelope,
      title: 'Email',
      description: 'areeba@example.com',
      link: 'mailto:areeba@example.com',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: FaLinkedin,
      title: 'LinkedIn',
      description: 'Connect professionally',
      link: 'https://linkedin.com',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: FaGithub,
      title: 'GitHub',
      description: 'View my repositories',
      link: 'https://github.com',
      color: 'text-gray-600 bg-gray-50'
    },
    {
      icon: FaTwitter,
      title: 'Twitter',
      description: '@areeba_dev',
      link: 'https://twitter.com',
      color: 'text-sky-600 bg-sky-50'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors mr-4"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-purple-200 leading-relaxed">
              Let&apos;s discuss NewsHub Pro, explore collaboration opportunities, 
              or chat about web development and technology.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ways to Connect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred method of communication. I&apos;m always excited to discuss 
              new projects, share insights, or explore potential collaborations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <Link
                key={method.title}
                href={method.link}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`inline-flex p-4 rounded-full ${method.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="text-2xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Project Inquiry */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Inquiries</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Interested in similar projects or want to discuss custom web development solutions? 
                I specialize in modern React applications, full-stack development, and creating 
                exceptional user experiences.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Web Development</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• React & Next.js Applications</li>
                    <li>• TypeScript Development</li>
                    <li>• Responsive Design</li>
                    <li>• API Integration</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Full-Stack Solutions</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Backend Development</li>
                    <li>• Database Design</li>
                    <li>• Cloud Deployment</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Consulting</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Code Reviews</li>
                    <li>• Architecture Planning</li>
                    <li>• Technology Selection</li>
                    <li>• Best Practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Availability */}
        <section>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaMapMarkerAlt className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Location & Time</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>Based in Pakistan, working with clients globally</p>
                <p>Available for remote collaboration</p>
                <p>Typical response time: Within 24 hours</p>
                <p>Open to both short-term and long-term projects</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <FaPhone className="text-pink-600 text-xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Let&apos;s Discuss</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>Have a project in mind? Let&apos;s talk about it!</p>
                <p>Available for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Project consultations</li>
                  <li>Technical discussions</li>
                  <li>Collaboration opportunities</li>
                  <li>Mentoring and knowledge sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
