# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Ember.js application (v6.8.x, Octane edition) using a modern build pipeline with Vite and Embroider. The project uses TypeScript, Glint for type-checking templates, Tailwind CSS v4 for styling, and WarpDrive (EmberData 5.x) for data management with JSON:API support.

## Development Commands

### Starting Development Server

```bash
pnpm start
```

Starts Vite dev server at http://localhost:4200

### Building

```bash
pnpm build              # Production build
vite build --mode development  # Development build
```

### Testing

```bash
pnpm test               # Run all tests in CI mode
pnpm test --server      # Run tests with live reload
```

Tests are built in development mode and run via Testem with Chrome (headless in CI).

### Linting

```bash
pnpm lint               # Run all linters (CSS, HBS, JS/TS, types, format check)
pnpm lint:fix           # Auto-fix all linting issues
pnpm lint:css           # Stylelint only
pnpm lint:hbs           # Template linter only
pnpm lint:js            # ESLint only
pnpm lint:types         # Glint type-checking only
pnpm format             # Format with Prettier
```

### Code Generators

```bash
ember generate <type> <name>   # Generate components, routes, services, etc.
ember help generate            # See available generators
```

## Build System Architecture

### Embroider + Vite

- Uses **Embroider** for building Ember apps with modern tooling
- **Vite** (v6) serves as the dev server and production bundler
- `ember-cli-build.js` wraps the app with `@embroider/compat` and passes to Vite
- Vite config (`vite.config.mjs`) includes:
  - `@embroider/vite` plugins for Ember support
  - Babel plugin with runtime helpers
  - Tailwind CSS v4 via `@tailwindcss/vite`

### TypeScript & Glint

- Full TypeScript support with `tsconfig.json` extending `@ember/app-tsconfig`
- **Glint v2** provides type-checking for template imports (`.gjs/.gts` files only)
- Note: Glint v2 does not support Handlebars `.hbs` files - use `.gts` or `.gjs` instead
- Path mappings: `PROJECT_NAME/*` → `./app/*`, `PROJECT_NAME/tests/*` → `./tests/*`
- Service injection uses type-safe patterns with module augmentation in service files

### Babel Configuration

Located in `babel.config.cjs`:

- TypeScript transformation with decorator support
- Template compilation with `babel-plugin-ember-template-compilation`
- Decorator transforms for stage 3 decorators
- Babel runtime with ESM

## Project Structure

```
app/
├── app.ts                    # Application class, loads initializers
├── router.ts                 # Router configuration with EmberRouter
├── deprecation-workflow.ts   # Deprecation management (dev only)
├── config/
│   └── environment.ts        # Environment-specific config
├── components/               # Glimmer components
├── routes/                   # Route handlers
├── controllers/              # Controllers (if needed)
├── models/                   # Data models
├── helpers/                  # Template helpers
├── services/                 # Services (store, session, notifications, modals, theme)
├── handlers/                 # WarpDrive request handlers
├── schemas/                  # WarpDrive model schemas
├── styles/
│   └── app.css              # Main stylesheet (imports Tailwind)
└── templates/               # Route templates

tests/
├── test-helper.ts           # Test setup and configuration
├── helpers/                 # Test helper functions
├── integration/             # Integration/rendering tests
└── unit/                    # Unit tests

config/
├── environment.js           # Environment configuration (all envs)
├── targets.js              # Browser targets for transpilation
└── optional-features.json   # Ember optional features flags
```

## Important Configuration Details

### Ember Optional Features

Located in `config/optional-features.json`:

- `application-template-wrapper`: false (no wrapper div)
- `jquery-integration`: false (no jQuery)
- `template-only-glimmer-components`: true (template-only components supported)
- `no-implicit-route-model`: true (explicit model hooks required)

### Environment Config

- **Development**: Uses `history` location, debug flags available
- **Test**: Uses `none` location, `rootElement: '#ember-testing'`, `autoboot: false`
- **Production**: Standard production settings

### ESLint Configuration

- Flat config format (`eslint.config.mjs`)
- TypeScript ESLint with type-checked rules for `.ts/.gts` files
- Ember plugin with GJS/GTS support
- QUnit plugin for test files
- Prettier integration (extends `eslint-config-prettier`)

### Styling

- **Tailwind CSS v4** configured via `@tailwindcss/vite` plugin
- **daisyUI**: Component library built on Tailwind CSS - use daisyUI components whenever possible
  - Documentation can be searched via Context7 MCP: `resolve-library-id` → `get-library-docs` for daisyUI
  - Provides pre-built components (buttons, cards, modals, etc.) that follow Tailwind conventions
- Main stylesheet: `app/styles/app.css` imports Tailwind
- Stylelint with `stylelint-config-standard`, `import-notation: 'string'`

### Icons

- **Lucide Icons**: Icon library integrated via custom component
- Usage: `<Icon @icon={{IconName}} class="optional-classes" />`
- Component location: `app/components/icon.gts`
- Supports all icons from the lucide icon set
- Documentation can be searched via Context7 MCP for available icon names

### Template Linting

- Extends `recommended` config
- Configuration in `.template-lintrc.mjs`

## Data Layer Architecture (WarpDrive)

The application uses **WarpDrive** (EmberData 5.x) with a modular, request-based architecture:

### Store Configuration

Located in `app/services/store.ts`, the store is created using `useLegacyStore()` with:

