<img alt="icon" src=".diploi/icon.svg" width="32">

# Ghost Component for Diploi

[![launch with diploi badge](https://diploi.com/launch.svg)](https://diploi.com/component/ghost)
[![component on diploi badge](https://diploi.com/component.svg)](https://diploi.com/component/ghost)
[![latest tag badge](https://badgen.net/github/tag/diploi/component-ghost)](https://diploi.com/component/ghost)

Start with a free trial, no account required
https://diploi.com/component/ghost

Run [Ghost](https://ghost.org/) on Diploi.

Uses the official [ghost](https://hub.docker.com/_/ghost/) Docker image.

## Operation

Includes custom storage adapters for Diploi. These save images, files and media to a storage volume that will persist between reboots.
This volume can be found at `/data` on the Ghost `app` container.

### Getting started

1. **Sign up** for Diploi at `https://console.diploi.com/` using your GitHub account.
2. In your dashboard, click **Create Project +**
3. Under **Pick Components**, choose **Ghost**  
 If you want to expand your Ghost blog with other tools, like a backend framework to add an API, in this section, you can add them. They will all be hosted on a single server, reducing costs and complexity.
4. In **Pick Add-ons**, select any databases or tools you want to include.
5. In **Repository**, choose **Create Repository** which will generate a new GitHub repo for you.
6. Click **Launch Stack**

Check the full guide https://diploi.com/blog/hosting_a_ghost_blog

### Development

When running a development environment, Ghost will be run in development mode too.
This will allow you to develop custom themes and plugins with ease.

To learn more about developing on Ghost, see the [Developing Themes](https://ghost.org/docs/install/local/#developing-themes) section of their docs.

### Production

The production image will be an optimized, minimal version with your custom code baked in.
Depending on which features you have been working on, you might have to apply them in the Ghost Admin panel (like themes and plugins).

## Links

- [Ghost documentation](https://ghost.org/docs/)
