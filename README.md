# Pomodoro Chat Integration for OBS

This project is a Pomodoro timer application with chat integration, specifically designed for broadcasters using OBS. It enables users and broadcasters to manage and track tasks during a stream. Developed with React, Mantine, and comfy.js, this app offers seamless integration into Twitch chats and can be added as a browser source in OBS.

## Features

- **User Commands:**
    - `!t` or `!task <title>`: Adds a new task.
    - `!d` or `!done <index>`: Marks the task identified by its number as completed.
    - `!rename <index> <new title>`: Renames a task.
- **Broadcaster Commands:**
    - `!tclear`: Clears all tasks and user data.
    - `!tremove <username>`: Removes a user and their tasks from the list.

Tasks are presented in a vertical slideshow that automatically scrolls through. Broadcasters have the ability to adjust settings such as break times and work/study/focus times directly in OBS by interacting with the browser widget.
## Installation and Usage

### Using the Hosted Application

Simply visit [https://pomodoro.florian-chiorean.de/](https://pomodoro.florian-chiorean.de/) to use the application without needing to install or host it yourself. This is the easiest way to get started and is recommended for those who wish to use the application quickly.

### Self-Hosting

1. Clone the repository to your local machine.
2. Run `npm install` to install dependencies.

### Configuring OBS

3. Regardless of the method you choose, you need to integrate the application with OBS:
    - In OBS, add a new "Browser" source to your scene.
    - Enter the URL of your self-hosted instance or `https://pomodoro.florian-chiorean.de` in the "URL" field.
    - Adjust the width and height to match your stream's resolution for optimal display.
    - With the "Browser" source selected, click on the "Interact" button in OBS. This will open a window allowing you to interact with the application directly in OBS.
    - It is essential to enter your Twitch channel name in the settings (accessible via the icon in the bottom right corner of the application interface) to enable chat integration and commands.

## Development and Deployment

Developers can enhance the code and deploy the project using the provided Dockerfile. Use the commands from the `package.json`:
- `npm run dev` to start the development server.
- `npm run build` to build the project for production.
- `npm run lint` to run ESLint for code analysis.

## Screenshots

![Screen 01](/screenshots/screen01.png)
![Screen 02](/screenshots/screen02.png)
![Screen 03](/screenshots/screen03.png)

I hope this tool enhances your streaming workflow and look forward to contributions for further development!
