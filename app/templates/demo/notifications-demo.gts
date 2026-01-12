import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import type NotificationsDemoController from '../../controllers/demo/notifications-demo';

interface NotificationsDemoSignature {
  Args: {
    model: unknown;
    controller: NotificationsDemoController;
  };
}

<template>
  {{pageTitle "Notifications Demo"}}

  <div class="mx-auto max-w-6xl p-6">
    <div class="prose mb-8 max-w-none">
      <h1>Notifications Demo</h1>
      <p>
        Toast notification system using DaisyUI and Tailwind CSS. Test the
        different types and configurations below.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {{! Success Notifications }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-success">Success</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-success btn-sm w-full"
              {{on "click" @controller.showSuccess}}
            >
              Simple Success
            </button>
            <button
              type="button"
              class="btn btn-success btn-outline btn-sm w-full"
              {{on "click" @controller.showSuccessWithDescription}}
            >
              Success with Description
            </button>
          </div>
        </div>
      </div>

      {{! Error Notifications }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-error">Error</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-error btn-sm w-full"
              {{on "click" @controller.showError}}
            >
              Simple Error
            </button>
            <button
              type="button"
              class="btn btn-error btn-outline btn-sm w-full"
              {{on "click" @controller.showErrorWithDescription}}
            >
              Error with Description
            </button>
          </div>
        </div>
      </div>

      {{! Warning Notifications }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-warning">Warning</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-warning btn-sm w-full"
              {{on "click" @controller.showWarning}}
            >
              Simple Warning
            </button>
            <button
              type="button"
              class="btn btn-warning btn-outline btn-sm w-full"
              {{on "click" @controller.showWarningWithDescription}}
            >
              Warning with Description
            </button>
          </div>
        </div>
      </div>

      {{! Info Notifications }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-info">Information</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-info btn-sm w-full"
              {{on "click" @controller.showInfo}}
            >
              Simple Info
            </button>
            <button
              type="button"
              class="btn btn-info btn-outline btn-sm w-full"
              {{on "click" @controller.showInfoWithDescription}}
            >
              Info with Description
            </button>
          </div>
        </div>
      </div>

      {{! Special Cases }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-secondary">Special Cases</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-secondary btn-sm w-full"
              {{on "click" @controller.showPersistent}}
            >
              Persistent (no auto-dismiss)
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-outline btn-sm w-full"
              {{on "click" @controller.showNonDismissible}}
            >
              Non-Dismissible
            </button>
          </div>
        </div>
      </div>

      {{! Actions }}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Actions</h2>
          <div class="space-y-2">
            <button
              type="button"
              class="btn btn-primary btn-sm w-full"
              {{on "click" @controller.showMultiple}}
            >
              Show Multiple
            </button>
            <button
              type="button"
              class="btn btn-ghost btn-sm w-full"
              {{on "click" @controller.clearAll}}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>

    {{! Position Controls }}
    <div class="card bg-base-100 mt-6 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Notification Position</h2>
        <div class="grid grid-cols-3 gap-2">
          <button
            type="button"
            class="btn btn-sm"
            {{on "click" (fn @controller.changePosition "top-start")}}
          >
            ↖ Top Start
          </button>
          <button
            type="button"
            class="btn btn-sm"
            {{on "click" (fn @controller.changePosition "top-center")}}
          >
            ↑ Top Center
          </button>
          <button
            type="button"
            class="btn btn-sm"
            {{on "click" (fn @controller.changePosition "top-end")}}
          >
            ↗ Top End
          </button>
          <button
            type="button"
            class="btn btn-sm"
            {{on "click" (fn @controller.changePosition "bottom-start")}}
          >
            ↙ Bottom Start
          </button>
          <button
            type="button"
            class="btn btn-sm"
            {{on "click" (fn @controller.changePosition "bottom-center")}}
          >
            ↓ Bottom Center
          </button>
          <button
            type="button"
            class="btn btn-sm btn-active"
            {{on "click" (fn @controller.changePosition "bottom-end")}}
          >
            ↘ Bottom End (default)
          </button>
        </div>
      </div>
    </div>

    {{! Usage Example }}
    <div class="mockup-code mt-6">
      <pre data-prefix="$"><code>// In any component or route</code></pre>
      <pre data-prefix=">"><code>import &#123; service &#125; from
          '@ember/service';</code></pre>
      <pre data-prefix=">"><code>@service declare notifications: Notifications;</code></pre>
      <pre data-prefix=" "><code></code></pre>
      <pre data-prefix=">"><code>this.notifications.success('Operation
          completed!');</code></pre>
      <pre data-prefix=">"><code>this.notifications.error('Error processing',
          &#123;</code></pre>
      <pre data-prefix=">"><code> description: 'Error details',</code></pre>
      <pre data-prefix=">"><code> duration: 8000</code></pre>
      <pre data-prefix=">"><code>&#125;);</code></pre>
    </div>
  </div>
</template> satisfies TOC<NotificationsDemoSignature>;
