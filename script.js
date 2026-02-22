// --- 1. SUPABASE CONNECTION ---
// Replace these with your actual Supabase URL and Anon Key!
const supabaseUrl = 'https://vrfvkfmvusirmolznrvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZnZrZm12dXNpcm1vbHpucnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODU3MzcsImV4cCI6MjA4NzM2MTczN30.U6HXhL2VpemL_NNofvx2-q5nqG7ddw_Dp0pgn5AeFAc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- 2. COMPONENT INJECTION ---
async function loadComponents() {
    const navResponse = await fetch('components/navbar.html');
    document.getElementById('navbar-placeholder').innerHTML = await navResponse.text();

    const footResponse = await fetch('components/footer.html');
    document.getElementById('footer-placeholder').innerHTML = await footResponse.text();
    
    // Attach newsletter listener AFTER footer is loaded
    attachNewsletterListener();
}
loadComponents();

// --- 3. MODERN DISCLAIMER MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('disclaimer-modal');
    
    // Check if they already accepted it recently
    if (!localStorage.getItem('airSeychellesDisclaimerAccepted')) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
});

// This function is called directly by the HTML button
function closeDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    
    // 1. Trigger the CSS fade out transition
    modal.style.opacity = '0'; 
    
    // 2. Wait for the fade to finish (400ms), then remove it and save to storage
    setTimeout(() => {
        modal.style.display = 'none';
        localStorage.setItem('airSeychellesDisclaimerAccepted', 'true');
    }, 400); 
}

// --- 4. WIDGET TABS ---
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.widget-form').forEach(f => f.classList.remove('active-form'));
    document.getElementById('booking-results').style.display = 'none';

    if(tabName === 'flights') {
        document.querySelectorAll('.tab')[0].classList.add('active');
        document.getElementById('flights-form').classList.add('active-form');
    } else if (tabName === 'manage') {
        document.querySelectorAll('.tab')[1].classList.add('active');
        document.getElementById('manage-form').classList.add('active-form');
    }
}

// --- 5. SUPABASE: MANAGE BOOKING SEARCH ---
document.getElementById('search-booking-btn').addEventListener('click', async () => {
    const pnr = document.getElementById('pnr-input').value.toUpperCase();
    const resultsDiv = document.getElementById('booking-results');
    
    if(!pnr) {
        resultsDiv.innerHTML = '<p style="color:red;">Please enter a PNR.</p>';
        resultsDiv.style.display = 'block';
        return;
    }

    resultsDiv.innerHTML = '<p>Searching...</p>';
    resultsDiv.style.display = 'block';

    // Query the bookings table
    const { data, error } = await supabase
        .from('bookings')
        .select(`*, flights (flight_number, departure_airport, arrival_airport, status)`)
        .eq('pnr', pnr)
        .single();

    if (error || !data) {
        resultsDiv.innerHTML = `<p style="color:red;">No booking found for PNR: ${pnr}</p>`;
    } else {
        resultsDiv.innerHTML = `
            <div style="background:#f8f9fa; padding:15px; border-radius:5px; border-left: 4px solid #005b9f;">
                <h4>Booking Confirmed: ${data.roblox_username}</h4>
                <p><strong>Flight:</strong> ${data.flights.flight_number} (${data.flights.departure_airport} ➔ ${data.flights.arrival_airport})</p>
                <p><strong>Status:</strong> ${data.status} | <strong>Class:</strong> ${data.travel_class}</p>
                <button class="btn btn-primary" style="margin-top:10px; padding:8px 15px;">Proceed to Online Check-In</button>
            </div>
        `;
    }
});

// --- 6. SUPABASE: NEWSLETTER SIGNUP ---
function attachNewsletterListener() {
    const form = document.getElementById('newsletter-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            const msgDiv = document.getElementById('newsletter-msg');
            
            msgDiv.innerHTML = "Subscribing...";
            
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email: email }]);
                
            if (error) {
                msgDiv.innerHTML = `<span style="color:red;">Error or already subscribed.</span>`;
            } else {
                msgDiv.innerHTML = `<span style="color:white; font-weight:bold;">Subscribed successfully!</span>`;
                form.reset();
            }
        });
    }
}
