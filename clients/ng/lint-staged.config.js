module.exports = {
  'projects/*/src/**/*.ts': ['tslint --fix -p tsconfig.json', 'git add'],
  'types/**/*.ts': ['tslint --fix -p tsconfig.json', 'git add'],
  'projects/*/e2e/**/*.ts': ['tslint --fix -p tsconfig.json', 'git add'],
  'shared/**/*.ts': ['tslint --fix -p tsconfig.json', 'git add'],
  'projects/*/src/**/*.scss': ['stylelint --fix', 'git add']
};
