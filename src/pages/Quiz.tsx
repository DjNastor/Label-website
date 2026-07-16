import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AwardIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  RotateCcwIcon } from
'lucide-react';
import { Page } from '../components/Navbar';
interface QuizProps {
  setPage: (page: Page) => void;
}
export function Quiz({ setPage }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const questions = [
  {
    q: 'Which organisation collects composer and publisher performance royalties in SA?',
    options: ['SAMRO', 'CAPASSO', 'SAMPRA', 'RISA'],
    correct: 0,
    explanation:
    'SAMRO (Southern African Music Rights Organisation) administers performing rights on behalf of composers, authors, and publishers.'
  },
  {
    q: 'What does ISRC stand for?',
    options: [
    'Internal Song Registration Code',
    'International Standard Recording Code',
    'Independent Studio Release Code',
    'Internet Stream Revenue Code'],

    correct: 1,
    explanation:
    'ISRC is the international identification system for sound recordings and music video recordings.'
  },
  {
    q: 'What is a split sheet?',
    options: [
    'A paper used to wrap CDs',
    'A document dividing studio time',
    'A legal agreement stating who owns what percentage of a song',
    'A form to split royalties with your manager'],

    correct: 2,
    explanation:
    'A split sheet is a written agreement that identifies each contributor to a song and establishes ownership percentages.'
  },
  {
    q: 'Which CMO handles neighbouring rights (royalties for the actual sound recording)?',
    options: ['SAMRO', 'CAPASSO', 'SAMPRA', 'RISA'],
    correct: 2,
    explanation:
    'SAMPRA collects and distributes Needletime Rights (neighbouring rights) royalties to recording artists and record labels.'
  },
  {
    q: 'What does CAPASSO stand for?',
    options: [
    'Composers, Authors and Publishers Association',
    'Copyright And Publishing Agency of South Africa',
    'Creative Artists Performance Association',
    'Composers And Producers Association'],

    correct: 0,
    explanation:
    'CAPASSO is a mechanical rights licensing agency based in Johannesburg.'
  },
  {
    q: 'What is a mechanical royalty?',
    options: [
    'Money paid to the producer for making the beat',
    'Money generated every time a song is reproduced (CDs, downloads, streams)',
    'Money generated when a song is played on radio',
    'Money paid to the mixing engineer'],

    correct: 1,
    explanation:
    'Mechanical royalties are paid to songwriters and publishers when music is reproduced, including physical copies and interactive streams.'
  },
  {
    q: 'What does a 360 deal mean?',
    options: [
    'A contract that lasts 360 days',
    'A record deal where the label takes a percentage of ALL your income streams (touring, merch, etc.)',
    'A deal where you get 360 degrees of creative control',
    'A publishing deal only'],

    correct: 1,
    explanation:
    "In a 360 deal, a record label takes a cut of all the artist's revenue streams, not just record sales."
  },
  {
    q: 'What is the difference between Master and Publishing rights?',
    options: [
    'Master is the beat, Publishing is the lyrics',
    'Master is the sound recording, Publishing is the underlying composition (lyrics & melody)',
    'Master is for the label, Publishing is for the manager',
    'There is no difference'],

    correct: 1,
    explanation:
    'The Master is the actual audio recording. Publishing refers to the underlying musical composition (the notes and lyrics written on paper).'
  },
  {
    q: 'What is a UPC used for?',
    options: [
    'Universal Product Code - tracking the entire album/release',
    'Unique Producer Code - identifying the beatmaker',
    'Universal Publishing Code - registering with SAMRO',
    'None of the above'],

    correct: 0,
    explanation:
    'UPC (Universal Product Code) acts as a barcode for your entire release (single, EP, or album), while ISRC is for individual tracks.'
  },
  {
    q: 'If you write a song entirely by yourself and record it independently, who owns the Publishing and the Master?',
    options: [
    'SAMRO owns both',
    'You own the Master, SAMRO owns the Publishing',
    'You own 100% of both the Publishing and the Master',
    'The distributor owns the Master'],

    correct: 2,
    explanation:
    'As an independent creator who wrote and funded the recording, you retain 100% ownership of both copyrights until you sign them away.'
  }];

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIsFinished(false);
  };
  const getBadge = () => {
    if (score >= 9)
    return {
      title: 'Music Rights Expert',
      color: 'text-gold'
    };
    if (score >= 6)
    return {
      title: 'Industry Professional',
      color: 'text-blue-400'
    };
    return {
      title: 'Rising Artist',
      color: 'text-green-400'
    };
  };
  return (
    <div className="min-h-screen bg-navy py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Test Your Knowledge
          </h1>
          <p className="text-gray-400">
            How well do you know the South African music business?
          </p>
        </div>

        {!isFinished ?
        <div className="bg-navy-light border border-navy-lighter rounded-3xl p-6 md:p-10 shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2 font-medium">
                <span>
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-navy rounded-full overflow-hidden">
                <div
                className="h-full bg-gold transition-all duration-500"
                style={{
                  width: `${(currentQuestion + 1) / questions.length * 100}%`
                }}>
              </div>
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold mb-8 leading-relaxed">
              {questions[currentQuestion].q}
            </h2>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === questions[currentQuestion].correct;
              let btnClass =
              'w-full text-left px-6 py-4 rounded-xl border transition-all font-medium ';
              if (!showExplanation) {
                btnClass +=
                'bg-navy border-navy-lighter hover:border-gold/50 hover:bg-navy-lighter text-gray-300';
              } else {
                if (isCorrect) {
                  btnClass +=
                  'bg-green-900/20 border-green-500 text-green-400';
                } else if (isSelected && !isCorrect) {
                  btnClass += 'bg-red-900/20 border-red-500 text-red-400';
                } else {
                  btnClass +=
                  'bg-navy border-navy-lighter text-gray-500 opacity-50';
                }
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={btnClass}>
                  
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {showExplanation && isCorrect &&
                    <CheckCircleIcon className="w-5 h-5" />
                    }
                      {showExplanation && isSelected && !isCorrect &&
                    <XCircleIcon className="w-5 h-5" />
                    }
                    </div>
                  </button>);

            })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation &&
            <motion.div
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              className="bg-navy border border-navy-lighter rounded-xl p-6 mb-8">
              
                  <h4 className="font-bold text-white mb-2 flex items-center">
                    {selectedAnswer === questions[currentQuestion].correct ?
                <span className="text-green-400 flex items-center">
                        <CheckCircleIcon className="w-5 h-5 mr-2" /> Correct!
                      </span> :

                <span className="text-red-400 flex items-center">
                        <XCircleIcon className="w-5 h-5 mr-2" /> Incorrect
                      </span>
                }
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
            }
            </AnimatePresence>

            {/* Next Button */}
            {showExplanation &&
          <div className="flex justify-end">
                <button
              onClick={nextQuestion}
              className="bg-gold hover:bg-gold-hover text-navy font-bold px-8 py-3 rounded-xl flex items-center transition-colors">
              
                  {currentQuestion === questions.length - 1 ?
              'See Results' :
              'Next Question'}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
          }
          </div> /* Results Screen */ :

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="bg-navy-light border border-navy-lighter rounded-3xl p-10 text-center shadow-2xl">
          
            <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gold">
              <AwardIcon className="w-12 h-12 text-gold" />
            </div>

            <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-400 mb-8">
              You scored {score} out of {questions.length}
            </p>

            <div className="bg-navy border border-navy-lighter rounded-2xl p-6 mb-10 inline-block">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                Your Rank
              </p>
              <p className={`text-2xl font-syne font-bold ${getBadge().color}`}>
                {getBadge().title}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-navy border border-navy-lighter hover:bg-navy-lighter text-white font-medium rounded-xl flex items-center justify-center transition-colors">
              
                <RotateCcwIcon className="w-5 h-5 mr-2" /> Retake Quiz
              </button>
              <button
              onClick={() => setPage('knowledge')}
              className="px-8 py-3 bg-gold hover:bg-gold-hover text-navy font-bold rounded-xl transition-colors shadow-lg">
              
                Go to Knowledge Hub
              </button>
            </div>
          </motion.div>
        }
      </div>
    </div>);

}