const express = require('express');
const app = express();

app.use(express.json());
app.use('/image', express.static('uploads'));

const courseRoute = require('./routes/course');
const userRoute = require('./routes/user')
const imageRoute = require('./routes/images')

app.use('/api', courseRoute);
app.use('/api', userRoute)
app.use('/image', imageRoute)

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
