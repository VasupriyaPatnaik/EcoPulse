const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.handler = async (event, context) => {
  // Set context to prevent lambda from hanging
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDB();
    
    const dbStatus = mongoose.connections[0].readyState === 1 ? 'Connected' : 'Disconnected';
    const envCheck = {
      mongodb: !!process.env.MONGODB_URI,
      jwt: !!process.env.JWT_SECRET,
      email: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        status: 'OK',
        message: 'EcoPulse API is running on Netlify Functions!',
        database: dbStatus,
        environment: envCheck,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 'Error',
        message: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
