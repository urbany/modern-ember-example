import Icon from 'modern-ember-example/components/icon';
import { LinkTo } from '@ember/routing';
import Header from 'modern-ember-example/components/header';

// Import icons
import FlameIcon from '~icons/lucide/flame';
import RocketIcon from '~icons/lucide/rocket';
import GithubIcon from '~icons/lucide/github';
import FileCodeIcon from '~icons/lucide/file-code';
import ZapIcon from '~icons/lucide/zap';
import PaletteIcon from '~icons/lucide/palette';
import ShieldIcon from '~icons/lucide/shield';
import CheckCircleIcon from '~icons/lucide/check-circle';
import TerminalIcon from '~icons/lucide/terminal';
import InfoIcon from '~icons/lucide/info';
import BellIcon from '~icons/lucide/bell';

<template>
  {{! Navigation }}
  <Header />

  {{! Hero Section }}
  <div class="hero bg-base-100 py-20">
    <div class="hero-content text-center">
      <div class="max-w-3xl">
        <div class="mb-6 flex justify-center">
          <Icon @icon={{FlameIcon}} class="text-primary h-20 w-20" />
        </div>
        <h1 class="text-5xl font-bold">Modern Ember Example</h1>
        <p class="py-6 text-lg">
          A cutting-edge Ember.js application showcasing the latest tools and
          best practices for building modern web applications with TypeScript,
          Vite, and Tailwind CSS.
        </p>
        <div class="flex justify-center gap-4">
          <a href="#getting-started" class="btn btn-primary">
            <Icon @icon={{RocketIcon}} class="h-5 w-5" />
            Get Started
          </a>
          <a
            href="https://github.com/urbany/modern-ember-example"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline"
          >
            <Icon @icon={{GithubIcon}} class="h-5 w-5" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  </div>

  {{! Tech Stack Features }}
  <div class="container mx-auto px-4 py-16">
    <h2 class="mb-12 text-center text-3xl font-bold">Tech Stack</h2>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {{! Ember.js Card }}
      <a
        href="https://emberjs.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <img
              src="https://emberjs.com/images/brand/ember-e-circle-icon-4c.svg"
              alt="Ember.js"
              class="h-8 w-8"
            />
            <h3 class="card-title">Ember.js 6.8</h3>
          </div>
          <p>Octane edition with modern component model, auto-tracking, and
            native JavaScript classes.</p>
        </div>
      </a>

      {{! TypeScript Card }}
      <a
        href="https://typed-ember.gitbook.io/glint"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <Icon @icon={{FileCodeIcon}} class="text-secondary h-8 w-8" />
            <h3 class="card-title">TypeScript + Glint</h3>
          </div>
          <p>Full type safety with Glint v2 providing type-checking for
            templates in .gts files.</p>
        </div>
      </a>

      {{! Vite Card }}
      <a
        href="https://github.com/embroider-build/embroider"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <Icon @icon={{ZapIcon}} class="text-accent h-8 w-8" />
            <h3 class="card-title">Vite + Embroider</h3>
          </div>
          <p>Lightning-fast dev server and optimized production builds with
            modern bundling.</p>
        </div>
      </a>

      {{! Tailwind Card }}
      <a
        href="https://tailwindcss.com/docs"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <Icon @icon={{PaletteIcon}} class="text-info h-8 w-8" />
            <h3 class="card-title">Tailwind CSS v4</h3>
          </div>
          <p>Utility-first CSS framework with daisyUI components for rapid UI
            development.</p>
        </div>
      </a>

      {{! WarpDrive Card }}
      <a
        href="https://warp-drive.io/guides/"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <img
              src="https://canary.warp-drive.io/logos/warp-drive/logo-yellow-slab.svg"
              alt="WarpDrive"
              class="h-8"
            />
            <h3 class="card-title">WarpDrive</h3>
          </div>
          <p>Modern data layer with JSON:API support and request handlers.</p>
        </div>
      </a>

      {{! Auth Card }}
      <a
        href="https://ember-simple-auth.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <Icon @icon={{ShieldIcon}} class="text-warning h-8 w-8" />
            <h3 class="card-title">Authentication</h3>
          </div>
          <p>Secure session management with ember-simple-auth and type-safe
            token handling.</p>
        </div>
      </a>
    </div>
  </div>

  {{! Features Section }}
  <div class="bg-base-100 py-16">
    <div class="container mx-auto px-4">
      <h2 class="mb-12 text-center text-3xl font-bold">Key Features</h2>

      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-primary badge-lg">
              <Icon @icon={{CheckCircleIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Type-Safe Templates</h3>
            <p class="text-base-content/80">
              Full TypeScript integration with Glint for type-checking in .gts
              component files.
            </p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-secondary badge-lg">
              <Icon @icon={{CheckCircleIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Modern Build Pipeline</h3>
            <p class="text-base-content/80">
              Vite for instant HMR and Embroider for optimized production
              bundles.
            </p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-accent badge-lg">
              <Icon @icon={{CheckCircleIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Component Library</h3>
            <p class="text-base-content/80">
              Beautiful UI components from daisyUI with Lucide icons
              integration.
            </p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-info badge-lg">
              <Icon @icon={{CheckCircleIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Best Practices</h3>
            <p class="text-base-content/80">
              Pre-configured linting, formatting, and git hooks for code
              quality.
            </p>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-neutral badge-lg">
              <Icon @icon={{BellIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Notifications System</h3>
            <p class="text-base-content/80">
              Toast notifications with DaisyUI styling, customizable positions,
              and multiple types.
            </p>
            <LinkTo
              @route="demo.notifications-demo"
              class="link link-primary"
            >Try it out</LinkTo>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-neutral badge-lg">
              <Icon @icon={{InfoIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">Modal Dialogs</h3>
            <p class="text-base-content/80">
              Promise-based modal system with DaisyUI styling, confirm dialogs,
              and custom components.
            </p>
            <LinkTo @route="demo.modals-demo" class="link link-primary">Try it
              out</LinkTo>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{! Getting Started Section }}
  <div id="getting-started" class="container mx-auto px-4 py-16">
    <h2 class="mb-12 text-center text-3xl font-bold">Getting Started</h2>

    <div class="mx-auto max-w-3xl">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="mb-4 flex items-center gap-3">
            <Icon @icon={{TerminalIcon}} class="text-primary h-6 w-6" />
            <h3 class="card-title">Clone and Run</h3>
          </div>

          <div class="space-y-4">
            <p class="text-base-content/80">
              Get started with this modern Ember.js template in just a few
              steps:
            </p>

            <div class="mockup-code">
              <pre data-prefix="$"><code>git clone
                  &lt;git@github.com:urbany/modern-ember-example.git&gt;</code></pre>
              <pre data-prefix="$"><code>cd &lt;project-name&gt;</code></pre>
              <pre data-prefix="$"><code>pnpm install</code></pre>
              <pre data-prefix="$"><code>pnpm start</code></pre>
            </div>

            <div class="alert alert-info">
              <Icon @icon={{InfoIcon}} class="h-5 w-5" />
              <span>
                The dev server will start at
                <code
                  class="font-mono font-semibold"
                >http://localhost:4200</code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
