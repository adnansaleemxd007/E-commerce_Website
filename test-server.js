const express = require('express');
const app = express();
app.use(express.json());

const orderRoutes = require('./backend/routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.listen(5001, () => {
  console.log('Test server running on 5001');
});
