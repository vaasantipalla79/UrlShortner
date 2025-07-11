import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ShortenedUrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('shortenedUrls') || '[]');
    setUrls(saved);
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>Shortened URLs</Typography>
      <List>
        {urls.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Short URL: ${item.shortUrl}`}
              secondary={
                <>
                  <div>Original: {item.longUrl}</div>
                  <div>Expires: {formatTime(item.expiresAt)}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShortenedUrlList;
