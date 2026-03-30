import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Lock, Unlock, Calendar, FileText, Download, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const CapsuleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    fetchCapsule();
  }, [id]);

  useEffect(() => {
    if (!capsule || capsule.is_unlocked) return;

    const interval = setInterval(() => {
      const now = new Date();
      const unlock = new Date(capsule.unlock_date);
      const diff = unlock - now;

      if (diff <= 0) {
        setCountdown('Ready to unlock!');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  const fetchCapsule = async () => {
    try {
      const response = await axios.get(`${API_URL}/capsule/${id}`);
      setCapsule(response.data.capsule);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('This capsule is still locked and cannot be accessed yet.');
      } else {
        setError('Failed to load capsule');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    try {
      const response = await axios.post(`${API_URL}/capsule/${id}/unlock`);
      setCapsule(response.data.capsule);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to unlock capsule');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-dim">Loading capsule...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 text-center"
          >
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-text-dim mb-6">{error}</p>
            <Link to="/capsule-dashboard" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Capsules
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-dim">Capsule not found</div>
      </div>
    );
  }

  const isLocked = !capsule.is_unlocked && new Date() < new Date(capsule.unlock_date);
  const isReadyToUnlock = !capsule.is_unlocked && new Date() >= new Date(capsule.unlock_date);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/capsule-dashboard" className="text-text-dim hover:text-white flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Capsules
          </Link>
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{capsule.title}</h1>
                {capsule.is_unlocked ? (
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
                    <Unlock className="w-4 h-4" />
                    Unlocked
                  </span>
                ) : isReadyToUnlock ? (
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    Ready to Unlock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    Locked
                  </span>
                )}
              </div>
              {capsule.description && (
                <p className="text-text-dim">{capsule.description}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Locked State */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <Lock className="w-24 h-24 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">This Capsule is Sealed</h2>
            <p className="text-text-dim mb-8">
              Time remaining until unlock:
            </p>
            <div className="text-5xl font-bold text-primary mb-8 font-mono">
              {countdown}
            </div>
            <div className="flex items-center justify-center gap-2 text-text-dim">
              <Calendar className="w-5 h-5" />
              <span>Unlocks on {new Date(capsule.unlock_date).toLocaleString()}</span>
            </div>
          </motion.div>
        )}

        {/* Ready to Unlock */}
        {isReadyToUnlock && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <Clock className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Time's Up!</h2>
            <p className="text-text-dim mb-8">
              This capsule is ready to be unlocked. Click below to reveal its contents.
            </p>
            <button
              onClick={handleUnlock}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              Unlock Capsule
            </button>
          </motion.div>
        )}

        {/* Unlocked Content */}
        {capsule.is_unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Message */}
            {capsule.message && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Message from the Past
                </h3>
                <div className="bg-white/5 rounded-lg p-6 whitespace-pre-wrap text-text-dim leading-relaxed">
                  {capsule.message}
                </div>
              </div>
            )}

            {/* Files */}
            {capsule.files && capsule.files.length > 0 && (
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-4">Attached Files</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {capsule.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      download={file.name}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-text-dim text-sm">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Download className="w-5 h-5 text-text-dim" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Unlock Info */}
            <div className="text-center text-text-dim text-sm">
              <p>Unlocked on {new Date(capsule.unlocked_at).toLocaleString()}</p>
              <p>Originally sealed on {new Date(capsule.created_at).toLocaleString()}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CapsuleView;
