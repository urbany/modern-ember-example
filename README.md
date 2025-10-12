# modern-ember-example

A modern Ember.js application built with the latest tooling and best practices.

## Tech Stack

- **Ember.js 6.7.x** (Octane edition)
- **Vite + Embroider** - Modern build pipeline for fast development and optimized production builds
- **TypeScript** - Full type safety across the application
- **Glint v2** - Template type-checking for `.gts` and `.gjs` files
- **WarpDrive** (EmberData 5.x) - Modular data management with JSON:API support
- **Tailwind CSS v4** - Utility-first styling
- **daisyUI** - Component library built on Tailwind CSS
- **Lucide Icons** - Modern icon library with custom Glimmer component integration
- **ember-simple-auth** - Authentication and session management

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/) (for running tests)

## Installation

- `git clone <repository-url>` this repository
- `cd modern-ember-example`
- `pnpm install`

## Running / Development

- `pnpm start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `pnpm test`
- `pnpm test --server`

### Linting

- `pnpm lint`
- `pnpm lint:fix`

### Building

- `vite build --mode development` (development)
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

- **Usage**: `<LucideIcon @name="icon-name" @class="optional-classes" />`
- **Component**: `app/components/lucide-icon.gts`
- **Documentation**: [Lucide Icons](https://lucide.dev/)
- Supports all icons from the Lucide icon set

### Authentication

- [ember-simple-auth](https://ember-simple-auth.com/)

### Browser Extensions

- [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
- [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
