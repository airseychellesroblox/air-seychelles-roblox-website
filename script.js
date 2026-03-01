// Initialize Supabase
const supabaseUrl = 'https://nmzccyjvlvuukugikbfd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temNjeWp2bHZ1dWt1Z2lrYmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODMxNzMsImV4cCI6MjA4Nzk1OTE3M30.Ix9qxfozxXtSrkR3uTt29pE0ZtfqFFrBGc9gxxusnHU';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Check active announcements
async function loadAnnouncement() {
    const { data, error } = await supabase.from('announcements').select('*').eq('is_active', true).limit(1);
    const bar = document.getElementById('announcement-bar');
    if (data && data.length > 0) {
        bar.innerHTML = data[0].message;
        bar.style.display = 'block';
    } else {
        bar.style.display = 'none';
    }
}

// Homepage Booking Widget Tab Switcher
function switchBookingTab(tabId) {
    document.getElementById('tab-book').classList.add('hidden-tab');
    document.getElementById('tab-manage').classList.add('hidden-tab');
    document.getElementById('tab-checkin').classList.add('hidden-tab');
    
    // Reset button styles
    document.querySelectorAll('.booking-btn').forEach(btn => btn.classList.remove('border-b-4', 'border-blue-600', 'text-blue-600'));
    
    // Show selected tab
    document.getElementById(`tab-${tabId}`).classList.remove('hidden-tab');
    document.getElementById(`btn-${tabId}`).classList.add('border-b-4', 'border-blue-600', 'text-blue-600');
}

// Run functions on load
window.addEventListener('DOMContentLoaded', () => {
    loadAnnouncement();
});
