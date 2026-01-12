import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { createStringStorage } from '../utils/local-storage';
import { colorScheme, sync, prefers } from 'ember-primitives/color-scheme';

export default class Theme extends Service {
  @tracked currentTheme: string = 'light';

  private themeStorage: ReturnType<typeof createStringStorage>;

  // Light themes (based on daisyUI defaults)
  private lightThemes = [
    'light',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'retro',
    'cyberpunk',
    'valentine',
    'garden',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'cmyk',
    'autumn',
    'acid',
    'lemonade',
    'winter',
    'nord',
    'caramellatte',
    'silk',
  ];

  // Dark themes (based on daisyUI defaults)
  private darkThemes = [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'aqua',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
    'dim',
    'sunset',
    'abyss',
  ];

  themes = [...this.lightThemes, ...this.darkThemes];

  constructor(owner: Owner) {
    super(owner);
    this.themeStorage = createStringStorage('theme');
    // Initialize color-scheme utility
    sync();
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = this.themeStorage.get();
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      // Check for system preference using color-scheme utility
      const defaultTheme = prefers.dark() ? 'dark' : 'light';
      this.currentTheme = defaultTheme;
      this.applyTheme(defaultTheme);
    }
  }

  setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      this.themeStorage.set(theme);
    }
  }

  resetTheme() {
    // Remove stored theme preference
    this.themeStorage.remove();

    // Check system preference and apply default theme
    const defaultTheme = prefers.dark() ? 'dark' : 'light';
    this.currentTheme = defaultTheme;
    this.applyTheme(defaultTheme);
  }

  private applyTheme(theme: string) {
    // Apply daisyUI theme
    document.documentElement.setAttribute('data-theme', theme);

    // Sync CSS color-scheme property for better browser integration
    const scheme = this.darkThemes.includes(theme) ? 'dark' : 'light';
    colorScheme.update(scheme);
  }

  get isDarkTheme(): boolean {
    return this.darkThemes.includes(this.currentTheme);
  }

  get isLightTheme(): boolean {
    return this.lightThemes.includes(this.currentTheme);
  }
}
