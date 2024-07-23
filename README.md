# WebSS API

WebSS API is an open-source project that allows you to take screenshots from any website. It is built using Node.js and TypeScript, ensuring a robust and scalable solution for web screenshot needs.

This was designed to be used with my Open Source discord bot, PolyBot, but I could not host it because there aren't any more free servers I can get and I refuse to fund any of my side projects.

## Features

- **Screenshot Capture**: Take full-page or viewport screenshots of any given URL.
- **Fast and Reliable**: Built with performance and reliability in mind.
- **Easy to Use**: Simple API endpoints to capture and retrieve screenshots.

## Installation

There are 3 methods by which you can install & build this API:
1. Cloning the Git repo.
2. Using Docker
3. Pre-built Docker Image

#### Environment variables

Before you set-up the project, you'll need to set up these variable:

| NAME | PURPOSE | VALUE |
|-----|-------|------|
| PORT | The port on which the server should run | Recommended to use`3000` |
| API_BLOCKING | Wether to enable or disable API Blocking (Covered in this README after this table) | 0 -> Disabled, 1 -> Enabled |
| API_KEY | The API key allowed to make requests (if API Blocking is enabled) | Any alpha-numeric value |

#### API Blocking
API Blocking was made so that only one web service can make requests to the API. To use this feature, you first need to generate a key. I have included a `generate-key.ts` file. 

To use this file, clone this repo like mentioned below and run:
```sh
npm run generate
```

The output should look like this:
```sh
API_KEY=6df7285bef68e5bd991b7874d0ba66bd30f9f62c9a84e465a8bb979020990512
```

You can store this in a `.env` file or use it with Docker Compose (like described below).

**Note:** When making requests to the API you'll have to incloude an `Authorization` header like so:
```js
// NodeJS "node-fetch"
const apiKey = process.env.API_KEY
const response = await fetch(`..url`, {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    }
})
```
### Method 1: Cloning the Git repo.

**Note:** You need to have NodeJS and NPM pre-installed.

- Clone the git repo using `git clone`:
    ```sh
    git clone github.com/AnmolPlayzz/webss-api
    ```
- `cd` into the folder:
    ```sh
    cd webss-api
    ```
- Install the required packages:
    ```sh
    npm install
    ```
- Configure the environment variables:
    1. Create a `.env` file in the root of the project.
    2. Inside the `.env` file, include these variables (look above for an explanation on how to get these values):
        ```env
        PORT=...
        API_BLOCKING=...
        API_KEY=...
        ```


- Finally, start the server:
    ```sh
    npm start
    ```
    
    **Note:** make sure the `PORT` you set inside `.env` isn't being used by any other process.

### Method 2: Docker (Building from Dockerfile)

**Note:** You need to have Docker & Docker Pre-Installed pre-installed.

- Clone this repo like mentioned in method 1

- Create a new file in the root of this project called `docker-compose.yaml`:
    ```yaml
    services:
        webssapi:
            build: .  # Build the image from the current directory (where Dockerfile resides)
            ports:
                - "3000:3000"  # Map container port 3000 to host port 3000
            environment:
                PORT: ...  # Set environment variable PORT within the container
                API_BLOCKING: ...
                API_KEY: ...
    ```
    This is also where you set your environment variables.

- Now build the image:
    ```sh
    docker compose build
    ```

- Finally, start the container:
    ```sh
    docker compose up
    ```

### Method 3: Pre-built docker Image
I have also built a docker image and pushed it to the docker hub.

You can clone it using
```sh
docker pull anmolplayzz69/webssapi:latest
```

## Usage

Here's a basic example of how to use WebSS API:

```js
import fetch from 'node-fetch';

const req = {
    url: "https://google.com",
    wait: 200 //in miliseconds
}

const res = fetch("https://.../screenshot",{
    method: "POST"
    body: JSON.stringify(req),
    headers: {
        "Content-type": "application/json",
    }
})

if (!res.ok) {
    throw new Error("error fetching screenshot")
}
const data = await response.buffer()
//use the data buffer as you please.
```

## API End-points

### `/screenshot`

Captures a screenshot of the specified URL after the defined `wait` time.

- `url` (string): The URL of the website to capture.
- `wait` (number): The time in miliseconds to wait before taking a screenshot.

returns a `buffer`.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with TypeScript, Docker and 🥰+🎶 by @AnmolPlayzz
