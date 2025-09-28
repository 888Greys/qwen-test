// Rock Paper Scissors Game with Camera Recognition

// Game elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const messageEl = document.getElementById('message');
const playerSelectionEl = document.getElementById('player-selection');
const computerSelectionEl = document.getElementById('computer-selection');
const resetBtn = document.getElementById('reset');

// Choice buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');

// Camera elements
const startCameraBtn = document.getElementById('start-camera');
const stopCameraBtn = document.getElementById('stop-camera');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const cameraContainer = document.getElementById('camera-container');
const predictionResult = document.getElementById('prediction-result');

// Game state
let playerScore = 0;
let computerScore = 0;
let isCameraActive = false;
let model = null;
let animationId = null;

// Choice emojis for display
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Computer choice function
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

// Update display
function updateDisplay(playerChoice, computerChoice, result) {
    // Update selections display
    playerSelectionEl.innerHTML = `<div class="selection">${choiceEmojis[playerChoice]}</div>`;
    computerSelectionEl.innerHTML = `<div class="selection">${choiceEmojis[computerChoice]}</div>`;
    
    // Update message
    if (result === 'tie') {
        messageEl.textContent = "It's a tie!";
        messageEl.style.backgroundColor = '#f1c40f';
    } else if (result === 'player') {
        messageEl.textContent = "You win this round!";
        messageEl.style.backgroundColor = '#2ecc71';
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else {
        messageEl.textContent = "Computer wins this round!";
        messageEl.style.backgroundColor = '#e74c3c';
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
}

// Game function
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    updateDisplay(playerChoice, computerChoice, result);
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    messageEl.textContent = 'Choose your move!';
    messageEl.style.backgroundColor = '#f8f9fa';
    playerSelectionEl.innerHTML = '<div class="selection">?</div>';
    computerSelectionEl.innerHTML = '<div class="selection">?</div>';
    predictionResult.textContent = '';
}

// Initialize camera
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
        });
        video.srcObject = stream;
        isCameraActive = true;
        startCameraBtn.style.display = 'none';
        stopCameraBtn.style.display = 'inline-block';
        cameraContainer.style.display = 'block';
        
        // Load the model and start recognition
        await loadModel();
        startRecognition();
    } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access the camera. Please ensure you've granted permission and that your camera is working.");
    }
}

// Stop camera
function stopCamera() {
    if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    }
    isCameraActive = false;
    startCameraBtn.style.display = 'inline-block';
    stopCameraBtn.style.display = 'none';
    cameraContainer.style.display = 'none';
    
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    predictionResult.textContent = '';
}

// Load a hand pose estimation model (simplified approach)
async function loadModel() {
    console.log("Image analysis model ready (simulated)");
    // In a real implementation, we would load a hand pose model like MediaPipe
    // For now, we'll implement a simpler approach with direct image analysis
    model = true; // Just to indicate model is ready
}

// Start gesture recognition
function startRecognition() {
    if (!isCameraActive) return;
    
    // Draw video frame to canvas for processing
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    detectGesture();
}

// Detect gestures from video feed
function detectGesture() {
    if (!isCameraActive) {
        animationId = requestAnimationFrame(detectGesture);
        return;
    }
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data for analysis
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Analyze the frame to identify hand gestures
    const gesture = analyzeFrame(imageData, canvas.width, canvas.height);
    
    if (gesture && gesture !== 'unknown') {
        // Update the prediction display
        predictionResult.textContent = `Detected: ${gesture}`;
        
        // Play round when gesture is detected
        playRound(gesture);
    } else {
        predictionResult.textContent = 'Show your hand gesture...';
    }
    
    // Continue the detection loop
    animationId = requestAnimationFrame(detectGesture);
}

// Analyze the frame to identify gestures based on color and shape
function analyzeFrame(imageData, width, height) {
    // This is a simplified approach - in a real implementation, we'd use
    // a neural network for accurate gesture recognition
    
    // For demonstration purposes, we'll use a simple heuristic:
    // Analyze skin tones in the center of the frame and make assumptions
    const data = imageData.data;
    
    // Sample points in the center region of the frame
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    const sampleRadius = 60; // Sample area around center
    
    let skinPixelCount = 0;
    const totalSampledPixels = (sampleRadius * 2) * (sampleRadius * 2);
    
    // Count skin-colored pixels in the center
    for (let y = centerY - sampleRadius; y < centerY + sampleRadius; y++) {
        for (let x = centerX - sampleRadius; x < centerX + sampleRadius; x++) {
            if (x >= 0 && x < width && y >= 0 && y < height) {
                const idx = (y * width + x) * 4; // 4 components per pixel (RGBA)
                
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                
                // Heuristic for detecting skin color (varies by skin tone)
                // R and G values are typically higher than B for skin tones
                if (r > 50 && g > 40 && b > 30 && r > b && g > b && 
                    r < 220 && g < 200 && b < 180) { // Keep it within realistic skin tone range
                    skinPixelCount++;
                }
            }
        }
    }
    
    // If we detect a significant amount of skin color, assume a hand is present
    const skinRatio = skinPixelCount / totalSampledPixels;
    
    if (skinRatio > 0.20) { // At least 20% skin-colored pixels in center
        // To differentiate between rock, paper, scissors, we could implement
        // more complex shape analysis, but for this demo we'll make educated guesses
        // based on the amount of skin pixels detected (simplified approach)
        
        // More skin pixels might suggest an open palm (paper)
        // Fewer skin pixels might suggest more complex shapes (scissors or rock)
        if (skinRatio > 0.40) {
            // High skin ratio likely means open palm
            return 'paper';
        } else if (skinRatio > 0.25) {
            // Medium skin ratio could be rock (closed fist)
            return 'rock';
        } else {
            // Lower skin ratio might mean complex shape like scissors
            return 'scissors';
        }
    } else {
        return 'unknown';
    }
}

// Event listeners for camera
startCameraBtn.addEventListener('click', startCamera);
stopCameraBtn.addEventListener('click', stopCamera);

// Event listeners for manual buttons
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
resetBtn.addEventListener('click', resetGame);

// Initialize displays
playerSelectionEl.innerHTML = '<div class="selection">?</div>';
computerSelectionEl.innerHTML = '<div class="selection">?</div>';