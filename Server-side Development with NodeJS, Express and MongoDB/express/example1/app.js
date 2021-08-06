const express = require('express');
const morgan = require('morgan');
const dishRouter = require('./route/dishRouter');
const promoRouter = require('./route/promoRouter');
const leaderRouter = require('./route/leaderRouter');

const app = express();
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('home page');
});
// dishes
app.use('/dishes', dishRouter);
app.use('/prmotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(3000);
