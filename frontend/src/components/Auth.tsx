import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            }
          }
        });
        
        if (error) throw error;
        setMessage('Check your email for confirmation!');
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        setMessage('Welcome back, racer!');
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container" style={{ 
      maxWidth: '400px', 
      margin: '0 auto',
      padding: '2rem',
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '10px',
      border: '2px solid #ff0000'
    }}>
      <h2 style={{ 
        background: 'linear-gradient(45deg, #ff0000, #ffff00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        {isSignUp ? '🏁 Join the Grid' : '🏎️ Back to Racing'}
      </h2>

      <form onSubmit={handleAuth}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Racing Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid #333',
              borderRadius: '5px',
              color: '#fff'
            }}
          />
        )}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid #333',
            borderRadius: '5px',
            color: '#fff'
          }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid #333',
            borderRadius: '5px',
            color: '#fff'
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(45deg, #ff0000, #ff6600)',
            border: 'none',
            borderRadius: '5px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Loading...' : (isSignUp ? 'Start Your Engine' : 'Race!')}
        </button>
      </form>

      <button
        onClick={signInWithGitHub}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginTop: '1rem',
          background: '#333',
          border: 'none',
          borderRadius: '5px',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        🏁 Sign in with GitHub
      </button>

      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
        {isSignUp ? 'Already racing?' : 'New to the track?'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ff0000',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '0.5rem'
          }}
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>

      {message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: message.includes('error') ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)',
          border: `1px solid ${message.includes('error') ? '#ff0000' : '#00ff00'}`,
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}