import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircleIcon, FileTextIcon, InfoIcon, ShieldCheckIcon, UploadIcon } from 'lucide-react';
import { Page } from '../components/Navbar';

interface ContractAnalyzerProps {
  setPage?: (page: Page) => void;
}

export function ContractAnalyzer({ setPage }: ContractAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState('English');
  const [fileName, setFileName] = useState('Contract_Draft.pdf');
  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };
  return (
    <div className="min-h-screen bg-navy py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            AI Contract Analyzer
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Upload your recording, publishing, or distribution deal. Our AI will
            translate the legal jargon and flag any risks before you sign.
          </p>
        </div>

        {!showResults ?
        <div className="max-w-3xl mx-auto">
            <div className="bg-navy-light border border-navy-lighter rounded-3xl p-8 mb-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contract Type
                </label>
                <select className="w-full bg-navy border border-navy-lighter rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none">
                  <option>Recording Contract (Exclusive)</option>
                  <option>Distribution Deal</option>
                  <option>360 Deal</option>
                  <option>Publishing Agreement</option>
                  <option>Management Contract</option>
                </select>
              </div>

              <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${isAnalyzing ? 'border-gold bg-gold/5' : 'border-navy-lighter hover:border-gold/50 bg-navy'}`}>
              
                {isAnalyzing ?
              <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-navy-lighter border-t-gold rounded-full animate-spin mb-4"></div>
                    <h3 className="text-xl font-bold text-gold mb-2">
                      Analyzing Legal Clauses...
                    </h3>
                    <p className="text-gray-400">
                      Scanning for royalty splits, master ownership, and term
                      lengths.
                    </p>
                  </div> :

              <label className="flex flex-col items-center cursor-pointer">
                
                    <div className="w-16 h-16 bg-navy-lighter rounded-full flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                      <UploadIcon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Upload Contract PDF
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Drag and drop, or click to browse
                    </p>
                    <span className="bg-navy-lighter hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                      Select File
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                          handleUpload();
                        }
                      }}
                    />
                  </label>
              }
              </div>
            </div>

            <div className="flex items-start bg-blue-900/20 border border-blue-900/50 rounded-xl p-4">
              <ShieldCheckIcon className="w-6 h-6 text-blue-400 mr-3 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200">
                <strong>Privacy Guaranteed:</strong> Your contracts are
                encrypted, analyzed securely, and immediately deleted from our
                servers. We never share your legal documents.
              </p>
            </div>
          </div> :

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
            {/* Left Column: Summary & Controls */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <FileTextIcon className="w-6 h-6 text-gold mr-3" />
                  <h2 className="text-xl font-bold truncate">
                    {fileName}
                  </h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-navy-lighter pb-2">
                    <span className="text-gray-400">Type</span>
                    <span className="font-medium">Exclusive Recording</span>
                  </div>
                  <div className="flex justify-between border-b border-navy-lighter pb-2">
                    <span className="text-gray-400">Pages</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-400">Risk Level</span>
                    <span className="font-medium text-yellow-400 flex items-center">
                      <AlertTriangleIcon className="w-4 h-4 mr-1" /> Moderate
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-navy-light border border-navy-lighter rounded-2xl p-6">
                <h3 className="font-bold mb-4">Translate Explanations</h3>
                <div className="space-y-2">
                  {['English', 'isiZulu', 'isiXhosa', 'Sesotho'].map((lang) =>
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${language === lang ? 'bg-gold text-navy' : 'bg-navy hover:bg-navy-lighter text-gray-300'}`}>
                  
                      {lang}
                    </button>
                )}
                </div>
              </div>

              <button
              onClick={() => setShowResults(false)}
              className="w-full py-3 rounded-xl border border-navy-lighter hover:bg-navy-lighter text-white font-medium transition-colors">
              
                Analyze Another Contract
              </button>
              {setPage &&
              <button
                onClick={() => setPage('dashboard')}
                className="w-full py-3 rounded-xl bg-navy-lighter hover:bg-gray-700 text-white font-medium transition-colors">
                
                  Back to Dashboard
                </button>
              }
            </div>

            {/* Right Column: Analysis Results */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-syne font-bold mb-2">
                Key Clauses Explained
              </h2>
              <p className="text-gray-400 mb-6">
                Here is what this contract actually means in plain language.
              </p>

              {/* Clause 1: Red Flag */}
              <div className="bg-navy-light border border-red-900/50 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center">
                    Master Ownership
                    <span className="ml-3 px-2.5 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider">
                      High Risk
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500">Section 4.1</span>
                </div>
                <div className="bg-navy rounded-xl p-4 mb-4 border border-navy-lighter">
                  <p className="text-sm text-gray-400 font-mono">
                    "Artist hereby assigns and transfers to Label 100% of the
                    copyright in and to the Master Recordings in perpetuity
                    throughout the universe..."
                  </p>
                </div>
                <div className="flex items-start">
                  <InfoIcon className="w-5 h-5 text-red-400 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">
                      {language === 'English' ?
                    'What this means:' :
                    'Lokhu kusho ukuthi:'}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {language === 'English' ?
                    'You are giving away the ownership of your recordings FOREVER. You will never own these specific recordings, even after the contract ends. They can use them however they want.' :
                    'Unikela ngobunikazi bokuqoshwa kwakho KUZE KUBE PHAKADE. Awusoze waba ngumnikazi walokhu kuqoshwa, ngisho nangemva kokuphela kwenkontileka.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Clause 2: Yellow Flag */}
              <div className="bg-navy-light border border-yellow-900/50 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center">
                    Royalty Rate
                    <span className="ml-3 px-2.5 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full uppercase tracking-wider">
                      Standard
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500">Section 7.2</span>
                </div>
                <div className="bg-navy rounded-xl p-4 mb-4 border border-navy-lighter">
                  <p className="text-sm text-gray-400 font-mono">
                    "Label shall pay Artist a royalty of eighteen percent (18%)
                    of Net Receipts..."
                  </p>
                </div>
                <div className="flex items-start">
                  <InfoIcon className="w-5 h-5 text-yellow-400 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">
                      What this means:
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      You get 18% of the profits, but ONLY AFTER the label
                      deducts their expenses ("Net Receipts"). Make sure you
                      check Section 8 to see exactly what expenses they are
                      allowed to deduct before paying you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Clause 3: Green Flag */}
              <div className="bg-navy-light border border-green-900/50 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex items-center">
                    Publishing Rights
                    <span className="ml-3 px-2.5 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full uppercase tracking-wider">
                      Favorable
                    </span>
                  </h3>
                  <span className="text-sm text-gray-500">Section 12.1</span>
                </div>
                <div className="bg-navy rounded-xl p-4 mb-4 border border-navy-lighter">
                  <p className="text-sm text-gray-400 font-mono">
                    "Nothing in this agreement shall be construed as a grant of
                    publishing rights. Artist retains 100% of the underlying
                    musical composition..."
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">
                      What this means:
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Good news! You keep 100% of your publishing rights. You
                      will still collect all your SAMRO and CAPASSO royalties
                      directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        }
      </div>
    </div>);

}
