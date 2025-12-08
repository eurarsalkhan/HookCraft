// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import router from './routes/index.js';
// import { PORT, VITE_FRONTEND_URL } from './config/env.js';
// import { generalLimiter } from './middlewares/rate.middleware.js';
// import { errorHandler } from './middlewares/error.middleware.js';




// const app = express();
// app.use(helmet());
// app.use(cors({ origin: VITE_FRONTEND_URL }));
// app.use(generalLimiter);


// // Body parsing: use raw for Stripe webhook, json otherwise
// app.use((req, res, next) => {
//   if (req.path === '/api/payments/webhook') {
//     // raw body for Stripe; handled per route
//     bodyParser.raw({ type: 'application/json' })(req, res, (err) => {
//       if (err) return next(err);
//       req.rawBody = req.body;
//       next();
//     });
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// app.use('/api', router);

// app.get('/health', (req, res) => res.json({ ok: true }));

// // Error handler
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Backend running on ${PORT}`);
// });
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import { PORT, VITE_FRONTEND_URL } from './config/env.js';
import { generalLimiter } from './middlewares/rate.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: VITE_FRONTEND_URL }));
app.use(generalLimiter);
app.use(bodyParser.json());

app.use('/api', router);

app.get('/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
