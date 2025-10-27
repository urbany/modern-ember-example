import Icon from '../components/icon';
import { LinkTo } from '@ember/routing';
import ThemeSelector from '../components/theme-selector';

// Import icons
import CheckCircleIcon from '~icons/lucide/check-circle';

<template>
  {{! Header with theme selector }}
  <div class="navbar bg-base-100 border-base-300 border-b">
    <div class="flex-1">
      <LinkTo @route="index" class="btn btn-ghost text-xl">PROJECT_NAME</LinkTo>
    </div>
    <div class="flex-none">
      <ThemeSelector />
    </div>
  </div>

  {{! Hero Section }}
  <div class="hero bg-base-100 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <h1 class="text-5xl font-bold">PROJECT_NAME</h1>
        <p class="py-6 text-lg">
          A modern Ember.js application built with TypeScript, Vite, Tailwind
          CSS, and WarpDrive.
        </p>
      </div>
    </div>
  </div>

  {{! Features Section }}
  <div class="bg-base-100 py-16">
    <div class="container mx-auto px-4">
      <h2 class="mb-12 text-center text-3xl font-bold">What's Included</h2>

      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <div class="badge badge-primary badge-lg">
              <Icon @icon={{CheckCircleIcon}} class="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-bold">TypeScript + Glint</h3>
            <p class="text-base-content/80">
              Full type safety with Glint v2 for template type-checking in .gts
              files.
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
            <h3 class="mb-2 text-lg font-bold">Vite + Embroider</h3>
            <p class="text-base-content/80">
              Lightning-fast HMR and optimized production builds.
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
            <h3 class="mb-2 text-lg font-bold">Tailwind CSS v4 + daisyUI</h3>
            <p class="text-base-content/80">
              Utility-first styling with beautiful pre-built components.
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
            <h3 class="mb-2 text-lg font-bold">WarpDrive Data Layer</h3>
            <p class="text-base-content/80">
              Modern data management with JSON:API support and request handlers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{! Getting Started Section }}
  <div class="container mx-auto px-4 py-16">
    <h2 class="mb-8 text-center text-3xl font-bold">Ready to Build</h2>
    <p class="text-base-content/80 mx-auto max-w-2xl text-center">
      Start building your application by editing
      <code class="bg-base-200 rounded px-2 py-1">app/templates/index.gts</code>
      and creating your routes and components.
    </p>
  </div>
</template>
