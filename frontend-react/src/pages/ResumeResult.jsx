import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';

const ResumeResult = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResult = localStorage.getItem('resumeAnalysis');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate('/resume-upload');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-dim">Loading results...</div>
      </div>
    );
  }

  const { score, ats_score, keywords_found, keywords_missing, formatting_issues, suggestions } = result;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-500/20';
    if (score >= 60) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/resume-upload" className="text-text-dim hover:text-white flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Link>
          <h1 className="text-4xl font-bold mb-2">Resume Analysis Results</h1>
          <p className="text-text-dim">Here's what our AI found in your resume</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className={`w-32 h-32 rounded-full ${getScoreBg(score)} flex items-center justify-center`}>
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
              <p className="text-text-dim">
                {score >= 80 
                  ? 'Great job! Your resume looks strong.' 
                  : score >= 60 
                    ? 'Good start, but there\'s room for improvement.' 
                    : 'Your resume needs significant improvements.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ATS Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            ATS Compatibility
          </h3>
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold ${getScoreColor(ats_score)}`}>{ats_score}%</div>
            <div className="flex-1">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${ats_score >= 80 ? 'bg-green-500' : ats_score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${ats_score}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-6"
        >
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Keywords Found ({keywords_found?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords_found?.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                >
                  {keyword}
                </span>
              )) || <span className="text-text-dim">No keywords found</span>}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Missing Keywords ({keywords_missing?.length || 0})
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywords_missing?.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                >
                  {keyword}
                </span>
              )) || <span className="text-text-dim">No missing keywords</span>}
            </div>
          </div>
        </motion.div>

        {/* Formatting Issues */}
        {formatting_issues?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Formatting Issues
            </h3>
            <ul className="space-y-2">
              {formatting_issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-text-dim">
                  <span className="text-yellow-500 mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-lg font-semibold mb-4">Improvement Suggestions</h3>
          <ul className="space-y-3">
            {suggestions?.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3 text-text-dim">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm flex-shrink-0">
                  {index + 1}
                </span>
                {suggestion}
              </li>
            )) || <li className="text-text-dim">No suggestions available</li>}
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/resume-upload" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Analyze Another Resume
          </Link>
          <button 
            className="btn-ghost inline-flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeResult;
