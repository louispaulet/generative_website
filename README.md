# Generative Website 🌐

Generative Website is an innovative project that leverages OpenAI's ChatGPT to dynamically generate HTML pages based on user input. It now includes a small Vite + React frontend located in `vite-frontend/` which communicates with the Flask backend. Users can request a variety of page styles and themes directly from the browser.

## Features 🚀

- **Dynamic Page Generation**: Create unique HTML pages based on predefined prompts.
- **OpenAI ChatGPT Integration**: Utilizes ChatGPT for creative content generation.
- **Modern Web Interface**: Sleek and responsive interface built with Bootstrap.
- **Dockerized Application**: Easy setup and deployment with Docker.

## Prerequisites 📋

Ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)

## Getting Started 🛠

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/louispaulet/generative_website.git
    cd generative_website
    ```

2. **Build and Run the Docker Image**:
    ```bash
    docker-compose up --build
    ```

Visit `http://localhost:5000` in your browser to explore the Generative Website!
If you want to work on the React frontend separately, run the following commands:

```bash
cd vite-frontend
npm install
npm run dev
```

This will start the Vite dev server on `http://localhost:5173`.

## Development 💻

Backend files reside in the repository root while the Vite source code lives in
`vite-frontend/src`.

- Edit Python files such as `app.py` to tweak the generation logic.
- Modify React components under `vite-frontend/src` to update the interface or
  add new pages and components.
- To add Python dependencies, update `requirements.txt`; for frontend packages,
  modify `vite-frontend/package.json`.

## Contribution 🤝

We welcome contributions from the community! Whether it's bug reports, feature requests, or pull requests - every contribution counts! Please refer to the `CONTRIBUTING.md` file for the guidelines.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

- **Project Lead**: Louis Paulet - [louispaulet13@gmail.com](mailto:louispaulet13@gmail.com)
- **Project Link**: [https://github.com/louispaulet/generative_website](https://github.com/louispaulet/generative_website)
