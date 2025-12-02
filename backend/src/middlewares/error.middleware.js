export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.message === 'INSUFFICIENT_CREDITS') {
    return res.status(402).json({ error: 'Not enough credits. Please purchase more.' });
  }
  return res.status(500).json({ error: 'Server error' });
}
