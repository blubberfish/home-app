module.exports = {
  displayName: 'frontend-modules-cradle-baby-app',
  preset: '../../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../coverage/libs/frontend/modules/cradle-baby/app',
};