- **Cache**: `JSONAPICache` for JSON:API response caching
- **Schemas**: Type-safe model definitions (e.g., `UserSchema` in `app/schemas/user.ts`)
- **Handlers**: Custom request handlers that intercept and modify requests
- **Configuration**: `linksMode: true`, `legacyRequests: false`

### Request Handlers

Handlers implement the `Handler` interface and process requests in a middleware-like pattern:

1. **AuthHandler** (`app/handlers/auth-handler.ts`)
   - Injects authentication headers into requests
   - Accesses `session` service via `@service` decorator
   - Adds `Authorization: Bearer <token>` header when authenticated

2. **JSONAPINormalizer** (`app/handlers/json-api-normalizer.ts`)
   - Normalizes JSON:API responses from the server
   - Converts resource types to dasherized, singular form
   - Converts attribute keys from snake_case to camelCase
   - Processes both `data` and `included` arrays

### Schemas

Define model structure using `withDefaults()` from `@warp-drive/legacy/model/migration-support`:

```typescript
// Example: app/schemas/user.ts
export const UserSchema = withDefaults({
  type: 'user',
  fields: [
    { name: 'name', kind: 'attribute', type: 'string' },
    {
      name: 'createdAt',
      kind: 'attribute',
      type: 'date',
      sourceKey: 'created-at',
    },
  ],
});
```

- Schemas must be registered in store configuration
- `sourceKey` maps JSON:API attribute names to camelCase property names
- Supports attributes, relationships (belongsTo, hasMany)

### WarpDrive Build Configuration

In `ember-cli-build.js`, `setConfig()` from `@warp-drive/build-config` configures deprecations:

```javascript
setConfig(app, __dirname, {
  deprecations: {
    DEPRECATE_TRACKING_PACKAGE: false,
  },
});
```

Also configures EmberData deprecations via `emberData.deprecations` in EmberApp options.

## Authentication

Uses **ember-simple-auth** for session management:

- Session service extended in `app/services/session.ts` with typed `Data` interface
- Type-safe access to `session.data.authenticated.accessToken`
- AuthHandler automatically adds auth headers to all WarpDrive requests
- Session service registered in service registry for type-safe injection

## Notifications System

A complete toast notification system:

- **Service**: `app/services/notifications.ts`
- **Container Component**: `app/components/notifications-container.gts`
- **Item Component**: `app/components/notification-item.gts`
- **Features**: Auto-dismiss, manual dismissal, configurable positioning, DaisyUI styling

**Usage:**

```typescript
import { service } from '@ember/service';
import type NotificationsService from 'PROJECT_NAME/services/notifications';

@service declare notifications: NotificationsService;

// Show notifications
this.notifications.success('Success message');
this.notifications.error('Error message', { description: 'Details' });
this.notifications.warning('Warning message');
this.notifications.info('Info message');
```

## Modal System

Promise-based modal dialogs:

- **Service**: `app/services/modals.ts`
- **Container Component**: `app/components/modals-container.gts`
- **Item Component**: `app/components/modal-item.gts`
- **Features**: Promise-based API, DaisyUI styling, customizable buttons

**Usage:**

```typescript
import { service } from '@ember/service';
import type ModalsService from 'PROJECT_NAME/services/modals';

@service declare modals: ModalsService;

// Show modal and wait for user action
const confirmed = await this.modals.confirm({
  title: 'Confirm Action',
  message: 'Are you sure?',
  confirmText: 'Yes',
  cancelText: 'No'
});
```

## Theme Management

Theme selector with localStorage persistence:

- **Service**: `app/services/theme.ts`
- **Component**: `app/components/theme-selector.gts`
- **Storage**: Uses localStorage to persist theme selection
- **Themes**: Configured in daisyUI (light, dark, cupcake, etc.)

## Key Dependencies

- **ember-source**: ~6.8.0 (Octane edition)
- **@embroider/vite**: Modern build system
- **WarpDrive packages**: `@warp-drive/core`, `@warp-drive/ember`, `@warp-drive/json-api`, `@warp-drive/legacy`
- **ember-simple-auth**: Authentication and session management
- **@glimmer/component**: Component base class
- **tracked-built-ins**: Reactive data structures
- **ember-modifier**: Modifier support
- **ember-page-title**: Page title management
- **Tailwind CSS v4**: Utility-first CSS framework
- **daisyUI**: Component library for Tailwind CSS
- **lucide**: Icon library with custom Glimmer component integration

## Deprecation Handling

Deprecations are managed via `ember-cli-deprecation-workflow`:

- Configuration in `app/deprecation-workflow.ts`
- Only loaded in development (via `@embroider/macros`)

## Testing

- **QUnit** as test framework
- **@ember/test-helpers** for rendering and interaction helpers
- **qunit-dom** for DOM assertions
- Tests run in headless Chrome via Testem
- Test configuration: `testem.cjs`

## Module Resolution

The app uses Embroider's module resolution:

- `ember-resolver` with `compatModules` from `@embroider/virtual/compat-modules`
- Auto-import support via `ember-auto-import`
- Module prefix: `PROJECT_NAME`

## Git Hooks

Pre-commit hooks are configured via `simple-git-hooks` and `lint-staged`:

- Runs automatically before each commit
- ESLint with auto-fix for `.js`, `.ts`, `.gjs`, `.gts` files
- Stylelint with auto-fix for `.css` files
- Prettier formatting for all staged files
- Hook installation: `pnpm dlx simple-git-hooks` (if not auto-installed)

## Package Manager

Uses **pnpm** (not npm/yarn) - ensure to use `pnpm install` and `pnpm` commands.

## Node Version

Requires Node.js >= 20
