# Professional CV Website

A clean, modern, and responsive CV/Resume website template built with HTML, CSS, and vanilla JavaScript. Designed for easy hosting on GitHub Pages.

## 🚀 Features

- **JSON-Driven Content**: Update your details in `data.json` without touching HTML.
- **Responsive Design**: Looks great on mobile, tablet, and desktop.
- **Modern UI**: Clean layout with a sidebar and glassmorphism accents.
- **Print Friendly**: Optimized for printing or saving as PDF (future feature).

## 🛠️ Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2.  **Open locally:**
    Simply open the `index.html` file in your browser.
    *Note: Due to browser security (CORS), some features like loading `data.json` might not work if you just double-click the file. It's best to run a local server.*
    
    Using Python (pre-installed on most systems):
    ```bash
    python3 -m http.server 8000
    ```
    Then visit `http://localhost:8000`.

## 📝 How to Edit

1.  Open `data.json`.
2.  Update the fields with your personal information:
    - `profile`: Your main details.
    - `socials`: Links to your profiles.
    - `experience`: Your work history.
    - `skills`: List of your skills.
    - `projects`: Your showcase.
3.  Replace `profile.png` with your actual photo (keep the same name or update `data.json`).
4.  Refresh the page to see changes!

## 🌍 Deployment

See [deploy_cv.md](.agent/workflows/deploy_cv.md) for instructions on how to host this on GitHub Pages.