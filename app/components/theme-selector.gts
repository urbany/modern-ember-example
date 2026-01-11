import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { on } from '@ember/modifier';
import type Theme from 'modern-ember-example/services/theme';
import Icon from 'modern-ember-example/components/icon';

// Import icons
import PaletteIcon from '~icons/lucide/palette';
import RotateCcwIcon from '~icons/lucide/rotate-ccw';

export default class ThemeSelectorComponent extends Component {
  @service declare theme: Theme;

  get themeOptions() {
    return [
      { value: 'light', label: 'Light', color: 'bg-white border-gray-300' },
      { value: 'dark', label: 'Dark', color: 'bg-gray-900 border-gray-700' },
      {
        value: 'cupcake',
        label: 'Cupcake',
        color: 'bg-pink-50 border-pink-200',
      },
      {
        value: 'bumblebee',
        label: 'Bumblebee',
        color: 'bg-yellow-100 border-yellow-300',
      },
      {
        value: 'emerald',
        label: 'Emerald',
        color: 'bg-green-50 border-green-200',
      },
      {
        value: 'corporate',
        label: 'Corporate',
        color: 'bg-blue-50 border-blue-200',
      },
      {
        value: 'synthwave',
        label: 'Synthwave',
        color: 'bg-purple-900 border-purple-700',
      },
      {
        value: 'retro',
        label: 'Retro',
        color: 'bg-orange-100 border-orange-300',
      },
      {
        value: 'cyberpunk',
        label: 'Cyberpunk',
        color: 'bg-pink-900 border-pink-700',
      },
      {
        value: 'valentine',
        label: 'Valentine',
        color: 'bg-pink-50 border-pink-200',
      },
      {
        value: 'halloween',
        label: 'Halloween',
        color: 'bg-orange-900 border-orange-700',
      },
      {
        value: 'garden',
        label: 'Garden',
        color: 'bg-green-50 border-green-200',
      },
      {
        value: 'forest',
        label: 'Forest',
        color: 'bg-green-900 border-green-700',
      },
      { value: 'aqua', label: 'Aqua', color: 'bg-cyan-50 border-cyan-200' },
      { value: 'lofi', label: 'Lo-fi', color: 'bg-gray-100 border-gray-300' },
      { value: 'pastel', label: 'Pastel', color: 'bg-pink-50 border-pink-200' },
      {
        value: 'fantasy',
        label: 'Fantasy',
        color: 'bg-purple-50 border-purple-200',
      },
      {
        value: 'wireframe',
        label: 'Wireframe',
        color: 'bg-gray-50 border-gray-200',
      },
      { value: 'black', label: 'Black', color: 'bg-black border-gray-800' },
      {
        value: 'luxury',
        label: 'Luxury',
        color: 'bg-gray-900 border-yellow-600',
      },
      {
        value: 'dracula',
        label: 'Dracula',
        color: 'bg-gray-900 border-red-600',
      },
      { value: 'cmyk', label: 'CMYK', color: 'bg-cyan-50 border-cyan-200' },
      {
        value: 'autumn',
        label: 'Autumn',
        color: 'bg-orange-50 border-orange-200',
      },
      {
        value: 'business',
        label: 'Business',
        color: 'bg-gray-50 border-gray-300',
      },
      { value: 'acid', label: 'Acid', color: 'bg-lime-50 border-lime-200' },
      {
        value: 'lemonade',
        label: 'Lemonade',
        color: 'bg-yellow-50 border-yellow-200',
      },
      { value: 'night', label: 'Night', color: 'bg-gray-900 border-gray-700' },
      {
        value: 'coffee',
        label: 'Coffee',
        color: 'bg-amber-900 border-amber-700',
      },
      { value: 'winter', label: 'Winter', color: 'bg-blue-50 border-blue-200' },
      { value: 'dim', label: 'Dim', color: 'bg-gray-800 border-gray-600' },
      { value: 'nord', label: 'Nord', color: 'bg-gray-900 border-blue-400' },
      {
        value: 'sunset',
        label: 'Sunset',
        color: 'bg-orange-900 border-orange-700',
      },
      {
        value: 'caramellatte',
        label: 'Caramel Latte',
        color: 'bg-amber-100 border-amber-300',
      },
      { value: 'abyss', label: 'Abyss', color: 'bg-gray-900 border-blue-600' },
      { value: 'silk', label: 'Silk', color: 'bg-gray-50 border-pink-200' },
    ];
  }

  @action
  selectTheme(event: Event) {
    const target = event.target as HTMLInputElement;
    this.theme.setTheme(target.value);
  }

  @action
  resetTheme() {
    this.theme.resetTheme();
  }

  <template>
    <div class="dropdown dropdown-end">
      <button type="button" tabindex="0" class="btn btn-ghost btn-circle">
        <Icon @icon={{PaletteIcon}} class="h-5 w-5" />
      </button>
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
      >
        <li>
          <button
            type="button"
            class="text-warning flex items-center gap-3"
            {{on "click" this.resetTheme}}
          >
            <Icon @icon={{RotateCcwIcon}} class="h-4 w-4" />
            <span>Reset to System</span>
          </button>
        </li>
        <li class="menu-title">
          <span>Select Theme</span>
        </li>
        {{#each this.themeOptions as |themeOption|}}
          <li>
            <label class="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="theme-selector"
                class="theme-controller radio radio-sm"
                value={{themeOption.value}}
                {{on "change" this.selectTheme}}
              />
              <div class="flex items-center gap-2">
                <div class="h-4 w-4 rounded border {{themeOption.color}}"></div>
                <span>{{themeOption.label}}</span>
              </div>
            </label>
          </li>
        {{/each}}
      </ul>
    </div>
  </template>
}
