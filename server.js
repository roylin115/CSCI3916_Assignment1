const express = require('express');

const app = express();

// Capture *all* content types as raw bytes
app.use(express.raw({ type: '*/*' }));

app.post('/', (req, res) => {
  const contentType = req.headers['content-type'] || 'text/plain';

  // Preserve original content-type (or default)
  res.setHeader('Content-Type', contentType);

  // Echo raw body unchanged
  res.send(req.body || '');
});

// Only listen when run directly (not during tests)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Echo server listening on port ${PORT}`);
  });
}

module.exports = app;
