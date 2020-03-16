# TODO
Research --emitDeclarationOnly

# Transform the Project to ES6+ and create CJS bundels
- [ ] Adjust package.json to reflect our intend to move to es6 type: module
- [ ] Adjust every js file to use import not require
- [ ] test and run this with node 13+
- [ ] Configure Rollup to create 2 packages 1x esm 1x cjs
- [ ] ship the cjs bundle with devDependency esm bundle and reference that inside the package.json to allow packagers to use it
- [ ] Add Automated Testing via Jenkins.
- [ ] github releases for packages.