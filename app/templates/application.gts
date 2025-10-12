import { pageTitle } from 'ember-page-title';
import LucideIcon from 'modern-ember-example/components/lucide-icon';

<template>
  {{pageTitle "Modern Ember Example"}}

  <div class="min-h-screen bg-base-200">
    {{! Hero Section }}
    <div class="hero bg-base-100 py-20">
      <div class="hero-content text-center">
        <div class="max-w-3xl">
          <div class="flex justify-center mb-6">
            <LucideIcon @name="Flame" @class="w-20 h-20 text-primary" />
          </div>
          <h1 class="text-5xl font-bold">Modern Ember Example</h1>
          <p class="py-6 text-lg">
            A cutting-edge Ember.js application showcasing the latest tools and
            best practices for building modern web applications with TypeScript,
            Vite, and Tailwind CSS.
          </p>
          <div class="flex gap-4 justify-center">
            <button type="button" class="btn btn-primary">
              <LucideIcon @name="Rocket" @class="w-5 h-5" />
              Get Started
            </button>
            <a
              href="https://github.com/urbany/modern-ember-example"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline"
            >
              <LucideIcon @name="Github" @class="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>

    {{! Tech Stack Features }}
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Tech Stack</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {{! Ember.js Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="Flame" @class="w-8 h-8 text-primary" />
              <h3 class="card-title">Ember.js 6.7</h3>
            </div>
            <p>Octane edition with modern component model, auto-tracking, and
              native JavaScript classes.</p>
          </div>
        </div>

        {{! TypeScript Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="FileCode" @class="w-8 h-8 text-secondary" />
              <h3 class="card-title">TypeScript + Glint</h3>
            </div>
            <p>Full type safety with Glint v2 providing type-checking for
              templates in .gts files.</p>
          </div>
        </div>

        {{! Vite Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="Zap" @class="w-8 h-8 text-accent" />
              <h3 class="card-title">Vite + Embroider</h3>
            </div>
            <p>Lightning-fast dev server and optimized production builds with
              modern bundling.</p>
          </div>
        </div>

        {{! Tailwind Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="Palette" @class="w-8 h-8 text-info" />
              <h3 class="card-title">Tailwind CSS v4</h3>
            </div>
            <p>Utility-first CSS framework with daisyUI components for rapid UI
              development.</p>
          </div>
        </div>

        {{! WarpDrive Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="Database" @class="w-8 h-8 text-success" />
              <h3 class="card-title">WarpDrive</h3>
            </div>
            <p>Modern data layer (EmberData 5.x) with JSON:API support and
              request handlers.</p>
          </div>
        </div>

        {{! Auth Card }}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon @name="Shield" @class="w-8 h-8 text-warning" />
              <h3 class="card-title">Authentication</h3>
            </div>
            <p>Secure session management with ember-simple-auth and type-safe
              token handling.</p>
          </div>
        </div>
      </div>
    </div>

    {{! Features Section }}
    <div class="bg-base-100 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="badge badge-primary badge-lg">
                <LucideIcon @name="CheckCircle" @class="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-2">Type-Safe Templates</h3>
              <p class="text-base-content/80">
                Full TypeScript integration with Glint for type-checking in .gts
                component files.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="badge badge-secondary badge-lg">
                <LucideIcon @name="CheckCircle" @class="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-2">Modern Build Pipeline</h3>
              <p class="text-base-content/80">
                Vite for instant HMR and Embroider for optimized production
                bundles.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="badge badge-accent badge-lg">
                <LucideIcon @name="CheckCircle" @class="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-2">Component Library</h3>
              <p class="text-base-content/80">
                Beautiful UI components from daisyUI with Lucide icons
                integration.
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0">
              <div class="badge badge-info badge-lg">
                <LucideIcon @name="CheckCircle" @class="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-2">Best Practices</h3>
              <p class="text-base-content/80">
                Pre-configured linting, formatting, and git hooks for code
                quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {{! Outlet for nested routes }}
    <div class="container mx-auto px-4 py-8">
      {{outlet}}
    </div>
  </div>
</template>
