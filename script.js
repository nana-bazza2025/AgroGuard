const sectionOrder = ['home', 'seed-sure', 'vet-connect', 'market', 'plant-doctor', 'agromall', 'farm-manager', 'finances', 'profile'];
let activeSectionId = 'home';

// --- Navigation & Menu Logic ---
function toggleMenu() {
    const hamburger = document.getElementById('hamburger-btn');
    const navContainer = document.getElementById('nav-container');
    if (hamburger && navContainer) {
        hamburger.classList.toggle('active');
        navContainer.classList.toggle('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger-btn');
    const navContainer = document.getElementById('nav-container');
    if (navContainer && navContainer.classList.contains('active')) {
        if (!navContainer.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    }
});

function showSection(sectionId) {
    activeSectionId = sectionId;

    // Remove active class from all sections
    document.querySelectorAll('.section-view').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Update active state in ALL nav links (drawer and desktop)
    document.querySelectorAll('.nav-links a, .desktop-nav a').forEach(link => {
        link.classList.remove('active');

        // Match by function call or data attribute
        const isDrawerMatch = link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${sectionId}'`);
        const isDesktopMatch = link.getAttribute('data-section') === sectionId;

        if (isDrawerMatch || isDesktopMatch) {
            link.classList.add('active');
        }
    });

    // Update floating navigation ordering (if applicable)
    updateFloatingNavVisibility();
    // Update floating navigation buttons
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const currentIndex = sectionOrder.indexOf(activeSectionId);
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    // Get adjacent section names for tooltips or labels
    const prevIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
    const nextIndex = (currentIndex + 1) % sectionOrder.length;

    const prevLabel = sectionOrder[prevIndex].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const nextLabel = sectionOrder[nextIndex].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    if (prevBtn) prevBtn.setAttribute('title', `Go to ${prevLabel}`);
    if (nextBtn) nextBtn.setAttribute('title', `Go to ${nextLabel}`);
}

function navigatePage(direction) {
    const currentIndex = sectionOrder.indexOf(activeSectionId);
    let nextIndex;

    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % sectionOrder.length;
    } else {
        nextIndex = (currentIndex - 1 + sectionOrder.length) % sectionOrder.length;
    }

    showSection(sectionOrder[nextIndex]);
}

