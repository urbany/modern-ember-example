# modern-ember-example

A modern Ember.js application built with the latest tooling and best practices.

> **Note**: This is a boilerplate project. Use the initialization script to quickly set up a new project from this template.
>
> **For boilerplate maintainers**: See [docs/BOILERPLATE.md](docs/BOILERPLATE.md) for maintenance documentation.

## Using This Boilerplate

This repository serves as a boilerplate for creating new Ember.js projects. To initialize a new project:

### Quick Start

```bash
# Clone this repository
git clone <repository-url> my-new-project
cd my-new-project

# Run the initialization script (dry-run first to preview changes)
node init-project.cjs my-new-project --dry-run

# Apply the changes
node init-project.cjs my-new-project
```

### Initialization Script

The `init-project.cjs` script automatically:

- Renames all instances of "modern-ember-example" to your new project name
- Updates package.json, tsconfig.json, and all configuration files
- **Replaces README.md with a clean, project-ready template** (from `README.template.md`)
- **Replaces CLAUDE.md with a clean template** (from `CLAUDE.template.md`)
- Renames the workspace file
- Removes the old .git directory and initializes a fresh repository
- Installs dependencies with pnpm
- Sets up git hooks

**Usage:**

```bash
node init-project.cjs <new-project-name> [options]
```

**Options:**

- `--dry-run` - Preview changes without applying them (recommended first step)
- `--keep-git` - Keep the existing .git directory
- `--init-git` - Initialize a new git repository after removing the old one
- `--skip-install` - Skip running pnpm install
- `--interactive` or `-i` - Interactive mode with prompts
- `--help` or `-h` - Show help message

**Examples:**

```bash
# Preview what will change
node init-project.cjs my-awesome-app --dry-run

# Initialize with all defaults (removes git, installs deps)
node init-project.cjs my-awesome-app

# Keep git history, skip installation
node init-project.cjs my-awesome-app --keep-git --skip-install

# Fresh start with new git repository
node init-project.cjs my-awesome-app --init-git

# Interactive mode
node init-project.cjs --interactive
```

## Tech Stack

- **Ember.js 6.8.x** (Octane edition)
- **Vite + Embroider** - Modern build pipeline for fast development and optimized production builds
- **TypeScript** - Full type safety across the application
- **Glint v2** - Template type-checking for `.gts` and `.gjs` files
- **WarpDrive** (EmberData 5.x) - Modular data management with JSON:API support
- **Tailwind CSS v4** - Utility-first styling
- **daisyUI** - Component library built on Tailwind CSS
- **Lucide Icons** - Modern icon library with custom Glimmer component integration
- **ember-simple-auth** - Authentication and session management
- **Toast Notifications** - Custom notification system with DaisyUI styling and positioning

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/)
- [Google Chrome](https://google.com/chrome/)

## Installation (For Development of This Boilerplate)

If you're working on the boilerplate itself (not creating a new project):

```bash
git clone <repository-url>
cd modern-ember-example
pnpm install
```

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `pnpm ember help generate` for more details

### Running Tests

- `pnpm test`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `pnpm vite build --mode development` (development)
- `pnpm build` (production)

### Deploying

Specify what it takes to deploy your app.

## Architecture

### Data Layer (WarpDrive)

The application uses WarpDrive (EmberData 5.x) with a modular architecture:

- **Store**: Factory service configured in `app/services/store.ts` using `useLegacyStore()`
- **Request Handlers**: Custom handlers registered with the store to intercept and modify requests
  - `AuthHandler` - Adds authentication headers to requests
  - `JSONAPINormalizer` - Normalizes JSON:API responses (converts keys to camelCase, standardizes resource types)
- **JSON:API Support**: Built-in support via `@warp-drive/json-api` package

### Type Safety

- Full TypeScript coverage with strict typing
- Glint v2 provides template type-checking for `.gts` and `.gjs` component files
- Service injection uses type-safe patterns with module augmentation

### Notifications System

A complete toast notification system with the following features:

- **Service-based API**: Inject the `notifications` service to show success, error, warning, and info messages
- **Auto-dismiss**: Configurable duration with automatic cleanup
- **Manual dismissal**: Click-to-dismiss functionality
- **Positioning**: Configurable positioning (top-start, top-center, top-end, bottom-start, bottom-center, bottom-end)
- **Type-safe**: Full TypeScript support with proper interfaces
- **DaisyUI integration**: Styled with DaisyUI alert components and Lucide icons
- **Demo route**: Visit `/notifications-demo` to see all features in action

**Usage:**

```typescript
import { service } from '@ember/service';
import type NotificationsService from 'modern-ember-example/services/notifications';

@service declare notifications: NotificationsService;

// Show notifications
this.notifications.success('Operation completed!');
this.notifications.error('Something went wrong', {
  description: 'Please try again later'
});
```

### Build System

- **Embroider** builds the app with modern tooling support
- **Vite** serves as the dev server (port 4200) and production bundler
- Babel handles TypeScript transformation and template compilation

## Further Reading / Useful Links

### Ember Core

- [Ember.js](https://emberjs.com/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Ember Guides](https://guides.emberjs.com/)

### Build Tools

- [Embroider](https://github.com/embroider-build/embroider) - Modern build system for Ember
- [Vite](https://vite.dev/) - Next generation frontend tooling

### Data Management

- [WarpDrive Documentation](https://github.com/emberjs/data/blob/main/guides/index.md)
- [JSON:API Specification](https://jsonapi.org/)

### TypeScript & Type Safety

- [Glint](https://typed-ember.gitbook.io/glint) - Template type-checking
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Styling

- [Tailwind CSS](https://tailwindcss.com/docs)
- [daisyUI](https://daisyui.com/) - Component library for Tailwind CSS

### Icons

The application uses Lucide Icons integrated via a custom Glimmer component:

- **Usage**: `<Icon @icon={{IconName}} class="optional-classes" />`
- **Component**: `app/components/icon.gts`
- **Documentation**: [Lucide Icons](https://lucide.dev/)
- Supports all icons from the Lucide icon set

### Authentication

- [ember-simple-auth](https://ember-simple-auth.com/)

### Browser Extensions

- [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
- [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
