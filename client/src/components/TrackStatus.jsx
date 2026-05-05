import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

const TrackStatus = () => {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/complaints/${trackingId}`);
      setResult(response.data);
    } catch (err) {
      setError('Complaint not found or invalid Tracking ID. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={32} style={{ color: 'var(--warning)' }} />;
      case 'In Progress': return <RefreshCw size={32} style={{ color: 'var(--primary)' }} className="animate-spin" />;
      case 'Resolved': return <CheckCircle2 size={32} style={{ color: 'var(--success)' }} />;
      default: return <Clock size={32} />;
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <motion.div 
        className="glass" 
        style={{ padding: '2.5rem', marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '1.2rem', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              style={{ paddingLeft: '3rem', marginBottom: 0, height: '3rem' }}
              placeholder="Enter your Tracking ID (e.g. 64b8f...)"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.trim())}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '0 1.5rem', height: '3rem' }}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>
        {error && <p style={{ color: 'var(--danger)', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      </motion.div>

      {result && (
        <motion.div 
          className="glass" 
          style={{ padding: '2.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%' }}>
              {getStatusIcon(result.status)}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{result.status}</h2>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Current Status</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Issue Description</p>
              <p style={{ margin: 0, fontWeight: 500 }}>{result.text}</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem 0', fontSize: '0.8rem' }}>Assigned Department</p>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--primary)' }}>{result.department}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem 0', fontSize: '0.8rem' }}>Category</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{result.category}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
               <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem 0', fontSize: '0.8rem' }}>Priority</p>
                <p style={{ margin: 0, fontWeight: 600, color: result.priority === 'High' ? 'var(--danger)' : result.priority === 'Medium' ? 'var(--warning)' : 'var(--success)' }}>
                  {result.priority}
                </p>
              </div>
               <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-muted)', margin: '0 0 0.25rem 0', fontSize: '0.8rem' }}>Submitted On</p>
                <p style={{ margin: 0, fontWeight: 600 }}>{new Date(result.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TrackStatus;
