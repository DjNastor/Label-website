import React from 'react';
import { motion } from 'framer-motion';
import {
  FileTextIcon,
  MusicIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  GlobeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PlayCircleIcon } from
'lucide-react';
import { Page } from '../components/Navbar';
interface LandingPageProps {
  setPage: (page: Page) => void;
}
export function LandingPage({ setPage }: LandingPageProps) {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-navy to-navy pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8
            }}
            className="text-center max-w-4xl mx-auto">
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-lighter border border-gold/30 text-gold text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-gold mr-2 animate-pulse"></span>
              The #1 Music Rights Assistant in South Africa
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Register Your Music. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">
                Get Paid.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop losing royalties to administrative confusion. PHUSHA
              automatically generates your SAMRO, CAPASSO, and SAMPRA forms,
              creates split sheets, and analyzes your contracts in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setPage('dashboard')}
                className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-hover text-navy font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,166,35,0.4)] flex items-center justify-center">
                
                Start For Free
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setPage('knowledge')}
                className="w-full sm:w-auto px-8 py-4 bg-navy-light hover:bg-navy-lighter border border-gray-700 text-white font-semibold rounded-full transition-all flex items-center justify-center">
                
                <PlayCircleIcon className="mr-2 h-5 w-5 text-gray-400" />
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-y border-navy-lighter bg-navy-light/50 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
            {
              label: 'Artists Supported',
              value: '50,000+'
            },
            {
              label: 'Royalties Tracked',
              value: 'R2M+'
            },
            {
              label: 'CMOs Integrated',
              value: '4'
            },
            {
              label: 'Local Languages',
              value: '4'
            }].
            map((stat, i) =>
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: i * 0.1
              }}>
              
                <div className="text-3xl font-syne font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to{' '}
              <span className="text-gold">protect your art</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              One platform to handle all your music administration, so you can
              focus on creating.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
            {
              icon: FileTextIcon,
              title: 'Universal Song Form',
              desc: 'Enter your song details once, and we generate all the necessary paperwork automatically.'
            },
            {
              icon: MusicIcon,
              title: 'Smart Metadata',
              desc: 'Export perfectly formatted metadata ready for distributors like Spotify and Apple Music.'
            },
            {
              icon: ShieldCheckIcon,
              title: 'Contract Analyzer',
              desc: 'Upload your deals. Our AI explains royalty splits, master ownership, and flags risks.'
            },
            {
              icon: GlobeIcon,
              title: 'CMO Form Generator',
              desc: 'Auto-fill SAMRO, CAPASSO, SAMPRA, and RISA forms with zero confusion.'
            },
            {
              icon: BookOpenIcon,
              title: 'Knowledge Hub',
              desc: 'Learn the business of music with our comprehensive guides tailored for SA artists.'
            },
            {
              icon: CheckCircleIcon,
              title: 'Split Sheet Generator',
              desc: 'Create professional, legally binding split sheets for all your collaborators instantly.'
            }].
            map((feature, i) =>
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-navy-light border border-navy-lighter p-8 rounded-2xl hover:border-gold/50 transition-colors group">
              
                <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CMO Partners */}
      <section className="py-24 bg-navy-light border-y border-navy-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Built for South African Music Organizations
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {['SAMRO', 'CAPASSO', 'SAMPRA', 'RISA'].map((cmo) =>
            <div
              key={cmo}
              className="text-2xl md:text-4xl font-syne font-bold tracking-widest hover:text-white transition-colors cursor-default text-[#FFFFFF]">
              
                {cmo}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy-light to-navy border border-navy-lighter rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Speak your language. <br />
                Know your rights.
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Music business terminology is confusing enough. That's why
                PHUSHA is fully translated into local languages, making music
                rights accessible to everyone.
              </p>
              <div className="flex flex-wrap gap-3">
                {['English', 'isiZulu', 'isiXhosa', 'Sesotho'].map((lang) =>
                <span
                  key={lang}
                  className="px-4 py-2 bg-navy rounded-full border border-navy-lighter text-sm font-medium text-gray-300">
                  
                    {lang}
                  </span>
                )}
              </div>
            </div>
            <div className="md:w-5/12 relative">
              <div className="absolute inset-0 bg-gold/20 blur-[100px] rounded-full"></div>
              <div className="relative bg-navy border border-navy-lighter rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="h-4 bg-navy-lighter rounded w-3/4"></div>
                  <div className="h-4 bg-navy-lighter rounded w-1/2"></div>
                  <div className="p-4 bg-navy-light rounded-xl border border-gold/20 mt-6">
                    <p className="text-gold font-medium mb-2">
                      isiZulu Translation Active
                    </p>
                    <p className="text-sm text-gray-300">
                      Amalungelo obunikazi bengoma yakho abalulekile. Gcwalisa
                      ifomu le-SAMRO ukuze ukhokhelwe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Choose the plan that fits your career stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-navy border border-navy-lighter rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-bold text-gray-300 mb-2">Free</h3>
              <div className="text-4xl font-bold mb-6">
                R0<span className="text-lg text-gray-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                'Up to 3 songs',
                'Split sheet generator',
                'Basic metadata export',
                'Knowledge Hub access'].
                map((feature, i) =>
                <li key={i} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-gold mr-3 shrink-0" />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                )}
              </ul>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-navy-lighter hover:bg-gray-700 text-white font-semibold transition-colors">
                
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-navy border border-gold rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(245,166,35,0.15)]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold text-navy px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-gold mb-2">Pro Artist</h3>
              <div className="text-4xl font-bold mb-6">
                R99
                <span className="text-lg text-gray-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                'Unlimited songs',
                'All CMO forms (SAMRO, etc.)',
                'AI Contract Analyzer',
                'Distributor ready metadata',
                'Priority support'].
                map((feature, i) =>
                <li key={i} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-gold mr-3 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                )}
              </ul>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-gold hover:bg-gold-hover text-navy font-bold transition-colors shadow-lg">
                
                Upgrade to Pro
              </button>
            </div>

            {/* Label */}
            <div className="bg-navy border border-navy-lighter rounded-3xl p-8 flex flex-col">
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                Label / Manager
              </h3>
              <div className="text-4xl font-bold mb-6">
                R499
                <span className="text-lg text-gray-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                'Manage up to 50 artists',
                'Bulk form generation',
                'Advanced contract analysis',
                'Team collaboration',
                'API Access'].
                map((feature, i) =>
                <li key={i} className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-gold mr-3 shrink-0" />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                )}
              </ul>
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-navy-lighter hover:bg-gray-700 text-white font-semibold transition-colors">
                
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 border-t border-navy-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MusicIcon className="h-6 w-6 text-gold mr-2" />
            <span className="font-syne font-bold text-xl tracking-wider">
              PHUSHA
            </span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2026 Phusha Music Rights. Designed for South African Artists.
          </div>
        </div>
      </footer>
    </div>);

}