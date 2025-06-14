# Generative Website

This repository contains **Generative Website**, an experimental React application that dynamically creates HTML pages from user prompts via the OpenAI API. The active codebase lives inside the [`generative_website_react`](generative_website_react/) folder. An older version of the project has been archived in the `old project` directory.

## Features

- **React + Vite** front-end using Tailwind CSS and a retro Windows 95 theme.
- **OpenAI integration**: enter a prompt and receive a generated HTML page.
- **API key management**: store your personal OpenAI API key in cookies via a small setup bar.
- **Live preview**: results are rendered in a CRT-style iframe with a toolbar and taskbar UI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Running in Development

```bash
cd generative_website_react
npm install
npm run dev
```

This will start the Vite dev server, typically available at <http://localhost:5173>.

### Building for Production

```bash
npm run build
```

The optimized site is output to `generative_website_react/dist`. You can preview the build locally with `npm run preview` or deploy it to GitHub Pages using `npm run deploy`.

## Repository Structure

```
./generative_website_react   # React application source
./large_assets               # Image assets used by the site
./old project                # Legacy code (not used)
```

Feel free to explore the React source in `generative_website_react` to learn how the generator works.
