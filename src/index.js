import './styles.css'
import { createGameScreen } from './screens/createGameScreen.js'
import { createStartScreen } from './screens/createStartScreen.js'

// Import specific weights and styles as needed
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

// Optional: Import italics if your design uses them
import "@fontsource/roboto/400-italic.css"; 

// const gameScreen = createGameScreen()
const startScreen = createStartScreen()