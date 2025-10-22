import { LinkTo } from '@ember/routing';
import Icon from 'modern-ember-example/components/icon';

// Import icons
import ArrowLeftIcon from '~icons/lucide/arrow-left';

<template>
  {{! Demo Header }}
  <div class="navbar bg-base-100 sticky top-0 z-10 shadow-lg">
    <div class="navbar-start">
      <LinkTo @route="index" class="btn btn-ghost btn-sm">
        <Icon @icon={{ArrowLeftIcon}} class="h-4 w-4" />
        Back to Home
      </LinkTo>
    </div>
    <div class="navbar-center">
      <h1 class="text-xl font-bold">Demo Pages</h1>
    </div>
    <div class="navbar-end">
      <div class="badge badge-primary">Modern Ember Example</div>
    </div>
  </div>

  {{! Outlet for nested routes }}
  <div class="bg-base-200 min-h-screen">
    {{outlet}}
  </div>
</template>
