import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, Clock, Shield, Zap, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'AI Resume Analysis',
      description: 'Get instant feedback on your resume with AI-powered suggestions for improvement.',
    },
    {
      icon: Clock,
      title: 'Digital Time Capsules',
      description: 'Preserve your memories and messages for your future self to discover.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. We never share your information.',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate analysis and suggestions to improve your career prospects.',
    },
  ];

  const steps = [
    { number: '01', title: 'Upload Resume', description: 'Upload your resume in PDF or image format' },
    { number: '02', title: 'AI Analysis', description: 'Our AI analyzes your resume for improvements' },
    { number: '03', title: 'Get Results', description: 'Receive detailed feedback and actionable suggestions' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <img 
                  src="/images/logo.png" 
                  alt="NexusLearn" 
                  className="h-40 w-auto"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(107,33,255,0.5))' }}
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="shiny-text">Student Tools Platform</span>
              </h1>
              <p className="text-xl text-text-dim mb-8 max-w-lg">
                Supercharge your career with AI-powered resume analysis and preserve your memories in digital time capsules.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/resume-upload" className="btn-primary inline-flex items-center gap-2">
                  Analyze Resume <ArrowRight size={18} />
                </Link>
                <Link to="/capsule-create" className="btn-ghost inline-flex items-center gap-2">
                  Create Time Capsule <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-4 bg-primary/20 rounded w-1/2"></div>
                  <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-text-dim max-w-2xl mx-auto">
              Everything you need to boost your career and preserve your memories
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/50 transition-all"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-dim text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-text-dim max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl font-bold text-primary/30 mb-4">{step.number}</div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-dim">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-text-dim mb-8 max-w-lg mx-auto">
              Join thousands of students boosting their careers with AI-powered tools
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary">
                Create Free Account
              </Link>
              <Link to="/resume-upload" className="btn-ghost">
                Try Resume Analyzer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="/images/logo.png" 
                alt="NexusLearn" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-text-dim text-sm">
                AI-powered tools for students to boost their careers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-text-dim text-sm">
                <li><Link to="/resume-upload" className="hover:text-white">Resume Analyzer</Link></li>
                <li><Link to="/capsule-create" className="hover:text-white">Time Capsules</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-text-dim text-sm">
                <li><Link to="/login" className="hover:text-white">Log in</Link></li>
                <li><Link to="/signup" className="hover:text-white">Sign up</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developer</h4>
              <ul className="space-y-2 text-text-dim text-sm">
                <li>Dev Khanapue</li>
                <li><a href="https://instagram.com/isthisdev" target="_blank" rel="noopener noreferrer" className="hover:text-white">@isthisdev</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-text-dim text-sm pt-8 border-t border-white/10">
            <p>&copy; 2026 Student Tools Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
