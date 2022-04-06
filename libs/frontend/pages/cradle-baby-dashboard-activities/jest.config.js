module.exports = {
  displayName: 'frontend-pages-cradle-baby-dashboard-activities',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../coverage/libs/frontend/pages/cradle-baby-dashboard-activities',
};
