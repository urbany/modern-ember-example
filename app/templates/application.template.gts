import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "PROJECT_NAME"}}

  <div class="bg-base-200 min-h-screen">

    {{! Outlet for nested routes }}
    <div class="container mx-auto px-4 py-8">
      {{outlet}}
    </div>
  </div>
</template>
