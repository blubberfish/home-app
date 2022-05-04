module.exports = {
  displayName: 'frontend-pages-cradle-baby-register',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/frontend/pages/cradle-baby-register',
};
