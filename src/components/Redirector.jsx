import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Redirector = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    const now = Date.now();
    const match = saved.find((u) => u.shortcode === shortcode);

    if (match) {
      if (match.expiresAt && match.expiresAt < now) {
        alert('This link has expired.');
      } else {
        window.location.href = match.longUrl;
      }
    } else {
      alert('Shortcode not found!');
    }
  }, [shortcode]);

  return <div style={{ padding: 20 }}>Redirecting...</div>;
};

export default Redirector;
