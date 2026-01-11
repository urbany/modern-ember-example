# Modern Ember Example - Boilerplate Documentation

This document contains information specific to maintaining and developing this boilerplate template. This file will NOT be included in new projects created from this template.

## Overview

This is a boilerplate template for creating modern Ember.js applications with:

- Ember 6.8.x (Octane edition)
- TypeScript + Glint v2
- Vite + Embroider build system
- Tailwind CSS v4 + daisyUI
- WarpDrive (EmberData 5.x)
- Pre-built notification and modal systems
- Theme management system

## Initialization Script

The `init-project.cjs` script is the core tool for bootstrapping new projects from this template.

### What It Does

1. **Renames project identifiers** across all files:
   - Replaces `modern-ember-example` with the new project name
   - Updates imports, module prefixes, and configuration

2. **Replaces documentation files** with clean templates:
   - `README.md` → from `README.template.md`
   - `CLAUDE.md` → from `CLAUDE.template.md`
   - Templates use `PROJECT_NAME` placeholder which gets replaced

3. **Resets package.json metadata**:
   - Version set to `0.0.0`
   - Clears description, author
   - Updates repository and homepage URLs

4. **Manages git history**:
   - Optionally removes `.git` directory
   - Optionally initializes fresh git repository
   - Creates initial commit

5. **Sets up development environment**:
   - Installs dependencies via pnpm
   - Sets up git hooks with simple-git-hooks

### Files Updated by Script

The script updates these files (see `FILES_TO_UPDATE` in `init-project.cjs`):

**Configuration:**

- `package.json`
- `tsconfig.json`
- `config/environment.js`
- `app/config/environment.ts`
- `.github/workflows/deploy.yml`

**Application Code:**

- `app/router.ts`
- `app/app.ts`
- All service files with imports
- All template files with imports

**Tests:**

- `tests/test-helper.ts`
- All test files with imports

**Documentation:**

- `CLAUDE.md` (replaced from template)
- Workspace file renamed

## Template Files

### README.template.md

Generic README for new projects. Contains:

- Installation instructions
- Development commands
- Tech stack overview
- Key features documentation (notifications, modals, icons, etc.)
- Links to relevant documentation

Uses `PROJECT_NAME` placeholder for project name.

### CLAUDE.template.md

Generic Claude Code instructions for new projects. Contains:

- Project structure
- Development commands
- Build system architecture
- Data layer documentation
- Key features and services

Uses `PROJECT_NAME` placeholder for project name.

## Maintaining the Boilerplate

### Adding New Features

When adding new features to the boilerplate:

1. **Add the feature** to the application as normal
2. **Document it** in both `README.md` and `CLAUDE.md` (current boilerplate docs)
3. **Update templates** - Add documentation to:
   - `README.template.md` (user-facing docs)
   - `CLAUDE.template.md` (Claude Code instructions)
4. **Update init-project.cjs** if the feature:
   - Adds new files with project name references
   - Requires new configuration
   - Needs special initialization logic

### Updating Dependencies

1. Update dependencies in `package.json`
2. Test thoroughly
3. Update version numbers in documentation:
   - `README.md`
   - `CLAUDE.md`
   - `README.template.md`
   - `CLAUDE.template.md`

### Testing the Initialization Script

Always test changes to the initialization script:

```bash
# Create a test directory
mkdir ../test-init
cd ../test-init

# Copy the boilerplate (or clone it fresh)
cp -r ../modern-ember-example .

# Test with dry-run
node init-project.cjs test-app --dry-run

# Verify all expected changes appear in output
# Check that file counts match expectations

# Test actual execution
node init-project.cjs test-app --skip-install

# Verify:
# - All files updated correctly
# - README and CLAUDE.md replaced with templates
# - Project name appears correctly everywhere
# - No references to "modern-ember-example" remain
```

Search for old project name:

```bash
grep -r "modern-ember-example" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist
```

Should only find references in:

- `init-project.cjs` (OLD_PROJECT_NAME constant)
- Documentation files (this file, main README.md, etc.)

### Files That Should NOT Be Updated

These files remain specific to the boilerplate:

- `init-project.cjs` (the script itself)
- `README.template.md` (template, not project README)
- `CLAUDE.template.md` (template, not project CLAUDE.md)
- `docs/BOILERPLATE.md` (this file)

## Project Name References

The project name appears in these locations:

1. **Module paths** - TypeScript imports use the module prefix

   ```typescript
   import type Notifications from 'PROJECT_NAME/services/notifications';
   ```

2. **Configuration** - Build and environment config

   ```javascript
   modulePrefix: 'PROJECT_NAME';
   ```

3. **Path mappings** - TypeScript path resolution

   ```json
   "paths": {
     "PROJECT_NAME/*": ["./app/*"]
   }
   ```

4. **Meta loaders** - Embroider config loading
   ```typescript
   loadConfigFromMeta('PROJECT_NAME');
   ```

## Common Tasks

### Adding a New File Type to Rename

If you add new files that import from the project:

1. Open `init-project.cjs`
2. Add the file path to the `FILES_TO_UPDATE` array
3. Test with dry-run to verify it's updated

### Updating the Template Documentation

When documenting a new feature:

1. Add detailed docs to `README.md` (for boilerplate maintenance)
2. Add concise, essential docs to `README.template.md` (for new projects)
3. Add technical details to `CLAUDE.md` (for working on the boilerplate)
4. Add technical details to `CLAUDE.template.md` (for working on new projects)

### Changing the Default Configuration

When changing defaults (e.g., daisyUI themes, notification positioning):

1. Make the change in the application code
2. Update documentation to reflect new defaults
3. Consider if `init-project.cjs` needs updates
4. Test initialization to ensure defaults work in fresh projects

## GitHub Workflow

The `.github/workflows/deploy.yml` file deploys to GitHub Pages:

- Triggered on push to main
- Sets `VITE_BASE_PATH` for proper asset loading
- Deploys to `https://username.github.io/PROJECT_NAME/`

The initialization script updates the `VITE_BASE_PATH` line to use the new project name.

## Best Practices

1. **Keep templates clean** - Templates should be generic, not boilerplate-specific
2. **Test thoroughly** - Always test the init script after changes
3. **Document everything** - Both boilerplate and template docs need updates
4. **Version consistently** - Keep dependency versions in sync across docs
5. **Use PROJECT_NAME placeholder** - Don't hardcode project names in templates

## Troubleshooting

### Script Fails to Update File

- Check that the file exists
- Verify the file path in `FILES_TO_UPDATE`
- Ensure the old project name appears in the file
- Check file permissions

### Template Not Replacing Correctly

- Verify `PROJECT_NAME` placeholder exists in template
- Check `replaceReadmeFromTemplate()` or equivalent function
- Ensure template file exists in project root

### Tests Fail After Initialization

- Check that all import paths were updated
- Verify module prefix in config files
- Look for hardcoded "modern-ember-example" references

## Future Improvements

Potential enhancements to consider:

1. **Interactive feature selection** - Let users choose which features to include
2. **Remove demo routes** - Option to strip out `/demo` routes
3. **Backend template** - Option to configure API endpoint
4. **Package manager choice** - Support npm/yarn/pnpm selection
5. **License selection** - Prompt for license type
6. **Git remote setup** - Automatically configure git remote
7. **GitHub CLI integration** - Create GitHub repo automatically

## Resources

- [Ember.js Guides](https://guides.emberjs.com/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [daisyUI Components](https://daisyui.com/)
- [WarpDrive Docs](https://github.com/emberjs/data/blob/main/guides/index.md)
