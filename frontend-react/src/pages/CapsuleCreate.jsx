import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, FileText, Image, Lock, ArrowRight, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const CapsuleCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unlockDate: '',
    message: '',
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }
    setFormData({ ...formData, files });
    setError('');
  };

  const removeFile = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.unlockDate) {
      setError('Title and unlock date are required');
      setLoading(false);
      return;
    }

    const unlockDate = new Date(formData.unlockDate);
    const now = new Date();
    if (unlockDate <= now) {
      setError('Unlock date must be in the future');
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('unlock_date', formData.unlockDate);
    data.append('message', formData.message);
    formData.files.forEach((file) => {
      data.append('files', file);
    });

    try {
      const response = await axios.post(`${API_URL}/capsule`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/capsule-dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create capsule');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Capsule Created!</h1>
          <p className="text-text-dim">
            Your time capsule has been sealed and will unlock on the specified date.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Create Time Capsule</h1>
          <p className="text-text-dim">Preserve memories for your future self</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Capsule Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., My 2026 Goals"
                required
                className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white placeholder-text-dim focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of this capsule"
                className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white placeholder-text-dim focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Unlock Date *
              </label>
              <input
                type="datetime-local"
                name="unlockDate"
                value={formData.unlockDate}
                onChange={handleChange}
                required
                className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white placeholder-text-dim focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Message to Future Self
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write a message for your future self..."
                className="w-full bg-background border border-white/10 rounded-lg py-3 px-4 text-white placeholder-text-dim focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Attach Files (Optional, max 5)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="file-upload"
                  className="block w-full bg-background border border-dashed border-white/20 rounded-lg py-8 px-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="text-text-dim">
                    Click to upload files or drag and drop
                  </div>
                </label>
              </div>

              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-dim">
                Your capsule will be encrypted and can only be accessed after the unlock date.
                Make sure to remember this date!
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                'Creating Capsule...'
              ) : (
                <>
                  <Clock className="w-5 h-5" />
                  Seal Capsule
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CapsuleCreate;
