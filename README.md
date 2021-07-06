# thomasmoran.dev

The folowing contains all the code used in my personal blog site https://thomasmoran.dev

The project was created using the following tech:

- Gatsby (ReactJS)
- Netlify (hosting)
- Netlify functions (which run Gatsby Functions)
- FaunaDB
- AWS S3

I initially started by using the brilliant Gatsby JS starter which you can find <a href="https://github.com/gatsbyjs/gatsby-starter-blog">here</a>.

Please feel free to look around or use it as a starter for you own blog. I only ask that if you find any critical bugs I would appreciate you opening an issue. Alternatively you can send me a message <a href="https://thomasmoran.dev">here</a>.

## Run locally

1.  **Install the Gatsby CLI**

    ```shell
    npm i -g gatsby-cli
    ```

1.  **Clone the repo.**

    Alternatively you can just download the zip.

    ```shell
    git clone https://github.com/ThomasMoran/thomasmoran-dot-dev.git
    ```

1.  **Configure the services and create your .env file**

    I use some very specific services on this site which you may not want to recreate. If you want to skip this part you can comment the code in the /api directory.

    However if you do want to try and set them up, you will need the following variables:

    - SPOTIFY_CLIENT_ID
    - SPOTIFY_CLIENT_SECRET
    - SPOTIFY_REFRESH_TOKEN

    - FAUNA_KEY
    - FAUNA_COLLECTION

    - S3_BUCKET
    - S3_REGION
    - S3_ACCESS_KEY
    - S3_ACCESS_SECRET

1.  **Open the source code and start editing!**

    Start Gatsby in develop mode

    ```shell
    cd thomasmoran-dot-dev
    gatsby develop
    ```

    As is standard with Gatsby, the site will run at `http://localhost:8000`

    The GraphQL tool is available at `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.

## What's inside?

I have kept the file structure largly the same as the gatsby-starter project. All of the config files are located in the root directory.

    .
    ├── node_modules
    ├── content
    ├── src
        ├── api
        ├── components
        ├── hooks
        ├── images
        ├── pages
        ├── templates
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1. **`/content`**: Markdown files for blogposts and snippits. Both sections use the same setup and tech but I wanted them separated. You can use this to extend to more sections/post-types. Extending will requrire some tweaking in the gatsby-node.js file which is used during build to convert these files to pages.

2. **`/src/api`**: The serverless functions are placed in here. They are build using Gatsby Functions (https://www.gatsbyjs.com/docs/reference/functions/) and run via Netlify Functions using the @netlify/plugin-gatsby plugin. The configuration file needed for this is ./netlify.toml

3. **`/src/components`**: All the React front-end code is in this directory. Each component has its own dedicated css file. I use BEM naming convention. All React files are as simple as possible, so no TypeScript or CSS preprocessors.

4. **`/src/images`**: Static images used for hardcoded items including the icons/favicon

5. **`/src/pages`**: Standalone Gatsby pages

6. **`/src/templates`**: Template React files used for the custom post types. These are populated with markdown data for each file in the /content directory.

7. **`/src/-`**: In the root of /src therer are files used in a more global capacity such as utils, html.js (page outline), and global style.css.
