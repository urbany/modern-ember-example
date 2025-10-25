import Header from 'modern-ember-example/components/header';

<template>
  {{! Demo Header }}
  <Header @title="Demo Pages" @showBackButton={{true}} />

  {{! Outlet for nested routes }}
  <div class="bg-base-200 min-h-screen">
    {{outlet}}
  </div>
</template>
