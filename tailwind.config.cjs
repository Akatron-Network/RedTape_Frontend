/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // //* SOIL COLORS
        // cafe_noir: "#5A422C",
        // dark_brown: "#765435",
        // seal_brown: "#582F0E",
        // russet: "#7F4F24",
        // coyote_brown: "#936639",
        // camel: "#A68A64",
        // khaki_web: "#CFC9B4",

        // //* GREEN COLORS
        // pine_tree: "#2B3021",
        // kombu_green: "#333D29",
        // rifle_green: "#414833",
        // dark_olive_green: "#656D4A",
        // laurel_green: "#A4AC86",

        // //* LIGHT COLORS
        // laurel_green_light: "#C2C5AA",
        // ash_gray: "#C8CEB6",
        // bone: "#DEDDCE",
        // alabaster: "#EFEEE7",


        //! Green Palette
        pine_tree: "#2B3021",
        kombu_green: "#363C2A",
        rifle_green: "#414833",
        ebony: "#525943",
        ebony_light: "#6B735C",
        xanadu: "#747C65",
        artichoke: "#868E76",
        laurel_green: "#ABB39A",
        laurel_green_light: "#BFC7AD",
        beige: "#D2DAC0",
        beige_light: "#DCE0CC",
        alabaster: "#E5E8D9",

        dark_olive_green: "#656D4A",
      },

      fontFamily: {
        'raleway': ['Raleway' , 'cursive'],
        'righteous': ['Righteous' , 'cursive'],
        'roboto': ['Roboto Slab' , 'serif']
      },

      boxShadow: {
        'navbar': '0px 0px 10px 2px rgb(0 0 0 / 60%)',
        'sidebar': '10px 0px 8px -4px rgb(0 0 0 / 35%)',
      }
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}