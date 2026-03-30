import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, X, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setFile(file);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/resume/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Store result in localStorage or state management
      localStorage.setItem('resumeAnalysis', JSON.stringify(response.data));
      navigate('/resume-result');
    } catch (err) {
      const errDetail = err.response?.data?.detail;
      const errMsg = typeof errDetail === 'object' ? JSON.stringify(errDetail) : (errDetail || 'Failed to analyze resume');
      setError(errMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">AI Resume Analysis</h1>
          <p className="text-text-dim">
            Upload your resume and get instant AI-powered feedback
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
              {typeof error === 'object' ? JSON.stringify(error) : error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-white/20 hover:border-primary/50'
              } ${file ? 'bg-green-500/10 border-green-500/50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
              />

              {file ? (
                <div className="flex items-center justify-center gap-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <div className="text-left">
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-text-dim text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">Drop your resume here</p>
                  <p className="text-text-dim mb-4">
                    or click to browse (PDF, JPG, PNG)
                  </p>
                  <p className="text-text-muted text-sm">Maximum file size: 10MB</p>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full btn-primary mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {uploading ? (
                'Analyzing...'
              ) : (
                <>
                  Analyze Resume
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              What you'll get:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'ATS compatibility score',
                'Keyword analysis',
                'Improvement suggestions',
                'Formatting feedback',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-text-dim">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeUpload;
