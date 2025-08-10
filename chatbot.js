// Basic chatbot logic. You can expand this with APIs, etc.
function getChatbotResponse(userInput) {
    userInput = userInput.toLowerCase();
    if (userInput.includes('hello') || userInput.includes('hi')) {
        return "Hello! I'm here to listen. What's on your mind today?";
    }
    if (userInput.includes('sad')) {
        return "I'm sorry you're feeling sad. Would you like to talk more about it?";
    }
    // Add more keyword checks or integrate with an API here
    return "I'm here for you. Share anything you'd like.";
}

// Export if using modules (optional)
if (typeof module !== 'undefined') module.exports = { getChatbotResponse };
