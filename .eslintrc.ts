module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    'no-unused-vars': [
      2,
      {
        args: 'none',
      },
    ],
  },
};
