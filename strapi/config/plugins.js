module.exports = () => ({
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 50,
      maxLimit: 200,
      depthLimit: 8,
    },
  },
});
