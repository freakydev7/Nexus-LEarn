import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Clock, Lock, Unlock, Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const CapsuleDashboard = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const response = await axios.get(`${API_URL}/capsule/my-capsules`);
      setCapsules(response.data.capsules || []);
    } catch (error) {
      console.error('Failed to fetch capsules:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (capsule) => {
    const now = new Date();
    const unlockDate = new Date(capsule.unlock_date);
    
    if (capsule.is_unlocked) {
      return (
        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1">
          <Unlock className="w-3 h-3" />
          Unlocked
        </span>
      );
    }
    
    if (now >= unlockDate) {
      return (
        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Ready to Unlock
        </span>
      );
    }
    
    return (
      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center gap-1">
        <Lock className="w-3 h-3" />
        Locked
      </span>
    );
  };

  const getCountdown = (unlockDate) => {
    const now = new Date();
    const unlock = new Date(unlockDate);
    const diff = unlock - now;
    
    if (diff <= 0) return 'Ready to unlock!';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">My Time Capsules</h1>
            <p className="text-text-dim">Preserve your memories for the future</p>
          </div>
          <Link to="/capsule-create" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Capsule
          </Link>
        </motion.div>

        {/* Capsules Grid */}
        {loading ? (
          <div className="text-center py-12 text-text-dim">Loading capsules...</div>
        ) : capsules.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capsules.map((capsule, index) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/capsule-view/${capsule.id}`}
                  className="glass-card p-6 block hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    {getStatusBadge(capsule)}
                    <ArrowRight className="w-5 h-5 text-text-dim group-hover:text-primary transition-colors" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {capsule.title}
                  </h3>
                  
                  <p className="text-text-dim text-sm mb-4 line-clamp-2">
                    {capsule.description || 'No description'}
                  </p>
                  
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Unlocks: {new Date(capsule.unlock_date).toLocaleDateString()}</span>
                  </div>
                  
                  {!capsule.is_unlocked && (
                    <div className="mt-3 pt-3 border-t border-white/10 text-primary text-sm">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {getCountdown(capsule.unlock_date)}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <Clock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">No Capsules Yet</h2>
            <p className="text-text-dim mb-6 max-w-md mx-auto">
              Create your first time capsule to preserve memories, messages, or files for your future self.
            </p>
            <Link to="/capsule-create" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Capsule
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CapsuleDashboard;
