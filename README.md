<h1 align="center">
  <br>
  <a href="http://partitura.elpianomaster.com"><img src="https://raw.githubusercontent.com/sm-alejandro/partitura/main/frontend/public/logo_dark.svg" alt="Partitura" width="200"></a>
  <br>
  Partitura
  <br>
</h1>

<h4 align="center">A Sheet Music Manager for multiple formats and instruments.</h4>
<p align="center">
  <a href="https://img.shields.io/badge/made%20with-python-green">
    <img src="https://img.shields.io/badge/made%20with-python-green"
         alt="Made with python">
  </a>
  <a href="https://img.shields.io/badge/made%20with-react-blue">
    <img src="https://img.shields.io/badge/made%20with-react-blue"
         alt="Made with react">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>


https://github.com/user-attachments/assets/c0615128-ed88-4fd5-9f24-f399f0aabab2
https://raw.githubusercontent.com/sm-alejandro/partitura/main/frontend/public/demo.mp4

## Key Features

-   Browse and search any song in the collection
    -   Open pdf
    -   Open musicxml
-   List of all authors
-   List of song categories
-   Create song playlists

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone the repository
$ git clone https://github.com/sm-alejandro/partitura

# Go into the directory
$ cd partitura

# Load songs into database and frontend
$ py -m backend.import ./your-sheets

# this imports a file or a directory with the structure /category_name/sheet.mscz

# Start the backend
#Access it on `http://localhost:8000`
$ fastapi run backend/api.py

# Install dependencies
$ npm install ./frontend

# Start the frontend
# Access it on `http://localhost:5173`
$ npm run dev
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Credits

This software uses the following open source packages:

-   [React.dev](https://react.dev/)
-   [Fastapi](https://fastapi.tiangolo.com/)

## Support

If you like this project and think it has helped in any way, consider sharing it with someone!

## License

[AGPL 3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

---

> [sm-alejandro.com](https://www.sm-alejandro.com) &nbsp;&middot;&nbsp;
> GitHub [@sm-alejandro](https://github.com/sm-alejandro)
