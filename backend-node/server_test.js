import express from 'express';
const app = express();
const PORT = 4102;
app.get('/', (req, res) => res.send('Printf Clean Server OK'));
app.listen(PORT, '0.0.0.0', () => console.log('Printf Clean Server on port ' + PORT));
