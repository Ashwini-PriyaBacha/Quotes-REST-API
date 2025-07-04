// Set up when page loads
window.onload = function() {
    // Show today's date
    document.getElementById('date-display').textContent = new Date().toDateString();
    
    // Set up button click handler
    document.getElementById('new-quote').onclick = getQuote;
};

// Function to get a quote from the API
async function getQuote() {
    try {
        // Show loading message
        document.getElementById('quote-text').textContent = "Loading quote...";
        
        // Fetch the quote
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        // Display the quote and author
        document.getElementById('quote-text').textContent = `"${data.content}"`;
        document.getElementById('author-name').textContent = `— ${data.author}`;
        
        // Display tags (if any)
        const tagsDiv = document.getElementById('tags-container');
        tagsDiv.innerHTML = '';
        if (data.tags && data.tags.length > 0) {
            data.tags.forEach(tag => {
                tagsDiv.innerHTML += `<span class="tag">${tag}</span>`;
            });
        }
        
    } catch (error) {
        // Show error message
        document.getElementById('quote-text').textContent = "Couldn't load quote. Please try again.";
        console.error('Error fetching quote:', error);
    }
}