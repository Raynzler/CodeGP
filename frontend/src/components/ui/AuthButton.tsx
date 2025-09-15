'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useState } from 'react';
import Auth from '@/components/Auth';

export default function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (loading) {
    return <div className="auth-button">Loading...</div>;
  }

  if (user) {
    return (
      <div className="auth-info" style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        border: '1px solid #ff0000',
        zIndex: 1000
      }}>
        <span style={{ color: '#fff' }}>🏎️ {user.email}</span>
        <button
          onClick={signOut}
          style={{
            background: '#ff0000',
            border: 'none',
            color: '#fff',
            padding: '0.25rem 0.75rem',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Pit Stop (Logout)
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="auth-button"
        data-auth-modal="true"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          background: 'linear-gradient(45deg, #ff0000, #ff6600)',
          border: 'none',
          color: '#fff',
          padding: '0.5rem 1.5rem',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 1000
        }}
      >
        🏁 Join Race
      </button>

      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '-2rem',
                right: 0,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <Auth />
          </div>
        </div>
      )}
    </>
  );
}