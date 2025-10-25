import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';
import { createStringStorage } from '../utils/local-storage';

export default class ThemeService extends Service {
  @tracked currentTheme: string = 'light';

  private themeStorage: ReturnType<typeof createStringStorage>;

  themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk',
  ];

  constructor(owner: Owner) {
    super(owner);
    this.themeStorage = createStringStorage('theme');
    this.loadTheme();
  }

  loadTheme() {
    const savedTheme = this.themeStorage.get();
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
      this.applyTheme(savedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
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
    this.themeStorage.remove();
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    this.currentTheme = defaultTheme;
    this.applyTheme(defaultTheme);
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
