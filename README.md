# 📝 Kanban Board (React + Vite + Tauri)
[![React](https://img.shields.io/badge/built%20with-React-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev)  [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)  [![Tauri](https://img.shields.io/badge/Tauri-%23FFC131?logo=tauri&logoColor=black&style=flat-square)](https://tauri.app)  [![Nord Theme](https://img.shields.io/badge/Theme-Nord-5E81AC?style=flat-square&logoColor=white)](https://www.nordtheme.com/)  [![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)


A sleek, Nord-themed Kanban board built with React and Vite, styled using CSS — now also packaged as a native **desktop app** using [Tauri](https://tauri.app/). Features drag-and-drop card organization, inline editing, and a trash bin for card deletion via drag.


![Kanban Board Screenshot](./Screenshot.png) <!-- Replace with your image path -->

---

## 🔧 Features

- 🧩 Columns: "To Do", "In Progress", and "Done"
- ➕ Add new cards to any column
- ✏️ Double-click to **edit** card titles inline
- 🗑️ Drag cards over the **trash bin** to delete them
- 💾 State is persisted using `localStorage`
- 🖥️ Can be run as a **native desktop app** with Tauri
- 🎨 Modern dark UI using **Nord color palette**
- ⚡ Built with **React + Vite + Tauri**

---

## 📁 Project Structure

```

📦kanban-board
┣ 📁src
┃ ┣ 📁components
┃ ┃ ┣ 📄Column.jsx
┃ ┃ ┗ 📄Card.jsx
┃ ┣ 📄App.jsx
┃ ┗ 📄main.jsx
┣ 📄index.html
┣ 📄App.css
┣ 📄vite.config.js
┗ 📁src-tauri               ← Tauri backend config
┣ 📄tauri.conf.json
┣ 📄Cargo.toml
┗ 📁target               ← Tauri build output (ignored)

````

---

## 🚀 Getting Started

### 1. Clone the repository

````bash
git clone https://github.com/yourusername/kanban-board.git
cd kanban-board
````

### 2. Install dependencies

````bash
npm install
````

### 3. Run the web app (dev)

````bash
npm run dev
````

> Your app will be running at `http://localhost:5173`

---

## 🖥 Build & Run as a Desktop App (via Tauri)

### Requirements

* [Rust](https://www.rust-lang.org/tools/install)
* [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/)
* `npm install -D @tauri-apps/cli`

### Build the desktop app

````bash
npm run tauri build
````

> Output `.exe` can be found in `src-tauri/target/release/bundle/windows/`

### Run desktop app (dev mode)

````bash
npm run tauri dev
````

---

## 🎨 Nord Color Theme Reference

| Purpose       | Variable   | Hex     |
| ------------- | ---------- | ------- |
| Background    | `--nord0`  | #2E3440 |
| Card          | `--nord2`  | #434C5E |
| Text Light    | `--nord6`  | #ECEFF4 |
| Blue Accent   | `--nord10` | #5E81AC |
| Green Column  | `--nord14` | #A3BE8C |
| Yellow Column | `--nord13` | #EBCB8B |

---


## 📃 License

This project is licensed under the [MIT License](./LICENSE).



