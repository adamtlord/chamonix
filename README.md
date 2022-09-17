# chamonix

## Demo

https://adamtlord.github.io/chamonix/

## Background
I ❤️ the jQuery plugin [DataTables](https://datatables.net/). I've been using it for ten years. I've used it on side projects and client projects, server-side and client side, with AJAX and static data.

But there comes a time when you're working on something and you're pretty deep into it and you haven't installed jQuery and you don't want to add it just for this one table.

Also, I'm a big fan of a [low-js](https://edofic.com/posts/2022-01-28-low-js/) approach, and Alpinejs brings me great joy.

## The Business
All the business is in [index.html](https://github.com/adamtlord/chamonix/blob/main/index.html) and [scripts.js](https://github.com/adamtlord/chamonix/blob/main/scripts.js).

[Alpine](https://alpinejs.dev/) is loaded via CDN.

[Tailwind](https://tailwindcss.com/docs) is compiled [as a PostCSS plugin](https://tailwindcss.com/docs/installation/using-postcss). [tailwind.css](https://github.com/adamtlord/chamonix/blob/main/tailwind.css) is the input, [styles.css](https://github.com/adamtlord/chamonix/blob/main/styles.css) is the output.

I took a lot of components from [TailwindUI](https://tailwindui.com/), which is worth your money.

## Running
I'm using [live-server](https://github.com/tapio/live-server) for local dev.

The concept of the POC is to reproduce functionality from DataTable's [sever-side mode](https://datatables.net/manual/server-side), so I need a server. There are a ton of great free APIs out there to use for testing, but I couldn't find any that would give me the server-side functionality I wanted to test with (pagination, ordering, etc.). So I'm using [json-server](https://github.com/typicode/json-server), which is a real neat little module that gives you a pretty full-fledged fake API from a json data set. There are other options out there, like Hasura, but the focus of this project is client-side; it should be agnostic to how the server works or really where the data even comes from.

The data comes from [The Start Wars API](https://swapi.dev/) because I don't know, that's fun.
