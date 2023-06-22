module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        custom: "repeat(auto-fit, minmax(30%, 3fr))",
      },
      fontFamily: {
        lato: ["lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
        
      },
    },
  },

  daisyui: {
    themes: ["light", "dark"],
    mytheme: {
      

    }
    
  
  },

  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.css",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.jsx",
  ],
  plugins: [require("daisyui")],
};
