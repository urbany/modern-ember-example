#!/usr/bin/env node

/**
 * Project Initialization Script
 *
 * This script helps initialize a new project from this boilerplate by:
 * - Renaming all instances of "modern-ember-example" to your new project name
 * - Replacing README.md with a clean template (README.template.md)
 * - Replacing CLAUDE.md with a clean template (CLAUDE.template.md)
 * - Renaming the .code-workspace file
 * - Optionally removing the .git directory and initializing a new repository
 * - Optionally installing dependencies with pnpm
 * - Resetting package.json metadata
 *
 * Usage:
 *   node init-project.cjs <new-project-name> [options]
 *   node init-project.cjs --interactive
 *
 * Options:
 *   --dry-run         Show what would be changed without making changes
 *   --keep-git        Keep the existing .git directory
 *   --init-git        Initialize a new git repository (only if .git is removed)
 *   --skip-install    Skip running pnpm install
 *   --force           Run even if there are uncommitted changes
 *   --interactive, -i Prompt for all options
 *   --help, -h        Show this help message
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Read current project info from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
);
const OLD_PROJECT_NAME = packageJson.name;
const OLD_GITHUB_REPO = packageJson.repository?.url
  ? packageJson.repository.url
      .replace(/^https?:\/\/github\.com\//, '')
      .replace(/\.git$/, '')
  : null;

// Files that need project name replacement
const FILES_TO_UPDATE = [
  'package.json',
  'tsconfig.json',
  'config/environment.js',
  'app/config/environment.ts',
  'app/router.ts',
  '.github/workflows/deploy.yml',
  // Test files
  'tests/test-helper.ts',
  'tests/unit/utils/camel-case-keys-test.ts',
  'tests/unit/utils/local-storage-test.ts',
  'tests/integration/helpers/tw-test.gts',
  'tests/integration/components/icon-test.gts',
  // App files
  'app/app.ts',
  'app/components/theme-selector.gts',
];

class ProjectInitializer {
  constructor(options = {}) {
    this.newProjectName = options.projectName;
    this.dryRun = options.dryRun || false;
    this.keepGit = options.keepGit || false;
    this.initGit = options.initGit || false;
    this.skipInstall = options.skipInstall || false;
    this.force = options.force || false;
    this.interactive = options.interactive || false;
    this.projectRoot = process.cwd();
    this.changes = [];
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logChange(action, target, detail = '') {
    const prefix = this.dryRun ? '[DRY RUN]' : '';
    const detailStr = detail ? ` ${colors.dim}(${detail})${colors.reset}` : '';
    this.log(
      `${prefix} ${action}: ${colors.cyan}${target}${colors.reset}${detailStr}`,
      'green'
    );
    this.changes.push({ action, target, detail });
  }

  error(message) {
    this.log(`✗ ${message}`, 'red');
  }

  success(message) {
    this.log(`✓ ${message}`, 'green');
  }

  warn(message) {
    this.log(`⚠ ${message}`, 'yellow');
  }

  info(message) {
    this.log(`ℹ ${message}`, 'blue');
  }

  async prompt(question, defaultValue = '') {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      const defaultText = defaultValue ? ` [${defaultValue}]` : '';
      rl.question(
        `${colors.cyan}${question}${defaultText}: ${colors.reset}`,
        (answer) => {
          rl.close();
          resolve(answer.trim() || defaultValue);
        }
      );
    });
  }

  async promptYesNo(question, defaultValue = true) {
    const defaultText = defaultValue ? 'Y/n' : 'y/N';
    const answer = await this.prompt(`${question} (${defaultText})`);
    if (!answer) return defaultValue;
    return answer.toLowerCase().startsWith('y');
  }

  validateProjectName(name) {
    // NPM package name rules
    if (!name) {
      return 'Project name is required';
    }
    if (name.length > 214) {
      return 'Project name must be 214 characters or less';
    }
    if (name.startsWith('.') || name.startsWith('_')) {
      return 'Project name cannot start with . or _';
    }
    if (!/^[a-z0-9@/_-]+$/.test(name)) {
      return 'Project name can only contain lowercase letters, numbers, @, /, -, and _';
    }
    if (name === OLD_PROJECT_NAME) {
      return 'New project name cannot be the same as the old name';
    }
    return null;
  }

  checkPrerequisites() {
    this.info('Checking prerequisites...');

    // Check if we're in the project root
    if (!fs.existsSync(path.join(this.projectRoot, 'package.json'))) {
      this.error(
        'package.json not found. Please run this script from the project root.'
      );
      return false;
    }

    // Check for uncommitted changes
    if (
      !this.force &&
      !this.dryRun &&
      fs.existsSync(path.join(this.projectRoot, '.git'))
    ) {
      try {
        const gitStatus = execSync('git status --porcelain', {
          encoding: 'utf8',
          cwd: this.projectRoot,
        });
        if (gitStatus.trim()) {
          this.error('You have uncommitted changes in your git repository.');
          this.warn(
            'Please commit or stash your changes before running this script.'
          );
          this.info('Or use --force flag to run anyway (not recommended).');
          return false;
        }
      } catch {
        // If git command fails, continue (might not be a git repo)
      }
    }

    // Check if pnpm is installed (only if we're going to install)
    if (!this.skipInstall) {
      try {
        execSync('pnpm --version', { stdio: 'ignore' });
      } catch {
        this.error(
          'pnpm is not installed. Install it with: npm install -g pnpm'
        );
        this.warn('Or use --skip-install flag to skip dependency installation');
        return false;
      }
    }

    // Validate project name
    const error = this.validateProjectName(this.newProjectName);
    if (error) {
      this.error(error);
      return false;
    }

    this.success('Prerequisites check passed');
    return true;
  }

  replaceInFile(filePath, replacements) {
    const fullPath = path.join(this.projectRoot, filePath);

    if (!fs.existsSync(fullPath)) {
      this.warn(`File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    for (const [oldValue, newValue] of replacements) {
      if (content.includes(oldValue)) {
        content = content.replace(new RegExp(oldValue, 'g'), newValue);
        modified = true;
      }
    }

    if (modified) {
      if (!this.dryRun) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
      return true;
    }

    return false;
  }

  updateFiles() {
    this.info('Updating project files...');

    const replacements = [
      [OLD_PROJECT_NAME, this.newProjectName],
      [OLD_GITHUB_REPO, `your-username/${this.newProjectName}`],
    ];

    for (const file of FILES_TO_UPDATE) {
      if (this.replaceInFile(file, replacements)) {
        this.logChange(
          'Updated',
          file,
          `${OLD_PROJECT_NAME} → ${this.newProjectName}`
        );
      }
    }
  }

  updatePackageJson() {
    const packagePath = path.join(this.projectRoot, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // Reset metadata
    pkg.name = this.newProjectName;
    pkg.version = '0.0.0';
    pkg.description = '';
    pkg.author = '';
    pkg.repository = {
      type: 'git',
      url: `https://github.com/your-username/${this.newProjectName}.git`,
    };
    pkg.homepage = `https://github.com/your-username/${this.newProjectName}`;

    if (!this.dryRun) {
      fs.writeFileSync(
        packagePath,
        JSON.stringify(pkg, null, 2) + '\n',
        'utf8'
      );
    }

    this.logChange(
      'Reset metadata',
      'package.json',
      'version, description, author, repository, homepage'
    );
  }

  renameWorkspaceFile() {
    const oldPath = path.join(
      this.projectRoot,
      `${OLD_PROJECT_NAME}.code-workspace`
    );
    const newPath = path.join(
      this.projectRoot,
      `${this.newProjectName}.code-workspace`
    );

    if (!fs.existsSync(oldPath)) {
      this.warn(`Workspace file not found: ${OLD_PROJECT_NAME}.code-workspace`);
      return;
    }

    if (!this.dryRun) {
      fs.renameSync(oldPath, newPath);
    }

    this.logChange(
      'Renamed',
      `${OLD_PROJECT_NAME}.code-workspace`,
      `→ ${this.newProjectName}.code-workspace`
    );
  }

  replaceReadmeFromTemplate() {
    const templatePath = path.join(this.projectRoot, 'README.template.md');
    const readmePath = path.join(this.projectRoot, 'README.md');

    if (!fs.existsSync(templatePath)) {
      this.warn('README.template.md not found, skipping README replacement');
      return;
    }

    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace PROJECT_NAME placeholder with actual project name
    content = content.replace(/PROJECT_NAME/g, this.newProjectName);

    if (!this.dryRun) {
      fs.writeFileSync(readmePath, content, 'utf8');
    }

    this.logChange(
      'Replaced',
      'README.md',
      'from template with project-specific content'
    );
  }

  replaceClaudeFromTemplate() {
    const templatePath = path.join(this.projectRoot, 'CLAUDE.template.md');
    const claudePath = path.join(this.projectRoot, 'CLAUDE.md');

    if (!fs.existsSync(templatePath)) {
      this.warn('CLAUDE.template.md not found, skipping CLAUDE.md replacement');
      return;
    }

    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace PROJECT_NAME placeholder with actual project name
    content = content.replace(/PROJECT_NAME/g, this.newProjectName);

    if (!this.dryRun) {
      fs.writeFileSync(claudePath, content, 'utf8');
    }

    this.logChange(
      'Replaced',
      'CLAUDE.md',
      'from template with project-specific content'
    );
  }

  replaceIndexFromTemplate() {
    const templatePath = path.join(
      this.projectRoot,
      'app/templates/index.template.gts'
    );
    const indexPath = path.join(this.projectRoot, 'app/templates/index.gts');

    if (!fs.existsSync(templatePath)) {
      this.warn(
        'app/templates/index.template.gts not found, skipping index.gts replacement'
      );
      return;
    }

    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace PROJECT_NAME placeholder with actual project name
    content = content.replace(/PROJECT_NAME/g, this.newProjectName);

    if (!this.dryRun) {
      fs.writeFileSync(indexPath, content, 'utf8');
    }

    this.logChange(
      'Replaced',
      'app/templates/index.gts',
      'from template with simple landing page'
    );

    // Delete header component since it's been inlined into index.gts
    const headerPath = path.join(this.projectRoot, 'app/components/header.gts');
    if (fs.existsSync(headerPath)) {
      if (!this.dryRun) {
        fs.unlinkSync(headerPath);
      }
      this.logChange(
        'Deleted',
        'app/components/header.gts',
        'inlined into index.gts'
      );
    }
  }

  replaceApplicationFromTemplate() {
    const templatePath = path.join(
      this.projectRoot,
      'app/templates/application.template.gts'
    );
    const applicationPath = path.join(
      this.projectRoot,
      'app/templates/application.gts'
    );

    if (!fs.existsSync(templatePath)) {
      this.warn(
        'app/templates/application.template.gts not found, skipping application.gts replacement'
      );
      return;
    }

    let content = fs.readFileSync(templatePath, 'utf8');

    // Replace PROJECT_NAME placeholder with actual project name
    content = content.replace(/PROJECT_NAME/g, this.newProjectName);

    if (!this.dryRun) {
      fs.writeFileSync(applicationPath, content, 'utf8');
    }

    this.logChange(
      'Replaced',
      'app/templates/application.gts',
      'from template without demo containers'
    );
  }

  deleteBoilerplateDemo() {
    const filesToDelete = [
      // Demo routes and templates
      'app/routes/demo.ts',
      'app/templates/demo.gts',
      'app/templates/demo/notifications-demo.gts',
      'app/templates/demo/modals-demo.gts',
      'app/controllers/demo/notifications-demo.ts',
      'app/controllers/demo/modals-demo.ts',
      // Notification system
      'app/services/notifications.ts',
      'app/components/notification-item.gts',
      'app/components/notifications-container.gts',
      'app/types/notification.ts',
      'tests/integration/components/notification-item-test.gts',
      'tests/integration/components/notifications-container-test.gts',
      'tests/unit/services/notifications-test.ts',
      // Modal system
      'app/services/modals.ts',
      'app/components/modal-item.gts',
      'app/components/modals-container.gts',
      'app/types/modal.ts',
    ];

    const dirsToDelete = ['app/templates/demo', 'app/controllers/demo'];

    for (const file of filesToDelete) {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        if (!this.dryRun) {
          fs.unlinkSync(filePath);
        }
        this.logChange('Deleted', file, 'boilerplate demo file');
      }
    }

    for (const dir of dirsToDelete) {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        if (!this.dryRun) {
          fs.rmSync(dirPath, { recursive: true, force: true });
        }
        this.logChange('Deleted', dir, 'boilerplate demo directory');
      }
    }
  }

  removeGitDirectory() {
    const gitPath = path.join(this.projectRoot, '.git');

    if (!fs.existsSync(gitPath)) {
      this.warn('.git directory not found');
      return;
    }

    if (!this.dryRun) {
      fs.rmSync(gitPath, { recursive: true, force: true });
    }

    this.logChange('Removed', '.git directory');
  }

  initializeGit() {
    if (!this.dryRun) {
      try {
        execSync('git init', { cwd: this.projectRoot, stdio: 'ignore' });
        execSync('git add .', { cwd: this.projectRoot, stdio: 'ignore' });
        execSync('git commit -m "Initial commit from boilerplate"', {
          cwd: this.projectRoot,
          stdio: 'ignore',
        });
      } catch (error) {
        this.error(`Failed to initialize git: ${error.message}`);
        return;
      }
    }

    this.logChange('Initialized', 'new git repository', 'with initial commit');
  }

  installDependencies() {
    this.info('Installing dependencies with pnpm...');

    if (!this.dryRun) {
      try {
        execSync('pnpm install', {
          cwd: this.projectRoot,
          stdio: 'inherit',
        });
      } catch (error) {
        this.error(`Failed to install dependencies: ${error.message}`);
        return;
      }
    }

    this.logChange('Installed', 'dependencies', 'via pnpm install');
  }

  setupGitHooks() {
    this.info('Setting up git hooks...');

    if (!this.dryRun) {
      try {
        execSync('pnpm dlx simple-git-hooks', {
          cwd: this.projectRoot,
          stdio: 'inherit',
        });
      } catch (error) {
        this.warn(`Failed to setup git hooks: ${error.message}`);
        return;
      }
    }

    this.logChange('Setup', 'git hooks', 'via simple-git-hooks');
  }

  printSummary() {
    console.log();
    this.log('═══════════════════════════════════════════════', 'bright');
    this.log('Summary of Changes', 'bright');
    this.log('═══════════════════════════════════════════════', 'bright');
    console.log();

    if (this.changes.length === 0) {
      this.info('No changes were made');
      return;
    }

    for (const change of this.changes) {
      const detailStr = change.detail
        ? ` ${colors.dim}(${change.detail})${colors.reset}`
        : '';
      console.log(
        `  ${colors.green}${change.action}${colors.reset}: ${colors.cyan}${change.target}${colors.reset}${detailStr}`
      );
    }

    console.log();
    this.log('═══════════════════════════════════════════════', 'bright');
  }

  async run() {
    console.log();
    this.log(
      '══════════════════════════════════════════════════════════',
      'bright'
    );
    this.log('         Project Initialization Script', 'bright');
    this.log(
      '══════════════════════════════════════════════════════════',
      'bright'
    );
    console.log();

    if (this.dryRun) {
      this.warn('DRY RUN MODE - No changes will be made');
      console.log();
    }

    // Interactive mode
    if (this.interactive) {
      this.newProjectName = await this.prompt('Enter new project name');
      this.keepGit = await this.promptYesNo(
        'Keep existing .git directory?',
        false
      );
      if (!this.keepGit) {
        this.initGit = await this.promptYesNo(
          'Initialize new git repository?',
          true
        );
      }
      this.skipInstall = !(await this.promptYesNo(
        'Install dependencies with pnpm?',
        true
      ));
      console.log();
    }

    // Check prerequisites
    if (!this.checkPrerequisites()) {
      process.exit(1);
    }

    console.log();

    // Perform updates
    this.updateFiles();
    this.updatePackageJson();
    this.replaceReadmeFromTemplate();
    this.replaceClaudeFromTemplate();
    this.replaceApplicationFromTemplate();
    this.replaceIndexFromTemplate();
    this.deleteBoilerplateDemo();
    this.renameWorkspaceFile();

    // Git operations
    if (!this.keepGit) {
      this.removeGitDirectory();
      if (this.initGit) {
        this.initializeGit();
      }
    }

    // Install dependencies
    if (!this.skipInstall) {
      this.installDependencies();

      // Setup git hooks only if git is available and we installed deps
      if (this.keepGit || this.initGit) {
        this.setupGitHooks();
      }
    }

    // Print summary
    this.printSummary();

    // Next steps
    if (!this.dryRun) {
      console.log();
      this.log('Next Steps:', 'bright');
      console.log();
      this.info(
        '1. Update package.json with your author, description, and repository info'
      );
      this.info('2. Review and update README.md with your project details');
      this.info('3. Review and update CLAUDE.md if needed');
      if (this.skipInstall) {
        this.info('4. Run: pnpm install');
      }
      console.log();
      this.success('Project initialization complete!');
    } else {
      console.log();
      this.info('Run without --dry-run to apply these changes');
    }

    console.log();
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    projectName: null,
    dryRun: false,
    keepGit: false,
    initGit: false,
    skipInstall: false,
    force: false,
    interactive: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--keep-git') {
      options.keepGit = true;
    } else if (arg === '--init-git') {
      options.initGit = true;
    } else if (arg === '--skip-install') {
      options.skipInstall = true;
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--interactive' || arg === '-i') {
      options.interactive = true;
    } else if (!arg.startsWith('--') && !options.projectName) {
      options.projectName = arg;
    } else {
      console.error(`${colors.red}Unknown argument: ${arg}${colors.reset}`);
      printHelp();
      process.exit(1);
    }
  }

  return options;
}

function printHelp() {
  console.log(`
${colors.bright}Project Initialization Script${colors.reset}

${colors.bright}USAGE:${colors.reset}
  node init-project.cjs <new-project-name> [options]
  node init-project.cjs --interactive

${colors.bright}OPTIONS:${colors.reset}
  ${colors.cyan}--dry-run${colors.reset}         Show what would be changed without making changes
  ${colors.cyan}--keep-git${colors.reset}        Keep the existing .git directory
  ${colors.cyan}--init-git${colors.reset}        Initialize a new git repository (only if .git is removed)
  ${colors.cyan}--skip-install${colors.reset}    Skip running pnpm install
  ${colors.cyan}--force${colors.reset}           Run even if there are uncommitted changes
  ${colors.cyan}--interactive, -i${colors.reset} Prompt for all options
  ${colors.cyan}--help, -h${colors.reset}        Show this help message

${colors.bright}EXAMPLES:${colors.reset}
  ${colors.dim}# Basic usage${colors.reset}
  node init-project.cjs my-awesome-app

  ${colors.dim}# Preview changes without applying them${colors.reset}
  node init-project.cjs my-awesome-app --dry-run

  ${colors.dim}# Keep existing git history, skip install${colors.reset}
  node init-project.cjs my-awesome-app --keep-git --skip-install

  ${colors.dim}# Remove git and create new repository${colors.reset}
  node init-project.cjs my-awesome-app --init-git

  ${colors.dim}# Interactive mode${colors.reset}
  node init-project.cjs --interactive
`);
}

// Main execution
async function main() {
  const options = parseArgs();

  if (!options.interactive && !options.projectName) {
    console.error(
      `${colors.red}Error: Project name is required${colors.reset}\n`
    );
    printHelp();
    process.exit(1);
  }

  const initializer = new ProjectInitializer(options);
  await initializer.run();
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
