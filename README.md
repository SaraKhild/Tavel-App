# Project Instructions
   Project Five - Travel App (Front End Developer Udacity Nanodegree),
   This project is a simple web application that includes a template where you enter the location you are traveling to and the date you left. You will get a picture of the city, name of the city, departure date and weather forecast.

## Usage: HTML , CSS , JavaScript

### APIs:
1. Pixabay
2. GeoNames
3. WeatherBit

#### Architecture of the Project
- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - src folder
    - server folder
      - `server.js` 
      - `app.js` 
    - client folder
      - `index.js`
      - html/views folder
        - img
          - `background.jpg`
          - `earth-globe.png`
        - `index.html`
      - js folder
        - `app.js` 
      - styles folder
        - `base.scss` 
        - `footer.scss` 
        - `header.scss` 
        - `main.scss`

##### How to run
 * Download this folder
 * npm install
 * npm run build-prod 
 * npm run start to run the Express server on port 3031