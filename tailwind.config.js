/** @type {import('tailwindcss').Config} */
import { colors as colorsSystem } from './constants/colors'

import colorsTailwind from 'tailwindcss/colors'

const colors = {
  ...colorsSystem,
  ...colorsTailwind,
}

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
}
