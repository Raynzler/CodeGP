'use client';


import Auth from '../../components/Auth';

export default function TestAuthPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#000' 
    }}>
      <Auth />
    </div>
  );
}