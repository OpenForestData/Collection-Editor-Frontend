module.exports = {
  name: 'collection-editor-frontend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/collection-editor-frontend',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
