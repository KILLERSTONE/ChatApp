document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');

    function addMessageToChat(message) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messagesContainer.appendChild(messageElement);
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('sendMessage', { sender: 'User', content: message });
            messageInput.value = '';
        }
    }

    // Event listener for send button click
    sendButton.addEventListener('click', sendMessage);

    // Event listener for Enter key press in the message input
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listener for receiving a message from the server
    socket.on('receiveMessage', (message) => {
        addMessageToChat(`${message.sender}: ${message.content}`);
    });
});
