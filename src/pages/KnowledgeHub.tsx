import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SearchIcon,
  ExternalLinkIcon,
  BookOpenIcon,
  ClockIcon } from
'lucide-react';
import { Page } from '../components/Navbar';
interface KnowledgeHubProps {
  setPage: (page: Page) => void;
}
export function KnowledgeHub({ setPage }: KnowledgeHubProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = [
  'All',
  'Basics',
  'CMOs',
  'Royalties',
  'Contracts',
  'ISRC & Codes'];

  const articles = [
  {
    title: 'What is SAMRO and how do I register?',
    category: 'CMOs',
    readTime: '5 min',
    excerpt:
    'Everything you need to know about the Southern African Music Rights Organisation and performance royalties.'
  },
  {
    title: 'Understanding ISRC Codes',
    category: 'ISRC & Codes',
    readTime: '3 min',
    excerpt:
    'Why every song needs a unique digital fingerprint before distribution.'
  },
  {
    title: 'How Split Sheets Work',
    category: 'Contracts',
    readTime: '4 min',
    excerpt:
    'Stop fighting over percentages. Learn how to legally document who wrote what.'
  },
  {
    title: 'Mechanical vs Performance Royalties',
    category: 'Royalties',
    readTime: '6 min',
    excerpt:
    'Breaking down the difference between the money you get from radio play vs streams.'
  },
  {
    title: 'What is a 360 Deal?',
    category: 'Contracts',
    readTime: '7 min',
    excerpt:
    'The pros and cons of signing a contract where the label takes a cut of everything.'
  },
  {
    title: "CAPASSO vs SAMRO: What's the Difference?",
    category: 'CMOs',
    readTime: '4 min',
    excerpt:
    'Why you need to be registered with both organizations to get all your money.'
  },
  {
    title: 'Neighbouring Rights Explained',
    category: 'Royalties',
    readTime: '5 min',
    excerpt:
    'How SAMPRA collects money for the performers and master owners.'
  },
  {
    title: 'Music Publishing 101',
    category: 'Basics',
    readTime: '8 min',
    excerpt:
    'The ultimate beginner guide to owning and exploiting your musical compositions.'
  }];

  const filteredArticles =
  activeCategory === 'All' ?
  articles :
  articles.filter((a) => a.category === activeCategory);
  const cmoLinks = [
  {
    name: 'SAMRO',
    url: 'https://www.samro.org.za',
    desc: 'Performance Rights'
  },
  {
    name: 'CAPASSO',
    url: 'https://www.capasso.co.za',
    desc: 'Mechanical Rights'
  },
  {
    name: 'SAMPRA',
    url: 'https://www.sampra.org.za',
    desc: 'Neighbouring Rights'
  },
  {
    name: 'RISA',
    url: 'https://www.risa.org.za',
    desc: 'Recording Industry SA'
  },
  {
    name: 'ISRC Search',
    url: 'https://isrcsearch.ifpi.org',
    desc: 'Global Database'
  },
  {
    name: 'PRS',
    url: 'https://www.prsformusic.com',
    desc: 'International PRO'
  }];

  return (
    <div className="min-h-screen bg-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Knowledge Hub</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Master the business of music. Learn how to protect your rights and
            collect every cent you are owed.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for 'split sheets', 'SAMRO', 'royalties'..."
              className="w-full bg-navy-light border border-navy-lighter rounded-full px-6 py-4 pl-14 text-white focus:outline-none focus:border-gold transition-colors text-lg shadow-lg" />
            
            <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content: Articles */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {categories.map((cat) =>
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-gold text-navy' : 'bg-navy-light text-gray-400 hover:text-white border border-navy-lighter'}`}>
                
                  {cat}
                </button>
              )}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, i) =>
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.05
                }}
                className="bg-navy-light border border-navy-lighter hover:border-gold/50 rounded-2xl p-6 transition-all group cursor-pointer">
                
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-navy text-gold text-xs font-bold rounded-full border border-gold/20">
                      {article.category}
                    </span>
                    <span className="flex items-center text-xs text-gray-500 font-medium">
                      <ClockIcon className="w-3 h-3 mr-1" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-gold text-sm font-medium">
                    Read Article <BookOpenIcon className="w-4 h-4 ml-2" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar: CMO Quick Links */}
          <div className="lg:col-span-1">
            <div className="bg-navy-light border border-navy-lighter rounded-2xl p-6 sticky top-28">
              <h3 className="font-syne font-bold text-xl mb-6">
                Official CMO Links
              </h3>
              <div className="space-y-4">
                {cmoLinks.map((link, i) =>
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group">
                  
                    <div className="flex justify-between items-center p-3 bg-navy border border-navy-lighter rounded-xl group-hover:border-gold/50 transition-colors">
                      <div>
                        <div className="font-bold text-white group-hover:text-gold transition-colors">
                          {link.name}
                        </div>
                        <div className="text-xs text-gray-500">{link.desc}</div>
                      </div>
                      <ExternalLinkIcon className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors" />
                    </div>
                  </a>
                )}
              </div>

              <div className="mt-8 p-4 bg-gold/10 border border-gold/20 rounded-xl">
                <h4 className="text-gold font-bold mb-2 text-sm">Need Help?</h4>
                <p className="text-xs text-gray-400 mb-3">
                  Not sure which form you need to fill out?
                </p>
                <button
                  onClick={() => setPage('song-form')}
                  className="w-full py-2 bg-gold hover:bg-gold-hover text-navy text-sm font-bold rounded-lg transition-colors">
                  
                  Use Form Generator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}