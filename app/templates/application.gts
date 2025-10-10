import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "Id"}}

  {{outlet}}

  {{! The following component displays Ember's default welcome message. }}
  <div
    class="text-3xl font-bold underline bg-red-500 mx-auto w-md rounded-2xl p-4 mt-4 text-center"
  >
    Tailwind is working!
  </div>
  {{! Feel free to remove this! }}
</template>
