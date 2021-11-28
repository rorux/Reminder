'use strict';
const path = require('path');

jest.mock('fs');

process.argv.push('--name', 'TestComponent');
const { componentName, contentIndex, contentComponent } = require('..');
const mockFiles = require('fs').__mockFiles();

describe('Testing of componentCreator', () => {
  it('Should generate right content', () => {
    const expectedComponentName = 'TestComponent';
    const expectedContentIndex = `import TestComponent from './TestComponent';

export default TestComponent;
`;
    const expectedContentComponent = `import React from 'react';
import './style.scss';

const TestComponent = () => {
  return <div className="testcomponent"></div>;
};

export default TestComponent;
`;

    expect(componentName).toBe(expectedComponentName);
    expect(contentIndex).toBe(expectedContentIndex);
    expect(contentComponent).toBe(expectedContentComponent);
  });

  const componentDir = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'src',
    'components',
    componentName
  );
  const receivedComponentDir = Object.keys(mockFiles)[0];

  it('Should create files in the correct directory', () => {
    expect(receivedComponentDir).toBe(componentDir);
  });

  it('Should create files with correct content', () => {
    expect(mockFiles[componentDir]['style.scss']).toBe('');
    expect(mockFiles[componentDir]['index.ts']).toBe(contentIndex);
    expect(mockFiles[componentDir][`${componentName}.tsx`]).toBe(contentComponent);
  });
});
