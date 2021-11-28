const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

const args = minimist(process.argv);

const componentName = args.name;

const contentIndex = `import ${componentName} from './${componentName}';

export default ${componentName};
`;

const contentComponent = `import React from 'react';
import './style.scss';

const ${componentName} = () => {
  return <div className="${componentName.toLowerCase()}"></div>;
};

export default ${componentName};
`;

fs.mkdirSync(path.resolve(__dirname, '..', '..', 'src', 'components', componentName));

fs.writeFileSync(
  path.resolve(__dirname, '..', '..', 'src', 'components', componentName, 'style.scss'),
  ''
);

fs.writeFileSync(
  path.resolve(__dirname, '..', '..', 'src', 'components', componentName, 'index.ts'),
  contentIndex
);

fs.writeFileSync(
  path.resolve(__dirname, '..', '..', 'src', 'components', componentName, `${componentName}.tsx`),
  contentComponent
);

module.exports = { componentName, contentIndex, contentComponent };