// Seed Sure Logic
function handleSeedSure(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const soil = document.getElementById('soil-type').value;
    const season = document.getElementById('season').value;

    const resultsDiv = document.getElementById('seedsure-results');
    resultsDiv.style.display = "block";

    // Scroll to results
    setTimeout(() => {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    const resultBody = document.getElementById('seedsure-result-body');

    // Simple mocked logic
    let crops = "Maize, Cassava, and Yams";
    let soilPrep = "Ensure the soil is well-tilled and enriched with organic compost.";

    if (soil === 'sandy') {
        crops = "Groundnuts, Millet, and Watermelon";
        soilPrep = "Sandy soil drains quickly. Mix in plenty of organic matter (manure) to help retain moisture and nutrients.";
    } else if (soil === 'clay') {
        crops = "Rice and Cabbage";
        soilPrep = "Clay soil retains water. Focus on improving drainage to prevent root rot. Consider raised beds.";
    }

    let seasonAdvice = "The rain provides natural irrigation. Ensure proper spacing to avoid fungal growth.";
    if (season === 'dry') {
        crops = "Tomatoes, Peppers, and Onions";
        seasonAdvice = "During the dry season, consistent irrigation is vital. Mulch around your plants to keep the soil cool and moist.";
    }

    resultBody.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
            <div>
                <h4 style="color: var(--primary-color); margin-bottom: 1rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 0.5rem;">
                    <i class="fa-solid fa-leaf"></i> Recommended Crops
                </h4>
                <p style="font-size: 1.1rem; font-weight: 500; color: #333; line-height: 1.6;">${crops}</p>
                <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">Based on <strong>${location}</strong> regional data.</p>
            </div>
            <div>
                <h4 style="color: #fb8c00; margin-bottom: 1rem; border-bottom: 2px solid #f0f0f0; padding-bottom: 0.5rem;">
                    <i class="fa-solid fa-shovels"></i> Soil Preparation
                </h4>
                <p style="font-size: 0.95rem; color: #555; line-height: 1.6;">${soilPrep}</p>
            </div>
            <div style="grid-column: 1 / -1;">
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--accent-color);">
                    <h4 style="margin-bottom: 0.5rem; color: var(--primary-dark);">Expert Seasonal Tip</h4>
                    <p style="font-size: 0.95rem; color: #555; line-height: 1.6;">${seasonAdvice}</p>
                </div>
            </div>
        </div>
        <div style="margin-top: 2rem; text-align: center; border-top: 1px solid #eee; padding-top: 1.5rem;">
            <p style="color: #999; font-size: 0.8rem;">Disclaimer: These recommendations are based on standard agricultural patterns in Nigeria. For professional large-scale farming, conduct a laboratory soil test.</p>
        </div>
    `;
}

// --- Vet Connect Logic ---
// --- AI Chat Helper ---
function appendChatMessage(containerId, text, sender) {
    const chatMessages = document.getElementById(containerId);
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

// --- Vet Connect Logic (Dr.B) ---
async function handleVetChat(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('vet-input');
    const text = input.value.trim();
    if (!text) return;

    // Add User Message
    appendChatMessage('vet-chat-messages', text, 'user');
    input.value = '';

    // Simulate AI Response
    const loadingMsg = appendChatMessage('vet-chat-messages', "Dr.B is carefully analyzing your message...", 'ai');

    setTimeout(() => {
        let response = "I'm sorry, but I'm having a bit of trouble identifying that specific symptom from the description provided. To be safe, I recommend you monitor the animal's temperature and hydration level closely. Please keep them in a clean, isolated area and reach out to a local veterinarian if you don't see an improvement within the next 24 hours.";
        const lowerText = text.toLowerCase();

        // Friendly / Normal Chat Handling
        if (lowerText.match(/^(hi|hello|hey|greetings|good\s+morning|good\s+afternoon|good\s+evening)/)) {
            response = "Hello! I'm Dr. B, your veterinary assistant. How can I help you and your animals today? Are you noticing any unusual symptoms in your livestock?";
        } else if (lowerText.includes('how are you') || lowerText.includes('how\'re you') || lowerText.includes('how you doing')) {
            response = "I'm doing great, thank you for asking! I'm ready to help you diagnose any animal health issues. What's on your mind today?";
        } else if (lowerText.match(/^(thanks|thank you|thx|appreciate)/)) {
            response = "You're very welcome! I'm here whenever you need advice for your farm. Wishing you and your animals the best of health!";
        } else if (lowerText.match(/^(bye|goodbye|see you)/)) {
            response = "Goodbye! Take good care of your animals. I'm here if you need any more health advice later!";
        } else if (lowerText.includes('help')) {
            response = "I can help you diagnose animal health issues. Just describe what's wrong (e.g., 'my cow is limping' or 'pig has no appetite') and I'll provide advice.";
        } else if (lowerText.includes('who are you') || lowerText.includes('what do you do')) {
            response = "I am Dr. B, your AI Veterinary Assistant. I can help you identify common livestock diseases based on symptoms and provide immediate first-aid advice.";
        }
        // Diagnostic Handling
        else if (lowerText.includes('limping') || lowerText.includes('leg') || lowerText.includes('foot')) {
            response = "I'm sorry to hear your animal is having trouble moving. This often indicates **Foot Rot** or a physical injury. \n\n" +
                "**Recommended Action:** Start by cleaning the affected hoof thoroughly with a copper sulfate solution or dilute iodine. It is crucial to move the animal to a dry, clean area immediately. \n\n" +
                "**Clinical Note:** If the infection is bacterial, a vet may need to prescribe an antibiotic like Oxytetracycline. I'd suggest checking for any foul odors or swelling around the hoof during cleaning.";
        } else if (lowerText.includes('appetite') || lowerText.includes('eating') || lowerText.includes('refusing food')) {
            response = "It's always concerning when an animal loses its appetite. This could be a sign of a **Fever or Bloat**. \n\n" +
                "**First Step:** Please check the rectal temperature (Normal for cattle should be between 38.5°C and 39.5°C). For suspected bloat, you can administer 500ml of vegetable oil or a dedicated anti-bloat drench. \n\n" +
                "**Professional Advice:** Ensure they have access to fresh water and avoid any sudden changes in their diet which often triggers these issues.";
        } else if (lowerText.includes('cough') || lowerText.includes('breath') || lowerText.includes('sneezing')) {
            response = "Respiratory distress such as coughing should be addressed quickly to prevent the spread of **Pneumonia**. \n\n" +
                "**Immediate Measures:** Isolate the animal from the rest of the herd to a warm, well-ventilated, but draft-free shelter. \n\n" +
                "**Suggested Treatment:** A broad-spectrum antibiotic is usually required for a cure, which should be administered under a vet's supervision. Adding vitamin supplements to their feed can also help boost their recovery.";
        } else if (lowerText.includes('diarrhea') || lowerText.includes('stool') || lowerText.includes('running')) {
            response = "Diarrhea, or 'scouring', can lead to dangerous levels of dehydration in livestock. This is often linked to **Coccidiosis**. \n\n" +
                "**Action Plan:** Provide oral rehydration salts or electrolytes immediately to keep them hydrated. You may need Sulfa-based medications to treat the underlying infection. \n\n" +
                "**Hygiene Tip:** Please disinfect the pen floor and water troughs to break the cycle of reinfection.";
        } else if (lowerText.includes('eye') || lowerText.includes('blind') || lowerText.includes('tears')) {
            response = "Issue with the eyes, especially tearing or cloudiness, is likely **Pinkeye**, which is quite contagious. \n\n" +
                "**Management:** Apply a veterinary antibiotic eye ointment twice daily. It's very helpful to keep the animal in a shaded area as sunlight can aggravate the condition. \n\n" +
                "**Note:** Flies are the main carriers of this bacteria, so implementing fly control measures in your pen is a key preventive step.";
        }

        loadingMsg.innerHTML = response.replace(/\n/g, '<br>');
    }, 1500);
}

// --- Plant Doctor AI Logic ---
async function handlePlantChat(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('plant-input');
    const text = input.value.trim();
    if (!text) return;

    // Add User Message
    appendChatMessage('plant-chat-messages', text, 'user');
    input.value = '';

    // Simulate AI Response
    const loadingMsg = appendChatMessage('plant-chat-messages', "The Plant Doctor is looking at your message...", 'ai');

    setTimeout(() => {
        let response = "I'll need a few more details to provide a precise diagnosis. For now, I recommend pruning any clearly diseased foliage and monitoring the soil's moisture. Please let me know if you notice any specific patterns or insect activity.";
        const lowerText = text.toLowerCase();

        // Friendly / Normal Chat Handling
        if (lowerText.match(/^(hi|hello|hey|greetings|good\s+morning|good\s+afternoon|good\s+evening)/)) {
            response = "Greetings from the Plant Doctor! I'm here to help your garden and crops thrive. Are you noticing any interesting spots, wilting, or pests on your plants today?";
        } else if (lowerText.includes('how are you') || lowerText.includes('how\'re you') || lowerText.includes('how you doing')) {
            response = "I'm feeling as green and vibrant as a healthy leaf! How are your plants doing? I'm ready to help with any symptoms you've noticed.";
        } else if (lowerText.match(/^(thanks|thank you|thx|appreciate)/)) {
            response = "You're most welcome! Happy to help your plants stay healthy. May your harvest be plentiful! Let me know if anything else comes up.";
        } else if (lowerText.match(/^(bye|goodbye|see you)/)) {
            response = "Goodbye! Happy farming, and I hope your crops grow strong. Come back if you see any more spots or pests!";
        } else if (lowerText.includes('help')) {
            response = "I'm here to identify plant diseases. Tell me about yellow leaves, holes, spots, or wilting, and I'll give you a diagnosis and treatment plan.";
        } else if (lowerText.includes('who are you') || lowerText.includes('what do you do')) {
            response = "I am the AI Plant Doctor. You can describe your plant's symptoms to me, and I will try to identify the disease and suggest organic or chemical treatments.";
        }
        // Diagnosis Handling
        else if (lowerText.includes('yellow') || lowerText.includes('pale')) {
            response = "Based on the yellowing you described, your plant likely has a **Nitrogen Deficiency** or is being over-watered. \n\n" +
                "**Treatment:** I recommend applying a Nitrogen-rich fertilizer like Urea or NPK 15-15-15. Organic options like poultry manure also work well. \n\n" +
                "**Pro-Tip:** If the soil feels exceptionally wet, reduce your watering schedule and ensure the pots or beds have proper drainage.";
        } else if (lowerText.includes('hole') || lowerText.includes('eaten') || lowerText.includes('insect')) {
            response = "Visible holes in the leaves are a classic sign of a **Pest Infestation**, likely caterpillars or beetles. \n\n" +
                "**Management:** A Neem Oil solution is a great organic remedy. For more persistent pests, you may need a specialized insecticide. \n\n" +
                "**Daily Action:** I suggest manually inspecting the underside of the leaves every morning and removing any visible insects by hand.";
        } else if (lowerText.includes('spot') || lowerText.includes('brown') || lowerText.includes('black')) {
            response = "Those spots sound like a **Fungal Infection** or Blight, which often thrives in humid conditions. \n\n" +
                "**Remedy:** Applying a copper-based fungicide or even a simple baking soda spray can help manage the spread. \n\n" +
                "**Prevention:** Avoid watering from above the foliage. Aim the water directly at the roots to keep the leaves dry, and ensure your plants aren't too crowded.";
        } else if (lowerText.includes('wilt') || lowerText.includes('dropping')) {
            response = "Wilting can be tricky as it could be either **Water Stress or Bacterial Wilt**. \n\n" +
                "**Check:** If the soil is dry 2 inches deep, your plant just needs a deep watering. However, if the soil is wet and it's still wilting, it might be bacterial. \n\n" +
                "**Note:** For bacterial wilt, there's no easy cure; it's often best to remove the affected plant to protect the surrounding crop.";
        }

        loadingMsg.innerHTML = response.replace(/\n/g, '<br>');
    }, 1500);
}

// --- Vaccine Reminder Logic ---
function openVaccineModal() {
    document.getElementById('vaccine-modal').classList.add('active');
}

function closeVaccineModal() {
    document.getElementById('vaccine-modal').classList.remove('active');
}

function handleAddVaccine(event) {
    event.preventDefault();
    const animal = document.getElementById('vac-animal').value;
    const reason = document.getElementById('vac-reason').value;
    const dateInput = document.getElementById('vac-date').value;

    if (!animal || !dateInput) return;

    // Calculate days due (simplified)
    const due = new Date(dateInput);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let dueText = "";
    let color = "initial";

    if (diffDays < 0) {
        dueText = "Overdue";
        color = "red";
    } else if (diffDays === 0) {
        dueText = "Today";
        color = "red";
    } else if (diffDays === 1) {
        dueText = "Tomorrow";
        color = "orange";
    } else {
        dueText = `Due in ${diffDays} days`;
        color = "var(--primary-color)";
    }

    const li = document.createElement('li');
    li.style.padding = '0.5rem 0';
    li.style.borderBottom = '1px solid #eee';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.innerHTML = `
        <span>${reason} <small style="color:#666">(${animal})</small></span>
        <span style="color: ${color}; font-weight: bold;">${dueText}</span>
    `;

    document.getElementById('vaccine-list').appendChild(li);

    // Highlight for visual feedback
    const originalBg = li.style.backgroundColor;
    li.style.backgroundColor = '#fff8e1'; // Light yellow highlight
    li.style.transition = 'background-color 1s ease';

    setTimeout(() => {
        li.style.backgroundColor = originalBg || 'transparent';
    }, 2000);

    event.target.reset();
    closeVaccineModal();
}

// --- Schedule Manager Logic ---
function openScheduleModal() {
    document.getElementById('schedule-modal').classList.add('active');
}

function closeScheduleModal() {
    document.getElementById('schedule-modal').classList.remove('active');
}

function handleAddSchedule(event) {
    event.preventDefault();
    const type = document.getElementById('sched-type').value;
    const title = document.getElementById('sched-title').value;
    const details = document.getElementById('sched-details').value;
    const date = document.getElementById('sched-date').value;
    const priority = document.getElementById('sched-priority').value;

    const newSchedule = {
        id: Date.now(),
        type,
        title,
        details,
        date,
        priority
    };

    // Save to LocalStorage
    const stored = localStorage.getItem('agroSchedules');
    const schedules = stored ? JSON.parse(stored) : [];
    schedules.push(newSchedule);
    localStorage.setItem('agroSchedules', JSON.stringify(schedules));

    // Render
    renderScheduleItem(newSchedule);

    closeScheduleModal();
    event.target.reset();
}

function renderScheduleItem(schedule) {
    const listId = schedule.type === 'Pesticide' ? 'pesticide-log-list' : 'fertilizer-schedule-list';
    const targetList = document.getElementById(listId);
    if (!targetList) return;

    const dateObj = new Date(schedule.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

    const li = document.createElement('li');
    li.className = `schedule-item ${schedule.priority === 'urgent' ? 'urgent' : ''}`;
    li.style.animation = 'fadeIn 0.5s ease';

    li.innerHTML = `
        <div class="date-box">
            <span class="day">${day}</span>
            <span class="month">${month}</span>
        </div>
        <div class="schedule-details">
            <h4>${schedule.title}</h4>
            <p>${schedule.details}</p>
        </div>
    `;

    // Prepend to show newest first if desired, or just append
    targetList.appendChild(li);
}

function loadSchedules() {
    const stored = localStorage.getItem('agroSchedules');
    if (stored) {
        const schedules = JSON.parse(stored);
        schedules.forEach(renderScheduleItem);
    }
}

// --- Plant Doctor Logic ---
function handlePlantDoctor(event) {
    event.preventDefault();
    const symptom = document.getElementById('plant-symptom').value.toLowerCase();
    const resultDiv = document.getElementById('plant-diagnosis-result');
    const resultText = document.getElementById('plant-diagnosis-text');

    resultDiv.style.display = 'block';

    let diagnosis = "It's difficult to be certain without an image, but this sounds like a general stress response.";

    if (symptom.includes('yellow') || symptom.includes('pale')) {
        diagnosis = "<strong>Nitrogen Deficiency:</strong> Older leaves turn pale yellow. <br><strong>Remedy:</strong> Apply nitrogen-rich fertilizer or manure.";
    } else if (symptom.includes('hole') || symptom.includes('bite')) {
        diagnosis = "<strong>Pest Infestation (e.g., Stem Borers):</strong> Visible holes in leaves/stems. <br><strong>Remedy:</strong> Apply Neem oil or appropriate organic pesticide.";
    } else if (symptom.includes('spot') || symptom.includes('brown')) {
        diagnosis = "<strong>Leaf Blight / Fungal Infection:</strong> Brown spots with yellow halos. <br><strong>Remedy:</strong> Avoid overhead irrigation and apply fungicide if severe.";
    }

    resultText.innerHTML = diagnosis;
}

// --- Produce Modal Logic ---
function openProduceModal() {
    document.getElementById('produce-modal').classList.add('active');
}

function closeProduceModal() {
    document.getElementById('produce-modal').classList.remove('active');
}

function handlePostProduce(event) {
    event.preventDefault();
    const item = document.getElementById('produce-item').value;
    const qty = document.getElementById('produce-qty').value;
    const price = document.getElementById('produce-price').value;
    const loc = document.getElementById('produce-loc').value;

    // Simulate upload/posting
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Posting Produce...';

    setTimeout(() => {
        alert(`SUCCESS!\n\nYour ${item} (${qty}) has been listed for ₦${parseFloat(price).toLocaleString()} in ${loc}.\n\nBuyers will be able to see your listing and contact you directly.`);

        btn.disabled = false;
        btn.innerHTML = originalText;
        event.target.reset();
        closeProduceModal();
    }, 1500);
}

// --- Market Feature (Farm to Home) ---
function showMarketSection(section) {
    // Hide all market content
    const contents = document.getElementsByClassName('market-content');
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }

    // Show selected
    document.getElementById(`market-${section}`).style.display = 'block';

    // Update buttons
    const buttons = document.querySelectorAll('#market .btn-outline-sm'); // Needs specific selector
    // ... logic to toggle active class on buttons if we added that CSS ...
}

function handleContactBuyer() {
    alert("Buyer details have been sent to your email!");
}

function openBuyerDirectoryModal() {
    document.getElementById('buyer-directory-modal').classList.add('active');
    renderBuyerDirectory();
}

function closeBuyerDirectoryModal() {
    document.getElementById('buyer-directory-modal').classList.remove('active');
}

// --- User Database (Simulated) ---
const userDatabase = {
    farmers: [],
    customers: []
};

// --- Farmer Signup Logic ---
function openFarmerSignupModal() {
    document.getElementById('farmer-signup-modal').classList.add('active');
}

function closeFarmerSignupModal() {
    document.getElementById('farmer-signup-modal').classList.remove('active');
}

function handleFarmerSignup(event) {
    event.preventDefault();
    const name = document.getElementById('farmer-name').value;
    const password = document.getElementById('farmer-password').value;

    // Store in dummy DB
    userDatabase.farmers.push({ username: name, password: password });

    alert(`Welcome, ${name}!\n\nYour Farmer Profile has been created successfully.`);
    closeFarmerSignupModal();
}

// --- Buyer Signup Logic ---
function openBuyerSignupModal() {
    document.getElementById('buyer-signup-modal').classList.add('active');
}

function closeBuyerSignupModal() {
    document.getElementById('buyer-signup-modal').classList.remove('active');
}

function handleBuyerSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-buyer-name').value;
    const password = document.getElementById('signup-buyer-password').value;

    // Store in dummy DB
    userDatabase.customers.push({ username: name, password: password });

    alert(`Welcome, ${name}!\n\nYour Buyer Profile has been created successfully.`);
    closeBuyerSignupModal();
}

// --- Login Logic ---
function openLoginModal() {
    document.getElementById('login-modal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}

function switchLoginTab(type) {
    const farmerTab = document.getElementById('tab-farmer');
    const customerTab = document.getElementById('tab-customer');
    const farmerForm = document.getElementById('form-login-farmer');
    const customerForm = document.getElementById('form-login-customer');

    if (type === 'farmer') {
        farmerTab.style.background = 'white';
        farmerTab.style.color = 'var(--primary-color)';
        farmerTab.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

        customerTab.style.background = 'transparent';
        customerTab.style.color = '#666';
        customerTab.style.boxShadow = 'none';

        farmerForm.style.display = 'block';
        customerForm.style.display = 'none';
    } else {
        customerTab.style.background = 'white';
        customerTab.style.color = 'var(--accent-color)'; // Use accent color text for customer tab active state if desired, or just dark text
        customerTab.style.color = '#333';
        customerTab.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

        farmerTab.style.background = 'transparent';
        farmerTab.style.color = '#666';
        farmerTab.style.boxShadow = 'none';

        farmerForm.style.display = 'none';
        customerForm.style.display = 'block';
    }
}

function handleLogin(event, type) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const username = inputs[0].value;
    const password = inputs[1].value;

    let users = [];
    if (type === 'Farmer') {
        users = userDatabase.farmers;
    } else {
        users = userDatabase.customers;
    }

    const validUser = users.find(u => u.username === username && u.password === password);

    if (validUser) {
        alert(`Login Successful!\n\nWelcome back, ${username}.`);
        closeLoginModal();
        event.target.reset();
    } else {
        alert('Access Denied.\n\nIncorrect Username or Password. Please try again or create an account.');
    }
}

// --- Growth Tracker Logic ---
function openGrowthModal() {
    document.getElementById('growth-modal').classList.add('active');
}

function closeGrowthModal() {
    document.getElementById('growth-modal').classList.remove('active');
}

function handleGrowthUpdate(event) {
    event.preventDefault();
    const batch = document.getElementById('growth-batch').value;
    const metric = document.getElementById('growth-metric').value;
    const date = document.getElementById('growth-date').value;
    const notes = document.getElementById('growth-notes').value;
    const resultsDiv = document.getElementById('growth-results-content');

    // Simulate Analysis
    let analysis = "";
    let improvements = "";

    if (batch.includes("Maize")) {
        analysis = "Growth rate is <strong>exceptional</strong>. You are 15% ahead of schedule.";
        improvements = "Ensure nitrogen top-dressing is applied next week to sustain this growth. Monitor for armyworms as the crop canopy closes.";
    } else {
        analysis = "Weight gain is <strong>steady</strong> but slightly below optimal for this breed.";
        improvements = "Consider increasing protein content in the feed by 5%. Ensure deworming schedule is up to date.";
    }

    resultsDiv.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>Analysis for ${batch}:</strong><br>
            <span style="color: #333;">${analysis}</span>
        </div>
        <div style="margin-bottom: 1rem;">
            <strong><i class="fa-solid fa-arrow-up-right-dots"></i> Recommended Improvements:</strong><br>
            <p style="margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.5;">${improvements}</p>
        </div>
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed #aaa; font-size: 0.85rem; color: #666;">
            <strong>Recent Note:</strong> ${notes || "No notes added."} <br>
            <em>Recorded on: ${date}</em>
        </div>
    `;
}

// --- Planting & Harvest Advisor Logic ---
function calculateHarvest(event) {
    event.preventDefault();
    const location = document.getElementById('harvest-location').value;
    const crop = document.getElementById('crop-select').value;
    const plantDateVal = document.getElementById('plant-date').value;
    const resultDiv = document.getElementById('harvest-result');

    if (!plantDateVal || !crop) return;

    const plantDate = new Date(plantDateVal);
    const month = plantDate.getMonth(); // 0-11 (Jan-Dec)
    const isDrySeason = (month >= 10 || month <= 2); // Nov to March

    // Quick region check
    const northernStates = ["Kano", "Kaduna", "Sokoto", "Katsina", "Kebbi", "Jigawa", "Zamfara", "Borno", "Yobe", "Gombe", "Bauchi"];
    const isNorth = northernStates.includes(location);

    let isSuitable = true;
    let warningMessage = "";
    let suggestion = "";
    let durationMonths = 4;

    const cropLower = crop.toLowerCase();

    // Suitability Logic
    if (cropLower.includes('rice')) {
        durationMonths = 5;
        if (isDrySeason && !isNorth) {
            isSuitable = false;
            warningMessage = "Rice requires high water levels, which are scarce during the dry season in southern regions.";
            suggestion = "Consider planting <strong>Vegetables (Fluted Pumpkin)</strong> or <strong>Maize</strong> with irrigation instead.";
        }
    } else if (cropLower.includes('cassava') || cropLower.includes('yam')) {
        durationMonths = cropLower.includes('cassava') ? 12 : 8;
        if (isNorth && isDrySeason) {
            isSuitable = false;
            warningMessage = "The soil in Northern Nigeria might be too hard and dry for root crops like Yam/Cassava during this period.";
            suggestion = "Try planting <strong>Groundnuts</strong> or <strong>Onions</strong> which thrive better in these conditions.";
        }
    } else if (cropLower.includes('cocoa')) {
        durationMonths = 36;
        if (isNorth) {
            isSuitable = false;
            warningMessage = "The Northern climate is generally too arid for Cocoa cultivation.";
            suggestion = "For this region, <strong>Hibiscus (Zobo)</strong> or <strong>Cotton</strong> are excellent commercial alternatives.";
        }
    } else if (cropLower.includes('maize')) {
        durationMonths = 4;
        if (isDrySeason) {
            warningMessage = "Warning: Maize planting in the dry season requires significant irrigation investment.";
        }
    } else if (cropLower.includes('tomato')) {
        durationMonths = 3;
    }

    const harvestDate = new Date(plantDate);
    harvestDate.setMonth(harvestDate.getMonth() + durationMonths);

    resultDiv.style.display = 'block';
    resultDiv.style.marginTop = '1rem';

    if (isSuitable) {
        resultDiv.style.background = '#e8f5e9';
        resultDiv.style.border = '1px solid #c8e6c9';
        resultDiv.innerHTML = `
            <div style="display: flex; gap: 0.8rem; align-items: flex-start;">
                <i class="fa-solid fa-circle-check" style="color: #2e7d32; margin-top: 0.2rem;"></i>
                <div>
                    <h4 style="color: var(--primary-dark); font-size: 0.9rem; margin-bottom: 0.3rem;">Cycle Analysis: Suitable</h4>
                    <p style="font-size: 0.85rem; color: #444; margin-bottom: 0.8rem;">Ready to harvest by <strong>${harvestDate.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}</strong>.</p>
                    ${warningMessage ? `<p style="font-size: 0.75rem; color: #ef6c00; background: #fff3e0; padding: 0.5rem; border-radius: 4px; border-left: 3px solid #ff9800;">Note: ${warningMessage}</p>` : ''}
                </div>
            </div>
        `;
    } else {
        resultDiv.style.background = '#fff3e0';
        resultDiv.style.border = '1px solid #ffe0b2';
        resultDiv.innerHTML = `
            <div style="display: flex; gap: 0.8rem; align-items: flex-start;">
                <i class="fa-solid fa-triangle-exclamation" style="color: #ef6c00; margin-top: 0.2rem;"></i>
                <div>
                    <h4 style="color: #e65100; font-size: 0.9rem; margin-bottom: 0.3rem;">Not Recommended</h4>
                    <p style="font-size: 0.85rem; color: #444; margin-bottom: 0.6rem;">${warningMessage}</p>
                    <div style="background: #e8f5e9; padding: 0.8rem; border-radius: 6px; border-left: 3px solid #4caf50;">
                        <span style="display: block; font-size: 0.75rem; color: #2e7d32; font-weight: bold; margin-bottom: 0.2rem;">Expert Suggestion:</span>
                        <p style="font-size: 0.8rem; color: #2e7d32;">${suggestion}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // --- Update Pesticide & Fertilizer Suggestions ---
    const logList = document.getElementById('pesticide-log-list');
    if (logList) {
        let suggestions = [];
        if (cropLower.includes('maize')) {
            suggestions = [
                { type: "Fertilizer", name: "NPK 15-15-15 / Urea", detail: "Apply Urea at 6 weeks for growth boost" },
                { type: "Pesticide", name: "Cypermethrin", detail: "Protect against Armyworms/Stem Borers" }
            ];
        } else if (cropLower.includes('rice')) {
            suggestions = [
                { type: "Fertilizer", name: "NPK 20-10-10", detail: "Apply during tillering stage" },
                { type: "Pesticide", name: "Carbofuran", detail: "Prevent Gall Midge & Rice Stem Borer" }
            ];
        } else if (cropLower.includes('tomato')) {
            suggestions = [
                { type: "Fertilizer", name: "Calcium Nitrate", detail: "Prevent blossom end rot in Southern soil" },
                { type: "Pesticide", name: "Abamectin", detail: "Control Tuta Absoluta (Tomato Leafminer)" }
            ];
        } else if (cropLower.includes('cassava') || cropLower.includes('yam')) {
            suggestions = [
                { type: "Fertilizer", name: "NPK 12-12-17", detail: "High potassium for better tuber size" },
                { type: "Treatment", name: "Wood Ash / Neem", detail: "Organic protection against root rot/termites" }
            ];
        } else {
            suggestions = [
                { type: "Fertilizer", name: "Organic Compost", detail: "Apply 2 tons per hectare before planting" },
                { type: "Pesticide", name: "Neem Oil Spray", detail: "Natural broad-spectrum pest repellent" }
            ];
        }

        logList.innerHTML = suggestions.map(s => `
            <li class="schedule-item" style="padding: 0.5rem 0; border-left: 4px solid #1b5e20; padding-left: 10px; background: #f1f8e9; margin-bottom: 0.5rem; border-radius: 0 8px 8px 0;">
                <div class="date-box" style="min-width: 60px; padding: 0.2rem; background: #c8e6c9; color: #1b5e20; font-size: 0.7rem; font-weight: bold; text-transform: uppercase;">
                    ${s.type}
                </div>
                <div class="schedule-details">
                    <h4 style="font-size: 0.85rem; color: #1b5e20; margin-bottom: 0.1rem;">${s.name}</h4>
                    <p style="font-size: 0.75rem; color: #2e7d32;">${s.detail}</p>
                </div>
            </li>
        `).join('');
    }
}

// --- Farm to Home Logic ---
function handleHomeOrder(event) {
    event.preventDefault();
    const bundleEl = document.getElementById('home-bundle');
    const product = bundleEl.options[bundleEl.selectedIndex].text;
    const details = document.getElementById('home-details').value;
    const street = document.getElementById('home-address').value;
    const state = document.getElementById('home-state').value;
    const phone = document.getElementById('home-phone').value;

    if (!phone || !state) return;

    const fullAddress = `${street}, ${state} State`;

    // Show success or proceed to payment (simplified for now as requested)
    alert(`Order received for ${product}!\nDelivery Address: ${fullAddress}\nWe will contact you at ${phone} for confirmation.`);
    event.target.reset();
}

function handlePayment(event) {
    event.preventDefault();
    const paySection = document.getElementById('home-payment-section');
    const orderData = JSON.parse(paySection.dataset.orderInfo);

    // Simulate Processing
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    setTimeout(() => {
        alert(`Payment Successful!\n\nOrder Confirmed:\n${orderData.quantity} of ${orderData.product}\n\nWe will contact you at ${orderData.phone} for delivery.`);

        // Reset View
        paySection.style.display = 'none';
        document.getElementById('home-order-section').style.display = 'block';
        document.getElementById('home-form').reset();
        document.getElementById('payment-form').reset();
        btn.innerHTML = originalText;
    }, 2000);
}

function handleAddReview(event) {
    event.preventDefault();
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;

    if (!name || !text) return;

    const list = document.getElementById('reviews-list');

    // Create new review object
    const newReview = {
        name: name,
        text: text,
        date: new Date().toISOString()
    };

    // Save to LocalStorage
    const stored = localStorage.getItem('agroReviews');
    const reviews = stored ? JSON.parse(stored) : getDefaultReviews();
    reviews.unshift(newReview);
    localStorage.setItem('agroReviews', JSON.stringify(reviews));

    // Render locally
    renderSingleReview(newReview, list, true);

    event.target.reset();
}

function getDefaultReviews() {
    return [
        { name: "Mrs. Adebayo, Lekki", text: "The freshness of the veggies I got last week was incredible! Much better than the open market." }
    ];
}

function renderSingleReview(review, listElement, isNew = false) {
    const div = document.createElement('div');
    div.className = 'review-item';

    div.style.background = isNew ? 'white' : 'rgba(33, 150, 243, 0.1)';
    div.style.padding = '1rem';
    div.style.borderRadius = '12px';
    div.style.marginBottom = '1rem';
    div.style.border = isNew ? '1px solid #eee' : '1px dashed #2196f3';
    div.style.boxShadow = isNew ? '0 2px 8px rgba(0,0,0,0.05)' : 'none';

    if (isNew) div.style.animation = 'fadeIn 0.5s ease';

    div.innerHTML = `
        <p style="font-style: italic; color: #555; font-size: 0.9rem;">"${review.text}"</p>
        <div style="margin-top: 0.5rem; font-weight: bold; font-size: 0.8rem; color: ${isNew ? 'var(--primary-color)' : '#1976d2'};">- ${review.name}</div>
    `;

    // Insert at top
    listElement.insertBefore(div, listElement.firstChild);
}

function loadReviews() {
    const list = document.getElementById('reviews-list');
    if (!list) return;

    list.innerHTML = '';

    const stored = localStorage.getItem('agroReviews');
    const reviews = stored ? JSON.parse(stored) : getDefaultReviews();

    // Since we unshift new ones, they are at index 0. 
    // We want to append them in order so the newest is at top?
    // Arrays: [Newest, Older, Oldest]
    // appendChild: Newest (top), Older (below), Oldest (bottom)

    reviews.forEach(r => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.style.background = 'rgba(33, 150, 243, 0.1)';
        div.style.padding = '1rem';
        div.style.borderRadius = '12px';
        div.style.marginBottom = '1rem';
        div.style.border = '1px dashed #2196f3';

        div.innerHTML = `
            <p style="font-style: italic; color: #555; font-size: 0.9rem;">"${r.text}"</p>
            <div style="margin-top: 0.5rem; font-weight: bold; font-size: 0.8rem; color: #1976d2;">- ${r.name}</div>
        `;
        list.appendChild(div);
    });
}

// loadReviews is now handled in the main DOMContentLoaded listener at the end of the file.

// --- Finances Logic ---
let transactions = [];
let budgetGoals = [];

function handleTransactionSubmit(event) {
    event.preventDefault();

    const type = document.getElementById('trans-type').value;
    const desc = document.getElementById('trans-desc').value;
    const amount = parseFloat(document.getElementById('trans-amount').value);
    const date = document.getElementById('trans-date').value;
    const category = document.getElementById('trans-category').value;

    if (!desc || isNaN(amount) || !date) return;

    const transaction = {
        id: Date.now(),
        type,
        desc,
        amount,
        date,
        category: category || 'General'
    };

    transactions.unshift(transaction); // Add to beginning
    saveTransactions();
    updateFinanceUI();
    event.target.reset();
}

function saveTransactions() {
    localStorage.setItem('agroTransactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const stored = localStorage.getItem('agroTransactions');
    if (stored) {
        transactions = JSON.parse(stored);
        updateFinanceUI();
    }
}

function updateFinanceUI() {
    const listEl = document.getElementById('transaction-list');
    const incomeEl = document.getElementById('total-income');
    const expenseEl = document.getElementById('total-expenses');
    const balanceEl = document.getElementById('net-balance');

    // Calculate Totals
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        else totalExpense += t.amount;
    });

    const net = totalIncome - totalExpense;

    // Update Summary Cards
    incomeEl.textContent = `₦${totalIncome.toLocaleString()}`;
    expenseEl.textContent = `₦${totalExpense.toLocaleString()}`;
    balanceEl.textContent = `₦${net.toLocaleString()}`;

    // Color code balance
    if (net >= 0) balanceEl.style.color = '#1565c0'; // Blue
    else balanceEl.style.color = '#c62828'; // Red

    // Update List
    listEl.innerHTML = '';

    if (transactions.length === 0) {
        listEl.innerHTML = '<div style="text-align: center; color: #666; padding: 2rem;">No transactions yet.</div>';
    } else {
        transactions.forEach(t => {
            const item = document.createElement('div');
            item.style.padding = '1rem';
            item.style.borderBottom = '1px solid #eee';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';

            const isIncome = t.type === 'income';
            const color = isIncome ? 'var(--primary-color)' : '#c62828';
            const icon = isIncome ? 'fa-arrow-up' : 'fa-arrow-down';

            item.innerHTML = `
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="background: ${isIncome ? '#e8f5e9' : '#ffebee'}; padding: 0.8rem; border-radius: 50%; color: ${color};">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 0.2rem; font-size: 1rem;">${t.desc}</h4>
                        <span style="font-size: 0.8rem; color: #888;">${t.date} ${t.category ? `• ${t.category}` : ''}</span>
                    </div>
                </div>
                <div style="font-weight: bold; color: ${color};">
                    ${isIncome ? '+' : '-'}₦${t.amount.toLocaleString()}
                </div>
            `;
            listEl.appendChild(item);
        });
    }

    renderBudgetGoals();
}

// --- Budget Goals Logic ---
function openBudgetModal() {
    const modal = document.getElementById('budget-modal');
    modal.classList.add('active');
    // Focus the category input for immediate typing
    setTimeout(() => {
        const input = document.getElementById('budget-category');
        if (input) input.focus();
    }, 100);
}

function closeBudgetModal() {
    document.getElementById('budget-modal').classList.remove('active');
}

function handleBudgetSubmit(event) {
    event.preventDefault();
    const categoryInput = document.getElementById('budget-category');
    const targetInput = document.getElementById('budget-target');

    const category = categoryInput.value.trim();
    const target = parseFloat(targetInput.value);

    if (!category || isNaN(target)) return;

    const newGoal = {
        id: Date.now(),
        category, // Store as entered
        target
    };

    // Case-insensitive check to update existing instead of duplicate
    const existingIndex = budgetGoals.findIndex(g => g.category.toLowerCase() === category.toLowerCase());
    if (existingIndex !== -1) {
        budgetGoals[existingIndex] = newGoal;
    } else {
        budgetGoals.push(newGoal);
    }

    saveBudgetGoals();
    renderBudgetGoals();
    closeBudgetModal();

    // Qualitative Feedback via Chicken AI
    const bubble = document.getElementById('chicken-bubble');
    const textEl = document.getElementById('chicken-text');
    if (bubble && textEl) {
        bubble.classList.add('active');
        textEl.innerHTML = `Cluck! "${category}" budget set to <strong>₦${target.toLocaleString()}</strong>. I'll keep an eye on your spending!`;
        setTimeout(() => bubble.classList.remove('active'), 6000);
    }

    event.target.reset();
}

function saveBudgetGoals() {
    localStorage.setItem('agroBudgetGoals', JSON.stringify(budgetGoals));
}

function loadBudgetGoals() {
    const stored = localStorage.getItem('agroBudgetGoals');
    if (stored) {
        budgetGoals = JSON.parse(stored);
    } else {
        // Initial defaults
        budgetGoals = [
            { id: 1, category: 'Fertilizer', target: 100000 },
            { id: 2, category: 'Seeds', target: 30000 }
        ];
    }
    renderBudgetGoals();
}

function deleteBudget(id) {
    if (confirm('Are you sure you want to delete this budget goal?')) {
        budgetGoals = budgetGoals.filter(g => g.id !== id);
        saveBudgetGoals();
        renderBudgetGoals();
    }
}

function renderBudgetGoals() {
    const container = document.getElementById('budget-goals-container');
    const transCategorySelect = document.getElementById('trans-category');
    if (!container) return;

    container.innerHTML = '';

    // Update Transaction Category Dropdown
    if (transCategorySelect) {
        const currentVal = transCategorySelect.value;
        transCategorySelect.innerHTML = '<option value="General">General</option>';
        budgetGoals.forEach(goal => {
            const opt = document.createElement('option');
            opt.value = goal.category;
            opt.textContent = goal.category;
            transCategorySelect.appendChild(opt);
        });
        transCategorySelect.value = currentVal || 'General';
    }

    if (budgetGoals.length === 0) {
        container.innerHTML = '<div style="text-align: center; color: #666; padding: 1rem;">No budget goals set. Click "+ Add Goal" to start.</div>';
        return;
    }

    budgetGoals.forEach((goal, index) => {
        // Calculate spent for this category (case-insensitive)
        const spent = transactions
            .filter(t => t.type === 'expense' && t.category && t.category.toLowerCase() === goal.category.toLowerCase())
            .reduce((sum, t) => sum + t.amount, 0);

        const percent = Math.min((spent / goal.target) * 100, 100);
        // Green if low, Organic Orange if high, Red if over/critical
        const color = percent >= 100 ? '#ef5350' : (percent > 75 ? '#ffa726' : '#66bb6a');

        const div = document.createElement('div');
        div.className = 'budget-item';
        div.style.marginBottom = '1.2rem';
        div.style.position = 'relative';
        div.style.animation = `fadeIn 0.5s ease backwards ${index * 0.1}s`; // Staggered fade in

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem;">
                <span style="font-weight: 600;">${goal.category}</span>
                <span style="color: #666; font-size: 0.85rem;">₦${spent.toLocaleString()} / ₦${goal.target.toLocaleString()}</span>
            </div>
            <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden; position: relative;">
                <div style="background: ${color}; width: ${percent}%; height: 100%; transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
                <span style="font-size: 0.75rem; font-weight: 500; color: ${percent >= 100 ? '#ef5350' : '#888'};">
                    ${percent >= 100 ? '<i class="fa-solid fa-triangle-exclamation"></i> Over Budget!' : `${Math.round(percent)}% used`}
                </span>
                <button onclick="deleteBudget(${goal.id})" 
                        style="background: none; border: none; color: #ccc; cursor: pointer; font-size: 0.85rem; padding: 2px 5px; transition: color 0.3s;" 
                        onmouseover="this.style.color='#ef5350'" onmouseout="this.style.color='#ccc'"
                        title="Delete Budget">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });
}

// --- Buyer Upload Contact Card Logic ---
function openBuyerUploadModal() {
    document.getElementById('buyer-upload-modal').classList.add('active');
}

function closeBuyerUploadModal() {
    document.getElementById('buyer-upload-modal').classList.remove('active');
}

function handleBuyerContactUpload(event) {
    event.preventDefault();

    const businessName = document.getElementById('buyer-business-name').value;
    const contactPerson = document.getElementById('buyer-contact-person').value;
    const phone = document.getElementById('buyer-phone').value;
    const email = document.getElementById('buyer-email').value;
    const street = document.getElementById('buyer-address').value;
    const state = document.getElementById('buyer-state').value;
    const businessType = document.getElementById('buyer-type').value;
    const products = document.getElementById('buyer-products').value;

    const fullAddress = `${street}, ${state} State`;

    // Create buyer contact object
    const buyerContact = {
        id: Date.now(),
        businessName,
        contactPerson,
        phone,
        email,
        address: fullAddress,
        businessType,
        products,
        dateAdded: new Date().toISOString()
    };

    // Save to localStorage
    const stored = localStorage.getItem('buyerContacts');
    const contacts = stored ? JSON.parse(stored) : getInitialBuyerContacts(); // Use defaults if first record
    contacts.push(buyerContact);
    localStorage.setItem('buyerContacts', JSON.stringify(contacts));

    // Show success message
    alert(`Thank you, ${contactPerson}!\n\nYour contact card for "${businessName}" has been uploaded successfully.\n\nFarmers can now reach you at:\n📞 ${phone}\n📧 ${email}`);

    // Reset form and close modal
    event.target.reset();
    closeBuyerUploadModal();

    // Refresh directory if modal is currently active
    if (document.getElementById('buyer-directory-modal').classList.contains('active')) {
        renderBuyerDirectory();
    }
}

// --- Buyer Directory Search & Render Logic ---
function getInitialBuyerContacts() {
    return [
        {
            id: 1,
            businessName: "Lagos Supermarket Chain",
            contactPerson: "Adewale Okonji",
            phone: "08012345678",
            email: "purchasing@lagos-sm.com",
            address: "Victoria Island, Lagos",
            businessType: "Supermarket",
            products: "Tomatoes, Peppers, Onions, Spinach"
        },
        {
            id: 2,
            businessName: "Green Earth Wholesalers",
            contactPerson: "Fatima Yusuf",
            phone: "08198765432",
            email: "greenearth@wholesale.ng",
            address: "Kano Main Market",
            businessType: "Wholesaler",
            products: "Grains, Maize, Rice, Yam Tubers"
        },
        {
            id: 3,
            businessName: "Mama Nkechi Restaurant",
            contactPerson: "Nkechi Amadi",
            phone: "09055566677",
            email: "mamanmkechi@food.com",
            address: "Enugu-Onitsha Rd",
            businessType: "Restaurant",
            products: "Onions, Spices, Poultry, Fish"
        }
    ];
}

function renderBuyerDirectory(filter = '') {
    const listContainer = document.getElementById('buyer-directory-list');
    if (!listContainer) return;

    const stored = localStorage.getItem('buyerContacts');
    const contacts = stored ? JSON.parse(stored) : getInitialBuyerContacts();

    // Clear list
    listContainer.innerHTML = '';

    const filtered = contacts.filter(buyer => {
        const searchText = filter.toLowerCase();
        return buyer.products.toLowerCase().includes(searchText) ||
            buyer.businessName.toLowerCase().includes(searchText) ||
            buyer.businessType.toLowerCase().includes(searchText);
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fa-solid fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No buyers found matching those requests.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(buyer => {
        const item = document.createElement('div');
        item.style.padding = '1rem';
        item.style.borderBottom = '1px solid #eee';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.backgroundColor = 'white';

        item.innerHTML = `
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.2rem; color: #333;">${buyer.businessName}</h4>
                <p style="font-size: 0.85rem; color: #666; margin-bottom: 0.3rem;">
                    <strong>Wants:</strong> <span style="color: var(--primary-color);">${buyer.products}</span>
                </p>
                <div style="display: flex; gap: 1rem; font-size: 0.75rem; color: #888;">
                    <span><i class="fa-solid fa-building"></i> ${buyer.businessType}</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${buyer.address.split(',')[0]}</span>
                </div>
            </div>
            <button class="btn btn-outline" 
                    style="font-size: 0.8rem; padding: 0.5rem 1.2rem; border-radius: 20px;"
                    onclick="contactBuyer('${buyer.phone}', '${buyer.businessName}')">
                Contact
            </button>
        `;
        listContainer.appendChild(item);
    });
}

function filterBuyerDirectory() {
    const searchTerm = document.getElementById('buyer-search').value;
    renderBuyerDirectory(searchTerm);
}

function contactBuyer(phone, name) {
    alert(`Connecting to ${name}...\n\nCall/WhatsApp: ${phone}\n\nYou can now negotiate your supply deal!`);
}

// --- Daily Fact Rotation Logic ---
const dailyFacts = [
    "Cattle need plenty of clean water. A dairy cow can drink up to 30 to 50 gallons of water a day!",
    "Chickens can recognize over 100 different faces of people or animals, showing remarkable memory.",
    "Goats are excellent climbers and can scale steep, rocky terrain that other livestock cannot navigate.",
    "Pigs are highly intelligent animals and can be trained to perform tricks just like dogs.",
    "A single cow can produce about 6-7 gallons of milk per day, which equals around 200,000 glasses in a lifetime.",
    "Sheep have excellent memories and can remember the faces of other sheep for up to two years.",
    "Honeybees must visit about 2 million flowers to make just one pound of honey.",
    "Rotating crops helps prevent soil depletion and reduces pest and disease buildup in the soil.",
    "Composting farm waste can reduce fertilizer costs by up to 30% while improving soil health.",
    "Intercropping (growing two or more crops together) can increase yields by 20-30% compared to monoculture.",
    "Mulching around plants can reduce water usage by up to 50% by preventing evaporation.",
    "Earthworms are nature's plows - they can move up to 20 tons of soil per acre annually.",
    "Planting marigolds near vegetables can naturally repel aphids, mosquitoes, and other harmful insects.",
    "A healthy soil contains more living organisms than there are people on Earth - billions per handful!",
    "Drip irrigation can save up to 60% more water compared to traditional sprinkler systems."
];

function updateDailyFact() {
    const factElement = document.getElementById('daily-fact-text');
    if (!factElement) return;

    // Use a fixed time interval (40 minutes) to determine which fact to show
    // This ensures consistency across page refreshes and different users
    const intervalMs = 40 * 60 * 1000;
    const now = Date.now();
    const factIndex = Math.floor(now / intervalMs) % dailyFacts.length;
    const newFact = dailyFacts[factIndex];

    // Only update if the fact has actually changed or if it's currently empty
    if (factElement.textContent !== newFact) {
        // If it's the first load (text same as placeholder or empty), just set it
        if (!factElement.textContent || factElement.textContent.includes("Cattle need plenty")) {
            factElement.textContent = newFact;
            factElement.style.opacity = '1';
        } else {
            // Apply fade out effect for subsequent changes
            factElement.style.opacity = '0';
            setTimeout(() => {
                factElement.textContent = newFact;
                factElement.style.opacity = '1';
            }, 500);
        }
    }
}

// --- AgroMall Logic ---
function handleMallRequest(event) {
    event.preventDefault();

    // UI Feedback: Change button to broadcasting state
    const btn = event.target.querySelector('button');
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-tower-broadcast fa-spin"></i> Broadcasting...';

    const item = document.getElementById('mall-item').value;
    const qty = document.getElementById('mall-qty').value;
    const loc = document.getElementById('mall-loc').value;
    const buyer = document.getElementById('mall-buyer').value;

    const newRequest = {
        id: Date.now(),
        item,
        qty,
        loc,
        buyer,
        date: new Date().toLocaleDateString()
    };

    // Simulate network delay for "uploading"
    setTimeout(() => {
        const stored = localStorage.getItem('mallRequests');
        // If it's the first time, we merge with mock data so they don't disappear
        let requests = stored ? JSON.parse(stored) : getInitialMallRequests();

        requests.unshift(newRequest);
        localStorage.setItem('mallRequests', JSON.stringify(requests));

        // Restore UI
        btn.disabled = false;
        btn.innerHTML = originalContent;

        alert(`BROADCAST SUCCESSFUL!\n\nYour request for "${item}" has been sent to all farmers in ${loc}.\n\nExpect responses in your AgroMall inbox soon.`);

        event.target.reset();
        renderMallRequests();

        // Scroll request wall to top to show new item
        document.getElementById('mall-requests-list').scrollTop = 0;
    }, 1500);
}

function renderMallRequests() {
    const list = document.getElementById('mall-requests-list');
    const countEl = document.getElementById('mall-request-count');
    if (!list) return;

    const stored = localStorage.getItem('mallRequests');
    const requests = stored ? JSON.parse(stored) : getInitialMallRequests();

    countEl.textContent = `${requests.length} Active`;
    list.innerHTML = '';

    if (requests.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; color: #999; padding: 4rem 2rem; background: rgba(255,255,255,0.4); border-radius: 16px; border: 2px dashed #eee;">
                <i class="fa-solid fa-store-slash" style="font-size: 3rem; margin-bottom: 1.2rem; opacity: 0.4;"></i>
                <p>No buying leads at the moment. When buyers post their needs, you'll see them here!</p>
            </div>
        `;
        return;
    }

    requests.forEach(req => {
        const div = document.createElement('div');
        div.className = 'glass-panel';
        div.style.background = 'white';
        div.style.padding = '1.2rem';
        div.style.border = '1px solid #eee';
        div.style.animation = 'fadeIn 0.5s ease';

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem;">
                <div>
                    <h4 style="color: var(--primary-dark); font-size: 1.1rem; margin-bottom: 0.2rem;">${req.item}</h4>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 0.75rem; color: #999; display: block;">${req.date}</span>
                    ${req.responses && req.responses.length > 0 ? `<span class="badge" style="background: var(--primary-color); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; cursor: pointer;" onclick="viewMallResponses(${req.id})">${req.responses.length} Responses</span>` : ''}
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem; font-size: 0.85rem; color: #666;">
                <span><i class="fa-solid fa-layer-group" style="width: 15px;"></i> ${req.qty}</span>
                <span><i class="fa-solid fa-location-dot" style="width: 15px;"></i> ${req.loc}</span>
                <span style="grid-column: span 2;"><i class="fa-solid fa-user-tie" style="width: 15px;"></i> ${req.buyer}</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-accent" style="flex: 1; border-radius: 8px; color: #333; font-weight: bold; background: #ffca28; font-size: 0.85rem;" 
                        onclick="respondToMallRequest(${req.id}, '${req.buyer}', '${req.item}')">
                    I Have This!
                </button>
                ${req.responses && req.responses.length > 0 ? `
                <button class="btn btn-outline" style="border-radius: 8px; font-size: 0.85rem;" onclick="viewMallResponses(${req.id})">
                    <i class="fa-solid fa-envelope"></i>
                </button>` : ''}
            </div>
        `;
        list.appendChild(div);
    });
}

function getInitialMallRequests() {
    return [
        { id: 101, item: "100 Cartons of Fresh Eggs", qty: "100 cartons", loc: "Ikeja, Lagos", buyer: "Morning Glory Bakery", date: "1/19/2026" },
        { id: 102, item: "Ton of Dry Cassava Chips", qty: "1 Ton", loc: "Ibadan, Oyo", buyer: "Elite Processors Ltd", date: "1/18/2026" }
    ];
}

function respondToMallRequest(requestId, buyer, item) {
    const message = prompt(`Send a quick message to ${buyer} about your ${item}:`, `Hi, I have the ${item} you're looking for. Available for immediate supply.`);
    if (message) {
        const stored = localStorage.getItem('mallRequests');
        let requests = stored ? JSON.parse(stored) : getInitialMallRequests();

        const reqIndex = requests.findIndex(r => r.id == requestId);
        if (reqIndex !== -1) {
            if (!requests[reqIndex].responses) requests[reqIndex].responses = [];
            requests[reqIndex].responses.unshift({
                id: Date.now(),
                sender: "Femi the Farmer", // Simulating logged-in user
                message: message,
                date: new Date().toLocaleString()
            });
            localStorage.setItem('mallRequests', JSON.stringify(requests));
            alert(`Your response has been sent to ${buyer}!\n\nThey have been notified that you can supply the ${item}.`);
            renderMallRequests();
        }
    }
}

function viewMallResponses(requestId) {
    const stored = localStorage.getItem('mallRequests');
    if (!stored) return;

    const requests = JSON.parse(stored);
    const request = requests.find(r => r.id == requestId);

    if (request && request.responses) {
        // Set context for the chat form
        document.getElementById('current-request-id').value = requestId;

        const container = document.getElementById('mall-responses-container');
        container.innerHTML = '';

        // Sort responses by date (oldest first for chat flow)
        const sortedMessages = [...request.responses].reverse();

        sortedMessages.forEach(resp => {
            const isMe = resp.sender === "Me" || resp.sender === "Customer"; // Simplified identification
            const div = document.createElement('div');
            div.style.padding = '0.8rem 1rem';
            div.style.borderRadius = '12px';
            div.style.marginBottom = '0.8rem';
            div.style.maxWidth = '85%';

            if (isMe) {
                div.style.marginLeft = 'auto';
                div.style.background = 'var(--primary-color)';
                div.style.color = 'white';
            } else {
                div.style.marginRight = 'auto';
                div.style.background = '#f0f0f0';
                div.style.color = '#333';
            }

            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem; font-size: 0.75rem; opacity: 0.8;">
                    <strong>${resp.sender}</strong>
                    <span>${new Date(resp.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p style="font-size: 0.9rem; line-height: 1.4;">${resp.message}</p>
            `;
            container.appendChild(div);
        });

        document.getElementById('mall-responses-modal').classList.add('active');
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }
}

function handleMallChat(event) {
    event.preventDefault();
    const requestId = document.getElementById('current-request-id').value;
    const input = document.getElementById('mall-chat-input');
    const message = input.value.trim();

    if (!message || !requestId) return;

    const stored = localStorage.getItem('mallRequests');
    let requests = stored ? JSON.parse(stored) : getInitialMallRequests();

    const reqIndex = requests.findIndex(r => r.id == requestId);
    if (reqIndex !== -1) {
        if (!requests[reqIndex].responses) requests[reqIndex].responses = [];

        const newMessage = {
            id: Date.now(),
            sender: "Me", // Identifying the current user replying
            message: message,
            date: new Date().toLocaleString()
        };

        requests[reqIndex].responses.unshift(newMessage); // unshift because viewMallResponses expects newest first in data
        localStorage.setItem('mallRequests', JSON.stringify(requests));

        input.value = '';
        viewMallResponses(requestId);

        // Ensure scroll to bottom after DOM update
        const container = document.getElementById('mall-responses-container');
        if (container) {
            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 60);
        }
    }
}

function closeMallResponsesModal() {
    document.getElementById('mall-responses-modal').classList.remove('active');
}// --- Vet GPS Logic ---
const mockVetHospitals = [
    // Lagos
    { name: "Dulham Veterinary Services", address: "23 Victoria Island, Lekki, Lagos", state: "Lagos", distance: 1.2, rating: 4.8, phone: "0806-632-9826" },
    { name: "Pet Affairs Veterinary", address: "36 Ibadan Street, Ebute Metta, Lagos", state: "Lagos", distance: 2.5, rating: 4.7, phone: "0803-804-3237" },
    { name: "Anchor Veterinary Clinic", address: "Sebuff Plaza, Osapa London, Lekki, Lagos", state: "Lagos", distance: 0.8, rating: 4.9, phone: "0803-817-0206" },
    { name: "Saintmarks Animal Hospital", address: "Ado Road, Ajah, Lagos", state: "Lagos", distance: 2.8, rating: 4.5, phone: "0803-000-0000" },

    // Abuja
    { name: "Vet World Ltd", address: "Aminu Kano Cres, Wuse 2, Abuja", state: "FCT - Abuja", distance: 1.5, rating: 4.6, phone: "0803-335-5081" },
    { name: "Sterling Veterinary Services", address: "Zara Plaza, Lifecamp, Abuja", state: "FCT - Abuja", distance: 2.1, rating: 4.7, phone: "0902-654-6545" },
    { name: "Fauna Veterinary Clinic", address: "Gwarinpa, Abuja", state: "FCT - Abuja", distance: 2.9, rating: 4.4, phone: "0805-522-3872" },

    // Rivers
    { name: "Hebron Veterinary Services", address: "Trans-Amadi, Port Harcourt", state: "Rivers", distance: 0.9, rating: 4.8, phone: "0803-626-5307" },
    { name: "Dulham Vet PH", address: "No. 3 Isiokpo Street, Dline, Port Harcourt", state: "Rivers", distance: 2.2, rating: 4.7, phone: "0806-632-9826" },

    // Kano
    { name: "Animal Care Services", address: "Hadejia Road, Yankaba, Kano", state: "Kano", distance: 1.3, rating: 4.7, phone: "0805-629-3038" },
    { name: "Phed Agrovet Nigeria Ltd", address: "Zungeru Road, Kano", state: "Kano", distance: 2.4, rating: 4.5, phone: "0803-821-4647" },

    // Kaduna
    { name: "Metro Veterinary Clinic", address: "Kachia Road, Sabon Tasha, Kaduna", state: "Kaduna", distance: 1.1, rating: 4.6, phone: "0803-642-2375" },
    { name: "Locks Veterinary Ltd", address: "3 Taiwo Road, Kaduna", state: "Kaduna", distance: 3.2, rating: 4.3, phone: "0622-44974" },

    // Ogun
    { name: "Animal Care Head Office", address: "Km 2 Iperu Ogere Road, Ogere Remo", state: "Ogun", distance: 4.5, rating: 4.9, phone: "0805-629-3249" },
    { name: "Pristine Veterinary Care", address: "Olokuta Housing Estate, Abeokuta", state: "Ogun", distance: 1.8, rating: 4.7, phone: "0907-770-6145" },

    // Anambra
    { name: "Vetplus Health Centre", address: "Old Onitsha-Nnewi Road, Nnewi", state: "Anambra", distance: 2.3, rating: 4.6, phone: "0708-555-6398" },

    // Delta
    { name: "Polaris Veterinary Consult", address: "103 Ibusa Road, Asaba", state: "Delta", distance: 1.4, rating: 4.8, phone: "0807-267-7221" },

    // Other States
    { name: "Greenfield Animal Hospital", address: "Independence Layout, Enugu", state: "Enugu", distance: 1.1, rating: 4.7, phone: "0800-473-3683" },
    { name: "Supreme Care Vet", address: "Ring Road, Ibadan", state: "Oyo", distance: 1.8, rating: 4.6, phone: "0800-SUPREME" },
    { name: "PetLife Veterinary", address: "GRA, Benin City", state: "Edo", distance: 2.3, rating: 4.5, phone: "0800-PETLIFE" },
    { name: "TrustVet Services", address: "Rayfield, Jos", state: "Plateau", distance: 1.4, rating: 4.7, phone: "0800-TRUSTVET" },
    { name: "Rovet Clinic", address: "Nsikak Eduok Avenue, Uyo", state: "Akwa Ibom", distance: 2.0, rating: 4.6, phone: "0806-758-8050" }
];

function handleVetStateSearch() {
    const selectedState = document.getElementById('vet-state-filter').value;
    const listContainer = document.getElementById('nearby-vets-list');

    if (!selectedState) return alert("Please select a state first.");

    listContainer.innerHTML = `<p style="text-align: center; color: var(--primary-color); font-size: 0.85rem; margin-top: 3rem;">
        <i class="fa-solid fa-spinner fa-spin"></i> Fetching registered hospitals in ${selectedState}...
    </p>`;

    setTimeout(() => {
        // Strict State-Only filtering
        const filteredVets = mockVetHospitals.filter(v => v.state === selectedState);
        renderVetList(filteredVets, selectedState);
    }, 800);
}

function searchVetsByAddress() {
    // Legacy function - redirected to state search
    handleVetStateSearch();
}

function findNearbyVets() {
    // Legacy function - redirected to state search
    handleVetStateSearch();
}


function renderVetList(vets, stateName = "") {
    const listContainer = document.getElementById('nearby-vets-list');
    listContainer.innerHTML = '';

    if (vets.length === 0) {
        listContainer.innerHTML = `<p style="text-align: center; color: #666; font-size: 0.85rem; margin-top: 3rem;">
            <i class="fa-solid fa-circle-info" style="display: block; font-size: 1.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
            No veterinary hospitals are currently registered in <strong>${stateName}</strong>.
        </p>`;
        return;
    }

    vets.forEach(vet => {
        const item = document.createElement('div');
        item.style.padding = '0.8rem';
        item.style.borderBottom = '1px solid #eee';
        item.style.background = 'white';
        item.style.borderRadius = '8px';
        item.style.marginBottom = '0.5rem';
        item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';

        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.3rem;">
                <h5 style="margin: 0; color: #333; font-size: 0.9rem;">${vet.name}</h5>
                <span style="font-size: 0.7rem; color: #fbc02d; font-weight: bold;">★ ${vet.rating}</span>
            </div>
            <p style="font-size: 0.75rem; color: #777; margin: 0.2rem 0;"><i class="fa-solid fa-location-dot"></i> ${vet.address}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <span style="font-size: 0.75rem; color: var(--primary-color); font-weight: 700;">${vet.distance} km away</span>
                <a href="tel:${vet.phone}" style="text-decoration: none; color: #1976d2; font-size: 0.75rem; font-weight: bold;"><i class="fa-solid fa-phone"></i> Call Emergency</a>
            </div>
        `;
        listContainer.appendChild(item);
    });
}



// --- Chicken AI Logic ---
const sectionMessages = {
    'home': [
        "Welcome to AgroGuard! I'm your assistant, Cluck-AI.",
        "AgroGuard is a smart farming platform designed to maximize your harvest.",
        "I'm here to help you navigate and answer any questions!"
    ],
    'seed-sure': [
        "Seed Sure analyzes your soil and location to suggest the best crops.",
        "Enter your details and I'll crunch the numbers for your next planting season!",
        "Optimizing your seed choice can increase yield by up to 30%."
    ],
    'vet-connect': [
        "Vet Connect is your 24/7 livestock health companion.",
        "You can now find nearby veterinary hospitals using our new GPS tracker!",
        "Don't forget to track your animal's symptoms for better diagnosis!"
    ],
    'market': [
        "Farm to Market connects you directly with bulk buyers.",
        "List your produce here to get the best prices without middlemen.",
        "You can browse available bundles of fresh food right from this section."
    ],
    'plant-doctor': [
        "I can help diagnose plant diseases just from a description or photo.",
        "Our AI analyzes symptoms to provide instant treatment recommendations.",
        "Healthy crops start with early detection!"
    ],
    'agromall': [
        "In AgroMall, buyers can post specific requests for what they need.",
        "Local farmers can then view these requests and act as the sole suppliers.",
        "It's a streamlined system for buyers requesting and farmers supplying!"
    ],
    'farm-manager': [
        "Manage your farm work effortlessly with our built-in scheduler.",
        "Track planting dates, harvest times, and growth stages of all your animals.",
        "I'll help you stay organized so you never miss a task!"
    ],
    'finances': [
        "Keep your farm's books balanced with our easy finance tracker.",
        "Record sales and expenses to see your profit analytics in real-time.",
        "Better financial tracking leads to better farm scaling!"
    ],
    'profile': [
        "This is your personal dashboard! You can update your details here.",
        "Make sure your profile is complete so buyers can trust your listings.",
        "Your hard work pays off—keep farming smart!"
    ]
};

let chickenInterval = null;

function greetUser() {
    // Clear any existing message cycle
    if (chickenInterval) clearInterval(chickenInterval);

    let index = 0;
    const bubble = document.getElementById('chicken-bubble');
    const textEl = document.getElementById('chicken-text');

    // Get messages for the current section (fallback to home if not found)
    const messages = sectionMessages[activeSectionId] || sectionMessages['home'];

    bubble.classList.add('active');

    const cycleMessages = () => {
        if (index < messages.length) {
            textEl.innerHTML = messages[index];
            index++;
        } else {
            clearInterval(chickenInterval);
            chickenInterval = null;
            setTimeout(() => {
                bubble.classList.remove('active');
            }, 5000);
        }
    };

    cycleMessages(); // Show first message immediately
    chickenInterval = setInterval(cycleMessages, 4000);
}

function initRooster() {
    // Initial welcome on home page load
    setTimeout(() => {
        const bubble = document.getElementById('chicken-bubble');
        const textEl = document.getElementById('chicken-text');
        if (bubble && activeSectionId === 'home') {
            bubble.classList.add('active');
            textEl.innerHTML = "Cluck! I'm Cluck-AI. I follow you everywhere to help! Click me anytime.";
            setTimeout(() => {
                bubble.classList.remove('active');
            }, 6000);
        }
    }, 2000);
}

// Initialize and set interval
document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    updateDailyFact();
    renderMallRequests();
    loadReviews();
    loadSchedules();
    initRooster();
    updateNavigationButtons();
    loadTransactions();
    loadBudgetGoals();

    // Check for update every minute to see if we've crossed a 40-minute boundary
    setInterval(updateDailyFact, 60 * 1000);

    // Close modals when clicking outside
    window.onclick = function (event) {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.classList.remove('active');
        }
    };

    // --- Chicken AI Scroll Visibility Logic ---
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const chicken = document.getElementById('chicken-ai');
        if (!chicken) return;

        // Hide assistant while scrolling
        chicken.classList.add('scrolling');

        // Clear existing timeout and set a new one to show after scroll stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            chicken.classList.remove('scrolling');
        }, 300); // Reappear 300ms after scrolling stops
    });
});
