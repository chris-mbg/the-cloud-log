module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1d00d7bc341d33349db5a5eaec68baf6'),
  },
});
