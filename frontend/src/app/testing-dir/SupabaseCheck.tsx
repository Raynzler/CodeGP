'use client';

import { useState, useEffect } from 'react';

export default function TestSupabasePage() {
  const [status, setStatus] = useState('Checking Supabase...');

  useEffect(() => {
    try {
      // Don't import supabase yet, just check if env vars exist
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setStatus('Missing Supabase environment variables!');
      } else {
        setStatus(`Supabase URL: ${url.substring(0, 20)}...`);
      }
    } catch (error) {
      setStatus(`Error: ${error}`);
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Supabase Test</h1>
      <p>{status}</p>
    </div>
  );
}