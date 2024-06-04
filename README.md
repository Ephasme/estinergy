# Estinergy

This project is an answer to the problem posed by Tilt. The application is built with ReactJS and Typescript.

To use it you must enter a valid email, the total consumption of your appliances and you have to select some predefined appliances from the provided list. Once you've done this you can click on the **Compute** button that will perform the calculation and display the results on the right panel.

## How to run

## Run in dev mode

In order to run the repository in dev mode you must have **NodeJS** installed version 20.13.1 with `pnpm` installed and working.

1. Clone the repository
2. `cd` into the repository
3. Run `pnpm install`
4. Run `pnpm dev` to start the local server.

The application will be served on `http://localhost:5173` by Vite.

## Run in container mode

In order to start the server in container mode will must have **Docker** installed and running on your machine.

1. Clone the repository
2. Run `docker build -t estinergy .` in order to build the image locally
3. Run `docker run -d -t -p 8080:80 estinergy` in order to run the local server on the port `8080`

Now you should be able to access the website from `http://localhost:8080`

## Run on Netlify

Well you just have to access `https://estinergy.netlify.app` and voilà!
