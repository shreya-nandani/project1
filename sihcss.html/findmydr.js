// --- DOM Element References ---
const citySelect = document.getElementById("citySelect");
const hospitalSelect = document.getElementById("hospitalSelect");
const deptSelect = document.getElementById("deptSelect");
const submitBtn = document.getElementById("submitBtn");
const findLocationBtn = document.getElementById("findLocationBtn");
const errorMessage = document.getElementById("errorMessage");
const doctorResultsSection = document.getElementById("doctorResults");
const doctorListContainer = document.getElementById("doctorList");
const noResultsMessage = document.getElementById("noResultsMessage");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// --- Data Definitions (Could be fetched from API in a real app) ---
const hospitalsByCity = {
    patna: ["AIIMS Patna", "Paras HMRI"],
    delhi: ["Fortis Hospital", "Apollo Delhi"],
    bbsr: ["SUM Hospital", "KIMS"]
};

const allDoctors = [
    // --- Bhubaneswar: SUM Hospital ---
    { id: 1, name: "Dr. Sameer Khan", department: "ent", hospital: "SUM Hospital", shift: "Afternoon", days: "Tue-Thu", time: "2:00 PM - 5:00 PM", img: "https://i.pravatar.cc/150?img=65", reviews: "Excellent ENT specialist, very patient and thorough.", availability: [{ date: "2023-11-21", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-23", slot: "2:00 PM - 2:30 PM" }] },
    { id: 2, name: "Dr. Manoj Kumar", department: "orthopedics", hospital: "SUM Hospital", shift: "Evening", days: "Mon-Fri", time: "5:00 PM - 8:00 PM", img: "https://i.pravatar.cc/150?img=66", reviews: "Highly recommend for knee issues. Very experienced.", availability: [{ date: "2023-11-20", slot: "6:00 PM - 6:30 PM" }, { date: "2023-11-22", slot: "5:30 PM - 6:00 PM" }] },
    { id: 3, name: "Dr. Vikramjeet Singh", department: "orthopedics", hospital: "SUM Hospital", shift: "Morning", days: "Mon-Thu", time: "8:00 AM - 12:00 PM", img: "https://i.pravatar.cc/150?img=67", reviews: "Great surgeon, clear explanations and good follow-up.", availability: [{ date: "2023-11-20", slot: "9:00 AM - 9:30 AM" }, { date: "2023-11-22", slot: "11:00 AM - 11:30 AM" }] },
    { id: 15, name: "Dr. Ankit Mehta", department: "ent", hospital: "SUM Hospital", shift: "Morning", days: "Mon-Wed-Fri", time: "9:00 AM - 12:00 PM", img: "https://i.pravatar.cc/150?img=70", reviews: "Professional and very helpful with my sinus problem.", availability: [{ date: "2023-11-20", slot: "10:30 AM - 11:00 AM" }, { date: "2023-11-22", slot: "9:00 AM - 9:30 AM" }] },

    // --- Bhubaneswar: KIMS ---
    { id: 4, name: "Dr. Shanti Devi", department: "cardiology", hospital: "KIMS", shift: "Afternoon", days: "Tue-Fri", time: "2:30 PM - 5:30 PM", img: "https://i.pravatar.cc/150?img=46", reviews: "Caring cardiologist, very thorough in her diagnosis.", availability: [{ date: "2023-11-21", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-24", slot: "4:00 PM - 4:30 PM" }] },
    { id: 5, name: "Dr. Arjun Patel", department: "ent", hospital: "KIMS", shift: "Morning", days: "Wed-Sat", time: "9:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=69", reviews: "Very good ENT doctor, solved my long-standing issue.", availability: [{ date: "2023-11-22", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-25", slot: "11:00 AM - 11:30 AM" }] },
    { id: 16, name: "Dr. Sunita Ghosh", department: "ent", hospital: "KIMS", shift: "Evening", days: "Mon-Thu", time: "4:00 PM - 7:00 PM", img: "https://i.pravatar.cc/150?img=40", reviews: "Helpful and professional, resolved my throat infection quickly.", availability: [{ date: "2023-11-20", slot: "5:00 PM - 5:30 PM" }, { date: "2023-11-23", slot: "4:30 PM - 5:00 PM" }] },
    { id: 17, name: "Dr. Alisha Singh", department: "cardiology", hospital: "KIMS", shift: "Morning", days: "Mon-Wed", time: "10:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=39", reviews: "Excellent heart specialist. Highly competent.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-22", slot: "12:00 PM - 12:30 PM" }] },

    // --- Patna: AIIMS Patna ---
    { id: 6, name: "Dr. Ananya Singh", department: "ent", hospital: "AIIMS Patna", shift: "Morning", days: "Mon-Wed-Fri", time: "9:00 AM - 12:00 PM", img: "https://i.pravatar.cc/150?img=48", reviews: "Highly experienced, takes time to listen to concerns.", availability: [{ date: "2023-11-20", slot: "9:00 AM - 9:30 AM" }, { date: "2023-11-22", slot: "11:00 AM - 11:30 AM" }] },
    { id: 7, name: "Dr. Alok Verma", department: "pediatrics", hospital: "AIIMS Patna", shift: "Morning", days: "Mon-Sat", time: "9:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=63", reviews: "Excellent with kids, very calm and reassuring.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-21", slot: "11:30 AM - 12:00 PM" }] },
    { id: 14, name: "Dr. Meera Das", department: "dermatology", hospital: "AIIMS Patna", shift: "Afternoon", days: "Tue-Thu-Sat", time: "2:00 PM - 5:00 PM", img: "https://i.pravatar.cc/150?img=44", reviews: "Knowledgeable and friendly. My skin has never looked better.", availability: [{ date: "2023-11-21", slot: "2:30 PM - 3:00 PM" }, { date: "2023-11-23", slot: "4:00 PM - 4:30 PM" }] },
    { id: 18, name: "Dr. Rohan Kumar", department: "orthopedics", hospital: "AIIMS Patna", shift: "Evening", days: "Tue-Fri", time: "5:00 PM - 8:00 PM", img: "https://i.pravatar.cc/150?img=71", reviews: "Great for fracture treatment. Very skilled surgeon.", availability: [{ date: "2023-11-21", slot: "5:30 PM - 6:00 PM" }, { date: "2023-11-24", slot: "6:00 PM - 6:30 PM" }] },

    // --- Patna: Paras HMRI ---
    { id: 8, name: "Dr. Sneha Reddy", department: "orthopedics", hospital: "Paras HMRI", shift: "Morning", days: "Tue-Thu-Sat", time: "9:30 AM - 12:30 PM", img: "https://i.pravatar.cc/150?img=42", reviews: "Professional and very knowledgeable in orthopedics.", availability: [{ date: "2023-11-21", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-23", slot: "11:00 AM - 11:30 AM" }] },
    { id: 9, name: "Dr. Kavita Rao", department: "dermatology", hospital: "Paras HMRI", shift: "Evening", days: "Mon-Wed-Fri", time: "3:00 PM - 6:00 PM", img: "https://i.pravatar.cc/150?img=41", reviews: "Friendly dermatologist, helped a lot with my skin condition.", availability: [{ date: "2023-11-20", slot: "4:00 PM - 4:30 PM" }, { date: "2023-11-22", slot: "3:30 PM - 4:00 PM" }] },

    // --- Delhi: Fortis Hospital ---
    { id: 10, name: "Dr. Rajesh Gupta", department: "ent", hospital: "Fortis Hospital", shift: "Evening", days: "Tue-Thu-Sat", time: "4:00 PM - 7:00 PM", img: "https://i.pravatar.cc/150?img=68", reviews: "Quick diagnosis and effective treatment for ear pain.", availability: [{ date: "2023-11-21", slot: "5:00 PM - 5:30 PM" }, { date: "2023-11-23", slot: "4:30 PM - 5:00 PM" }] },
    { id: 11, name: "Dr. Ritu Agarwal", department: "dermatology", hospital: "Fortis Hospital", shift: "Morning", days: "Mon-Wed-Fri", time: "10:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=45", reviews: "Very experienced and provides clear explanations.", availability: [{ date: "2023-11-20", slot: "11:00 AM - 11:30 AM" }, { date: "2023-11-22", slot: "10:30 AM - 11:00 AM" }] },
    { id: 19, name: "Dr. Aamir Khan", department: "cardiology", hospital: "Fortis Hospital", shift: "Afternoon", days: "Tue-Thu", time: "2:00 PM - 5:00 PM", img: "https://i.pravatar.cc/150?img=72", reviews: "Expert in his field, provided great care.", availability: [{ date: "2023-11-21", slot: "2:30 PM - 3:00 PM" }, { date: "2023-11-23", slot: "4:00 PM - 4:30 PM" }] },

    // --- Delhi: Apollo Delhi ---
    { id: 12, name: "Dr. Priya Sharma", department: "ent", hospital: "Apollo Delhi", shift: "Morning", days: "Mon-Fri", time: "10:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=43", reviews: "Friendly and highly professional ENT doctor.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-21", slot: "11:00 AM - 11:30 AM" }] },
    { id: 13, name: "Dr. Neha Singh", department: "pediatrics", hospital: "Apollo Delhi", shift: "Evening", days: "Mon-Fri", time: "5:00 PM - 8:00 PM", img: "https://i.pravatar.cc/150?img=47", reviews: "Caring pediatrician, kids love her.", availability: [{ date: "2023-11-20", slot: "6:00 PM - 6:30 PM" }, { date: "2023-11-22", slot: "5:30 PM - 6:00 PM" }] },
    { id: 20, name: "Dr. Preeti Jain", department: "dermatology", hospital: "Apollo Delhi", shift: "Afternoon", days: "Wed-Sat", time: "2:00 PM - 5:00 PM", img: "https://i.pravatar.cc/150?img=49", reviews: "Provided great solutions for my skin condition.", availability: [{ date: "2023-11-22", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-25", slot: "4:00 PM - 4:30 PM" }] }
];


// --- Intersection Observer Setup ---
let observer;
const animationDelayIncrement = 100;

function setupIntersectionObserver() {
    if (observer) {
        observer.disconnect();
    }
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);
}

// --- Helper Functions ---
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
}

function createDoctorCard(doctor, index) {
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.setAttribute("aria-labelledby", `doctor-name-${doctor.id}`);
    card.style.animationDelay = `${index * animationDelayIncrement}ms`;

    let availabilityHtml = '';
    if (doctor.availability && doctor.availability.length > 0) {
        availabilityHtml = '<p><strong>Available Slots:</strong></p><ul>';
        doctor.availability.forEach(slot => {
            availabilityHtml += `<li>${slot.date}: ${slot.slot}</li>`;
        });
        availabilityHtml += '</ul>';
    } else {
        availabilityHtml = '<p>No specific slots listed. Contact hospital.</p>';
    }

    card.innerHTML = `
        <img src="${doctor.img}" alt="Portrait of Dr. ${doctor.name}">
        <h3 id="doctor-name-${doctor.id}">${doctor.name}</h3>
        <p><strong>Department:</strong> ${doctor.department.charAt(0).toUpperCase() + doctor.department.slice(1)}</p>
        <p><strong>Hospital:</strong> ${doctor.hospital}</p>
        <p><strong>Shift:</strong> ${doctor.shift}</p>
        <p><strong>Days:</strong> ${doctor.days}</p>
        <p><strong>Time:</strong> ${doctor.time}</p>
        ${availabilityHtml}
        <p><strong>Reviews:</strong> ${doctor.reviews || 'No reviews available.'}</p>
        <div class="doctor-actions">
            <button class="btn btn-primary">Book Appointment</button>
            <button class="btn btn-tertiary">View Profile</button>
        </div>
    `;
    return card;
}

function populateHospitals() {
    hospitalSelect.innerHTML = `<option value="" disabled selected>Select Hospital</option>`;
    deptSelect.innerHTML = `<option value="" disabled selected>Select Department</option>`;
    deptSelect.disabled = true;

    const selectedCity = citySelect.value;
    if (selectedCity && hospitalsByCity[selectedCity]) {
        hospitalsByCity[selectedCity].forEach(hospital => {
            const option = document.createElement("option");
            option.value = hospital;
            option.textContent = hospital;
            hospitalSelect.appendChild(option);
        });
        hospitalSelect.disabled = false;
    } else {
        hospitalSelect.disabled = true;
    }
    hospitalSelect.value = "";
}

function populateDepartments() {
    deptSelect.innerHTML = `<option value="" disabled selected>Select Department</option>`;
    const selectedHospital = hospitalSelect.value;

    if (selectedHospital) {
        // Find all unique departments for the selected hospital
        const availableDepartments = [...new Set(allDoctors
            .filter(doc => doc.hospital === selectedHospital)
            .map(doc => doc.department)
        )];

        // Populate the dropdown with only the found departments
        availableDepartments.forEach(dept => {
            const option = document.createElement("option");
            option.value = dept;
            option.textContent = dept.charAt(0).toUpperCase() + dept.slice(1);
            deptSelect.appendChild(option);
        });
        deptSelect.disabled = false;
    } else {
        deptSelect.disabled = true;
    }
    deptSelect.value = "";
}

function findAndDisplayDoctors() {
    clearError();
    const selectedCity = citySelect.value;
    const selectedHospital = hospitalSelect.value;
    const selectedDepartment = deptSelect.value;

    if (!selectedCity || !selectedHospital || !selectedDepartment) {
        showError("Please make all selections (City, Hospital, Department).");
        return;
    }

    const filteredDoctors = allDoctors.filter(doc =>
        doc.department === selectedDepartment && doc.hospital === selectedHospital
    );

    doctorListContainer.innerHTML = "";
    noResultsMessage.classList.add("hidden");
    if (observer) {
        observer.disconnect();
    }

    if (filteredDoctors.length > 0) {
        filteredDoctors.forEach((doc, index) => {
            const card = createDoctorCard(doc, index);
            doctorListContainer.appendChild(card);
            observer.observe(card);
        });
        doctorResultsSection.classList.remove("hidden");
        clearSearchBtn.classList.remove("hidden");
        doctorResultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        noResultsMessage.classList.remove("hidden");
        doctorResultsSection.classList.remove("hidden");
        clearSearchBtn.classList.add("hidden");
        doctorResultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}



function findNearestCity(lat, lon) {
    const cityCoordinates = {
        patna: { lat: 25.61, lon: 85.14 },
        delhi: { lat: 28.70, lon: 77.10 },
        bbsr: { lat: 20.29, lon: 85.82 }
    };
    
    let nearest = null;
    let minDistance = Infinity;

    for (const city in cityCoordinates) {
        const distance = Math.sqrt(
            Math.pow(lat - cityCoordinates[city].lat, 2) + 
            Math.pow(lon - cityCoordinates[city].lon, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            nearest = city;
        }
    }
    return nearest;
}

function clearAllSelectionsAndResults() {
    citySelect.value = "";
    hospitalSelect.innerHTML = `<option value="" disabled selected>Select Hospital</option>`;
    hospitalSelect.disabled = true;
    deptSelect.innerHTML = `<option value="" disabled selected>Select Department</option>`;
    deptSelect.disabled = true;

    doctorListContainer.innerHTML = "";
    doctorResultsSection.classList.add("hidden");
    noResultsMessage.classList.add("hidden");
    clearSearchBtn.classList.add("hidden");
    clearError();
    
    if (observer) {
        observer.disconnect();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Event Listeners ---
citySelect.addEventListener("change", populateHospitals);
hospitalSelect.addEventListener("change", populateDepartments);
submitBtn.addEventListener("click", findAndDisplayDoctors);
clearSearchBtn.addEventListener("click", clearAllSelectionsAndResults);

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
    setupIntersectionObserver();
    clearAllSelectionsAndResults();
});