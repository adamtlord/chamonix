# chamonix

All the business is in [index.html](https://github.com/adamtlord/chamonix/blob/main/index.html) and [scripts.js](https://github.com/adamtlord/chamonix/blob/main/scripts.js). 

[Alpine](https://alpinejs.dev/) is loaded via CDN. 

[Tailwind](https://tailwindcss.com/docs) is compiled [as a PostCSS plugin](https://tailwindcss.com/docs/installation#installing-tailwind-css-as-a-post-css-plugin) using [JIT mode](https://tailwindcss.com/docs/just-in-time-mode). [tailwind.css](https://github.com/adamtlord/chamonix/blob/main/tailwind.css) is the input, [styles.css](https://github.com/adamtlord/chamonix/blob/main/styles.css) is the output.

I used [live-server](https://github.com/tapio/live-server) for local dev. 

The API endpoint is Express running [json-server](https://github.com/typicode/json-server) deployed via [Render.com](https://render.com/), using data from [swapi.dev](https://swapi.dev/).
