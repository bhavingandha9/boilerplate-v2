  module.exports = {
    "extends": "standard",
    "env": {
      "node": true,
      "es6": true,
      "browser": true
    },
    "rules": {
      "space-before-function-paren": ["error", {
        "anonymous": "ignore",
        "named": "ignore",
        "asyncArrow": "ignore"
      }],
    }
  };