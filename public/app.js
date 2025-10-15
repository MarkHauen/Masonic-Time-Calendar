// API Configuration
const API_BASE = window.location.origin;
const UPDATE_INTERVAL = 1000; // Update every second

// Elements
const gregorianTimeEl = document.getElementById('gregorianTime');
const gregorianDateEl = document.getElementById('gregorianDate');

// Masonic calendar elements
const calendars = ['AL', 'AM', 'AI', 'ADep', 'AO', 'AB'];
const calendarElements = {};

calendars.forEach(cal => {
    calendarElements[cal] = {
        year: document.getElementById(`${cal}-year`),
        date: document.getElementById(`${cal}-date`)
    };
});

// Update local time display
function updateLocalTime() {
    const now = new Date();
    
    // Update Gregorian time
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    gregorianTimeEl.textContent = timeString;
}

// Fetch and update all times from API
async function updateAllTimes() {
    try {
        const response = await fetch(`${API_BASE}/api/times`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch times');
        }
        
        const data = await response.json();
        
        // Update Gregorian date
        gregorianDateEl.textContent = data.gregorian.date;
        
        // Update Masonic calendars
        Object.keys(data.masonic).forEach(calendar => {
            const calData = data.masonic[calendar];
            const elements = calendarElements[calendar];
            
            if (elements) {
                // Animate the update
                elements.year.classList.add('loading');
                elements.date.classList.add('loading');
                
                setTimeout(() => {
                    elements.year.textContent = calData.year;
                    elements.date.textContent = calData.date;
                    elements.year.classList.remove('loading');
                    elements.date.classList.remove('loading');
                }, 200);
            }
        });
        
    } catch (error) {
        console.error('Error updating times:', error);
        gregorianDateEl.textContent = 'Error loading data';
    }
}

// Add entrance animation to cards
function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.calendar-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Initialize
async function init() {
    console.log('🔺 Masonic Time Portal Initialized');
    
    // Initial load
    await updateAllTimes();
    
    // Animate cards
    animateCardsOnLoad();
    
    // Update local time every second
    setInterval(updateLocalTime, 1000);
    
    // Update API data every second (for date changes at midnight)
    setInterval(updateAllTimes, UPDATE_INTERVAL);
    
    // Initial time display
    updateLocalTime();
}

// Check API health on load
async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();
        console.log('✓ Service health check:', data);
    } catch (error) {
        console.error('✗ Service health check failed:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        checkHealth();
        init();
    });
} else {
    checkHealth();
    init();
}

// Add keyboard shortcuts for fun
document.addEventListener('keydown', (e) => {
    // Press 'L' for Light mode toggle (easter egg)
    if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
        document.body.style.filter = document.body.style.filter === 'invert(1)' ? '' : 'invert(1)';
    }
    
    // Press 'R' to refresh data
    if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
        e.preventDefault();
        updateAllTimes();
        console.log('🔄 Times refreshed');
    }
});
