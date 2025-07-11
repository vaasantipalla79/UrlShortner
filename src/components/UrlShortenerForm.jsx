import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const navigate = useNavigate();

  const getExisting = () =>
    JSON.parse(localStorage.getItem('shortenedUrls') || '[]');

  const isShortcodeTaken = (code) => {
    return getExisting().some((entry) => entry.shortcode === code);
  };

  const generateUniqueCode = () => {
    let code;
    do {
      code = Math.random().toString(36).substring(2, 8);
    } while (isShortcodeTaken(code));
    return code;
  };

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = () => {
    const now = Date.now();
    const existing = getExisting();
    const newEntries = [];

    for (const urlData of urls) {
      const longUrl = urlData.longUrl.trim();
      const validity = urlData.validity;
      const customCode = urlData.shortcode.trim();

      // Validation 1: Original URL format
      if (!/^https?:\/\/.+\..+/.test(longUrl)) {
        alert(`Invalid URL: "${longUrl}"`);
        return;
      }

      // Validation 2: Validity (if present)
      if (validity && (isNaN(validity) || validity <= 0)) {
        alert(`Invalid validity value: "${validity}"`);
        return;
      }

      // Validation 3: Shortcode
      const code = customCode || generateUniqueCode();
      if (customCode && isShortcodeTaken(customCode)) {
        alert(`Custom code "${customCode}" is already taken`);
        return;
      }

      if (code.length > 15) {
        alert(`Shortcode too long (max 15 chars): "${code}"`);
        return;
      }

      const expiresAt = validity ? now + parseInt(validity) * 60 * 1000 : null;

      newEntries.push({
        longUrl,
        shortcode: code,
        validity,
        shortUrl: `https://mits.link/port/${code}`,
        createdAt: now,
        expiresAt,
      });
    }

    localStorage.setItem('shortenedUrls', JSON.stringify([...existing, ...newEntries]));
    navigate('/list');
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((entry, idx) => (
        <Grid container spacing={2} key={idx} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Original URL"
              fullWidth
              required
              onChange={(e) => handleChange(idx, 'longUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Validity (mins)"
              type="number"
              fullWidth
              onChange={(e) => handleChange(idx, 'validity', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Custom Code (optional)"
              fullWidth
              onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={() => setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }])}>
        Add URL
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten
      </Button>
    </div>
  );
};

export default UrlShortenerForm;
