# PROJECT_NAME

A modern Ember.js application built with the latest tooling and best practices.

## Prerequisites

You will need the following things properly installed on your computer:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/) (for running tests)

## Installation

```bash
git clone <repository-url>
cd PROJECT_NAME
pnpm install
```

## Running / Development

```bash
pnpm start
```

Visit your app at [http://localhost:4200](http://localhost:4200).

Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code:

```bash
ember help generate
```

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test --server     # Run tests with live reload
```

### Linting

```bash
pnpm lint              # Run all linters
pnpm lint:fix          # Auto-fix linting issues
```

### Building

```bash
vite build --mode development  # Development build
pnpm build                     # Production build
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

## Project Structure

```
app/
├── components/          # Glimmer components (.gts files)
├── routes/              # Route handlers
├── controllers/         # Controllers (if needed)
├── models/              # Data models
├── services/            # Services (store, session, notifications, modals, theme)
├── helpers/             # Template helpers
├── handlers/            # WarpDrive request handlers
├── schemas/             # WarpDrive model schemas
├── styles/              # Stylesheets (Tailwind CSS)
├── templates/           # Route templates
└── utils/               # Utility functions

tests/
├── integration/         # Integration/rendering tests
└── unit/                # Unit tests
```

## Key Features

### Type Safety

- Full TypeScript coverage with strict typing
- Glint v2 provides template type-checking for `.gts` and `.gjs` component files
- Service injection uses type-safe patterns with module augmentation

### Data Layer (WarpDrive)

The application uses WarpDrive (EmberData 5.x) with a modular architecture:

- **Store**: Factory service configured in `app/services/store.ts`
- **Request Handlers**: Custom handlers for authentication and JSON:API normalization
- **Schemas**: Type-safe model definitions in `app/schemas/`
- **JSON:API Support**: Built-in support for JSON:API responses

### Styling with Tailwind CSS & daisyUI

- **Tailwind CSS v4** for utility-first styling
- **daisyUI** component library for pre-built UI components
- Custom theme selector with localStorage persistence
- Dark mode support

### Icons

Use Lucide icons throughout the application:

```gts
import Icon from 'PROJECT_NAME/components/icon';
import IconHome from '~icons/lucide/home';

<template><Icon @icon={{IconHome}} class='h-6 w-6' /></template>
```

### Notifications System

A complete toast notification system:

```typescript
import { service } from '@ember/service';
import type NotificationsService from 'PROJECT_NAME/services/notifications';

@service declare notifications: NotificationsService;

// Show notifications
this.notifications.success('Operation completed!');
this.notifications.error('Something went wrong', {
  description: 'Please try again later'
});
```

**Features:**

- Auto-dismiss with configurable duration
- Manual dismissal (click to close)
- Multiple notification types (success, error, warning, info)
- Configurable positioning
- DaisyUI styled with Lucide icons

### Modal System

Promise-based modal dialogs with DaisyUI styling:

```typescript
import { service } from '@ember/service';
import type ModalsService from 'PROJECT_NAME/services/modals';

@service declare modals: ModalsService;

// Show a modal and wait for user action
const result = await this.modals.confirm({
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?',
  confirmText: 'Yes, proceed',
  cancelText: 'Cancel'
});

if (result) {
  // User confirmed
}
```

### Authentication

Uses **ember-simple-auth** for session management with type-safe session data access.

## Further Reading

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

- [Lucide Icons](https://lucide.dev/)

### Authentication

- [ember-simple-auth](https://ember-simple-auth.com/)

### Browser Extensions

- [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
- [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## License

MIT
