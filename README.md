# Rock Paper Scissors Game with Camera Recognition

A modern web-based Rock Paper Scissors game that supports both traditional button controls and real-time camera-based gesture recognition.

## Features

- Classic Rock Paper Scissors gameplay
- Score tracking for player and computer
- Responsive design that works on desktop and mobile devices
- Camera-based gesture recognition using TensorFlow.js
- Real-time hand gesture detection (Rock, Paper, Scissors)
- Simple and intuitive user interface

## How to Play

### Traditional Mode
1. Open `index.html` in your web browser
2. Click one of the three buttons (Rock, Paper, Scissors) to make your choice
3. The computer will randomly select its move
4. The winner is determined based on classic Rock Paper Scissors rules
5. Scores are updated automatically

### Camera Mode
1. Click the "Start Camera" button
2. Grant camera access when prompted by your browser
3. Show your hand gesture (Rock, Paper, or Scissors) to the camera
4. The game will detect your gesture and play a round automatically
5. Click "Stop Camera" when you want to stop using the camera
6. Use "Reset Game" to reset scores at any time

## Technical Implementation

The game uses:
- HTML5 for structure
- CSS3 for styling and responsive design
- JavaScript for game logic
- TensorFlow.js for image analysis and gesture recognition
- WebRTC API for camera access

## Game Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Matching choices result in a tie

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A working camera for gesture recognition
- Internet connection (for loading TensorFlow.js library)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `script.js` - Game logic and camera functionality
- `README.md` - This file

## Note

The gesture recognition uses a simplified algorithm based on skin tone detection. For best results, ensure your hand is well-lit and centered in the camera frame. The accuracy may vary depending on lighting conditions and camera quality.


test hook(venv) pom@vmi2782277:~/github-commits-listener$ psql -U postgres -h localhost -d mydb
Password for user postgres:
psql (16.10 (Ubuntu 16.10-0ubuntu0.24.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)
Type "help" for help.

mydb=# SELECT * FROM commits;
 id |   repo    |    message     |      timestamp      |     author      |     author_email
----+-----------+----------------+---------------------+-----------------+----------------------
  1 | test/repo | Initial commit | 2025-09-28 16:00:00 | Mathew Kipronoh | kipronohm8@gmail.com
(1 row)

mydb=#





