import { pageTitle } from 'ember-page-title';
import NotificationsContainer from 'modern-ember-example/components/notifications-container';
import ModalsContainer from 'modern-ember-example/components/modals-container';

<template>
  {{pageTitle "Modern Ember Example"}}

  <div class="bg-base-200 min-h-screen">

    {{! Outlet for nested routes }}
    <div class="container mx-auto px-4 py-8">
      {{outlet}}
    </div>
  </div>

  {{! Global notifications container }}
  <NotificationsContainer />

  {{! Global modals container }}
  <ModalsContainer />
</template>
