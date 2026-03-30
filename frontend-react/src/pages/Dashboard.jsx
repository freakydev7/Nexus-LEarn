import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Clock, TrendingUp, Award, ArrowRight, Plus, Activity } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    resumesAnalyzed: 0,
    capsulesCreated: 0,
    lastActivity: null,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`);
      setStats(response.data.stats || { resumesAnalyzed: 0, capsulesCreated: 0 });
      setRecentActivity(response.data.recentActivity || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setStats({ resumesAnalyzed: 0, capsulesCreated: 0 });
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: FileText,
      title: 'Resumes Analyzed',
      value: stats.resumesAnalyzed,
      link: '/resume-upload',
      color: 'primary',
    },
    {
      icon: Clock,
      title: 'Time Capsules',
      value: stats.capsulesCreated,
      link: '/capsule-dashboard',
      color: 'purple',
    },
    {
      icon: TrendingUp,
      title: 'Profile Score',
      value: '85%',
      link: '#',
      color: 'green',
    },
    {
      icon: Award,
      title: 'Achievements',
      value: '3',
      link: '#',
      color: 'yellow',
    },
  ];

  const quickActions = [
    {
      icon: FileText,
      title: 'Analyze Resume',
      description: 'Get AI feedback on your resume',
      link: '/resume-upload',
    },
    {
      icon: Clock,
      title: 'Create Capsule',
      description: 'Preserve memories for the future',
      link: '/capsule-create',
    },
  ];

  const safeString = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, {safeString(user?.name) || 'Student'}!</h1>
          <p className="text-text-dim">Here's what's happening with your career tools</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link} className="glass-card p-6 block hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                  <ArrowRight className="w-5 h-5 text-text-dim" />
                </div>
                <div className="text-3xl font-bold mb-1">{safeString(stat.value)}</div>
                <div className="text-text-dim text-sm">{stat.title}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className="glass-card p-6 flex items-center gap-4 hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{action.title}</h3>
                    <p className="text-text-dim text-sm">{action.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-dim group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="glass-card p-6">
              {loading ? (
                <div className="text-center py-8 text-text-dim">Loading...</div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const ActivityIcon = activity?.icon || Activity;
                    return (
                      <div key={index} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <ActivityIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{safeString(activity?.title)}</p>
                          <p className="text-text-dim text-sm">{safeString(activity?.date)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text-dim mb-4">No recent activity</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Link to="/resume-upload" className="btn-primary text-sm inline-flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Analyze Resume
                    </Link>
                    <Link to="/capsule-create" className="btn-ghost text-sm inline-flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create Capsule
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
