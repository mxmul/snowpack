const fs = require('fs');
const path = require('path');
const {setupBuildTest} = require('../../test-utils');

const cwd = path.join(__dirname, 'build');

describe('test workspace linked packages', () => {
  beforeAll(() => {
    setupBuildTest(__dirname);
  });

  it('builds source files as expected', () => {
    const jsLoc = path.join(cwd, '_dist_', 'index.svelte.js');
    expect(fs.existsSync(jsLoc)).toBe(true); // file exists
    expect(fs.readFileSync(jsLoc, 'utf-8')).toContain(
      `../_snowpack/link/test-workspace-component/SvelteComponent.svelte.js`,
    ); // file has expected imports
    expect(fs.readFileSync(jsLoc, 'utf-8')).toContain(
      `../_snowpack/link/test-workspace-component/works-without-extension.js`,
    ); // file has expected imports
  });

  it('builds workspace package files as expected', () => {
    expect(
      fs.existsSync(
        path.join(
          cwd,
          '_snowpack',
          'link',
          'test-workspace-component',
          'SvelteComponent.svelte.js',
        ),
      ),
    ).toBe(true); // import exists
    expect(
      fs.existsSync(
        path.join(
          cwd,
          '_snowpack',
          'link',
          'test-workspace-component',
          'SvelteComponent.svelte.css.proxy.js',
        ),
      ),
    ).toBe(true); // import exists
  });
});
