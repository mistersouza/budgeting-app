const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const cors = require('cors');

const envelopeRoutes = require('./routes/envelopes');

const app = express(); 

require('dotenv').config(); 
app.use(bodyParser.json({ limit: '30mb', extended: true })); 
app.use(cors());


app.use('/envelopes', envelopeRoutes); 

const PORT = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => {
    console.log(`Server set up and running on port ${PORT}`);
}))
.catch(error => console.log(`${error} did not connect`));