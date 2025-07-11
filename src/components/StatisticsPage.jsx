import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('/api/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      <Grid container spacing={2}>
        {stats.map((entry, idx) => (
          <Grid item xs={12} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6"><strong>Short URL:</strong> {entry.shortUrl}</Typography>
                <Typography><strong>Original:</strong> {entry.longUrl}</Typography>
                <Typography><strong>Clicks:</strong> {entry.clicks}</Typography>
                <Typography><strong>Created:</strong> {entry.createdAt}</Typography>
                <Typography><strong>Expires:</strong> {entry.expiresAt}</Typography>
                <Typography variant="subtitle2" sx={{ marginTop: 1 }}>Click Details:</Typography>
                <List dense>
                  {entry.clickDetails.map((click, i) => (
                    <ListItem key={i}>
                      <ListItemText
                        primary={`Time: ${click.timestamp}`}
                        secondary={`Source: ${click.source}, Location: ${click.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StatisticsPage;
