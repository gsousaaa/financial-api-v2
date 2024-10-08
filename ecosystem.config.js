module.exports = {
    apps: [
      {
        name: 'financial-api',
        script: './build/app.js',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'dev',
          PORT: process.env.PORT || 3003,
        },
      },
    ],
  };
  