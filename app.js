 const express = require('express')
 const app = express()
 app.use(express.json())

 const {configs} = require('./utils/config');
 const authRoutes = require('./routes/auth');
 const userRoutes = require('./routes/users');

 app.use('/auth', authRoutes);
 app.use('/users', userRoutes);

app.listen(configs.PORT, () => {
    console.log(`Server is  running on port ${configs.PORT}`)
});