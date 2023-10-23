module.exports = {
    apps: [
      {
        name: 'Keepix Dashboard',
        script: 'npm',
        args: 'start',
        env: {
          HOST: '0.0.0.0',
          PORT: '80',
        },
      },
    ],
  };
  