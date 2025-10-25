import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import type ModalsDemoController from '../../controllers/demo/modals-demo';

interface ModalsDemoSignature {
  Args: {
    model: unknown;
    controller: ModalsDemoController;
  };
}

<template>
  {{pageTitle "Modals Demo"}}

  <div class="mx-auto max-w-6xl p-6">
    <div class="prose mb-8 max-w-none">
      <h1>Modals Demo</h1>
      <p>
        Modal dialog system using DaisyUI and Tailwind CSS. Test the different
        types and configurations below.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {{! Alert Modals }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-info">Alert</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-info btn-sm w-full"
              {{on "click" @controller.showAlert}}
            >
              Simple Alert
            </button>
          </div>
        </div>
      </div>

      {{! Confirm Modals }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-success">Confirm</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-success btn-sm w-full"
              {{on "click" @controller.showConfirm}}
            >
              Simple Confirm
            </button>
            <button
              type="button"
              class="btn btn-success btn-outline btn-sm w-full"
              {{on "click" @controller.showCustomConfirm}}
            >
              Custom Confirm
            </button>
          </div>
        </div>
      </div>

      {{! Custom Component Modals }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-warning">Custom Component</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-warning btn-sm w-full"
              {{on "click" @controller.showCustomComponent}}
            >
              Custom Component Modal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> satisfies TOC<ModalsDemoSignature>;
