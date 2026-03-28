/** @type {import('tailwindcss').Config} */
export default {

content: [
"./index.html",
"./src/**/*.{js,jsx,ts,tsx}"
],

theme: {

extend: {

colors:{
primary:"#b11226",
darkred:"#7b0f1a",
bg:"#f6f7fb",
accent:"#ffb400"
},

fontFamily:{
poppins:["Poppins","sans-serif"],
playfair:["Playfair Display","serif"]
}

}

},

plugins:[]

}