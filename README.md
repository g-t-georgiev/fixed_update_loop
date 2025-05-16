# Game Loop Project

## Overview
This project implements a simple game loop using JavaScript. The game loop is responsible for updating the game state and rendering the game at a consistent frame rate. The project is structured to promote modularity and maintainability.

## Project Structure
```
main_loop
├── src
│   ├── index.js          # Main game loop implementation
│   ├── myGame.js        # Defines the MyGame namespace and game state management
│   └── utils
│       └── helpers.js   # Utility functions for various tasks
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install any dependencies listed in `package.json`.

## Usage
To start the game, run the following command in your terminal:
```
node src/index.js
```
This will initiate the game loop, updating and rendering the game at a rate of 20Hz.

## MyGame Namespace
The `MyGame` namespace is defined in `src/myGame.js` and contains the following properties:
- `lastRender`: Keeps track of the last render timestamp.
- `lastTick`: Keeps track of the last update time.
- `tickLength`: Defines how frequently the game state updates (set to 50ms for 20Hz).

## Utility Functions
Utility functions can be found in `src/utils/helpers.js`. These functions assist with various tasks throughout the project, such as calculations and formatting.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details."# main-loop-demo" 
