module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    'eol-last': 'error',
    'no-shadow': [ 'error', { builtinGlobals:true, allow:['err'] } ],
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unused-expressions': 'error',
    'semi': [ 'error', 'always' ],
  },
  globals: {
    html: false,
    sql: false,
  },
};
