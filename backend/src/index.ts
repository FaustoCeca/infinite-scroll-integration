import express from 'express';
import cors from 'cors';

import productsRoutes from './routes/products.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productsRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});