// Function to switch tabs on the booking widget
function switchTab(tabName) {
    // 1. Remove active class from all tabs and forms
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.widget-form');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    forms.forEach(form => form.classList.remove('active-form'));

    // 2. Add active class to the clicked tab based on text content
    if(tabName === 'flights') {
        tabs[0].classList.add('active');
        document.getElementById('flights-form').classList.add('active-form');
    } else if (tabName === 'manage') {
        tabs[1].classList.add('active');
        document.getElementById('manage-form').classList.add('active-form');
    } else if (tabName === 'checkin') {
        tabs[2].classList.add('active');
        // We will build the Check-In form in the next step, using Manage for now
        document.getElementById('manage-form').classList.add('active-form'); 
    }
}

// Supabase Initialization Skeleton (Ready for Phase 2)
// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
// const supabase = supabase.createClient(supabaseUrl, supabaseKey);
