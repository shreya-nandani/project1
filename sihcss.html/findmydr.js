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
   { id: 1, name: "Dr. Sameer Khan", department: "ent", hospital: "SUM Hospital", shift: "Afternoon", days: "Tue-Thu", time: "2:00 PM - 5:00 PM", img: "https://imgs.search.brave.com/YRfAl0o5UEp1mc6a8UEzga0nUc1jX73GH8uR60Py6NM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY1Lzkz/L2JmLzY1OTNiZjBi/YmIwZjE3ZjBlMjdi/ZTg4MTZmZjAyYjZk/LmpwZw", reviews: "Excellent ENT specialist, very patient and thorough.", availability: [{ date: "2023-11-21", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-23", slot: "2:00 PM - 2:30 PM" }] },
    { id: 2, name: "Dr. Manoj Kumar", department: "orthopedics", hospital: "SUM Hospital", shift: "Evening", days: "Mon-Fri", time: "5:00 PM - 8:00 PM", img: "https://imgs.search.brave.com/k3l9z5CtTyketBlmRsRz0COmFTKKOfwYrFaW2ovfAso/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMz/NDgzODU0My92ZWN0/b3IvcmhldW1hdG9s/b2dpc3RzLW9ydGhv/cGVkaWNzLXNjaWVu/dGlzdHMtdHJhdW1h/dG9sb2dpc3RzLXN1/cmdlb25zLWRvY3Rv/cnMtZXhhbWluZS1r/bmVlLWpvaW50Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1H/Q3hkVHYydlBSZ2lM/UW1LU2l3MTlYZFNZ/Y195NC1XSExZWk5v/cmRqS2VNPQ", reviews: "Highly recommend for knee issues. Very experienced.", availability: [{ date: "2023-11-20", slot: "6:00 PM - 6:30 PM" }, { date: "2023-11-22", slot: "5:30 PM - 6:00 PM" }] },
    { id: 3, name: "Dr. Vikramjeet Singh", department: "orthopedics", hospital: "SUM Hospital", shift: "Morning", days: "Mon-Thu", time: "8:00 AM - 12:00 PM", img: "https://imgs.search.brave.com/3-7jsz-KC1qEmcqHuwJhDvEH7LtFq9OZ5FrvWrucx2Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNDI1/NTI3MTEvc3RvY2st/cGhvdG8tb3J0aG9w/ZWRpY3MtY29uc3Vs/dGF0aW9uLXdvbWFu", reviews: "Great surgeon, clear explanations and good follow-up.", availability: [{ date: "2023-11-20", slot: "9:00 AM - 9:30 AM" }, { date: "2023-11-22", slot: "11:00 AM - 11:30 AM" }] },
    { id: 15, name: "Dr. Ankit Mehta", department: "ent", hospital: "SUM Hospital", shift: "Morning", days: "Mon-Wed-Fri", time: "9:00 AM - 12:00 PM", img: "https://imgs.search.brave.com/fbYy6dEBPuACxbutP1L9-vivfShI_eO9GFZ_29ztqMM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3Ivb3RvbGFy/eW5nb2xvZ3ktY29u/Y2VwdC1lbnQtZG9j/dG9yLXRyZWF0aW5n/LTI2MG53LTIwNjUx/NTkyODMuanBn", reviews: "Professional and very helpful with my sinus problem.", availability: [{ date: "2023-11-20", slot: "10:30 AM - 11:00 AM" }, { date: "2023-11-22", slot: "9:00 AM - 9:30 AM" }] },

    // --- Bhubaneswar: KIMS ---
    { id: 4, name: "Dr. Shanti Devi", department: "cardiology", hospital: "KIMS", shift: "Afternoon", days: "Tue-Fri", time: "2:30 PM - 5:30 PM", img: "https://imgs.search.brave.com/xwGdRHZjK4RY9PAoI7c7fZ2I5w3XHhFvC84Ujl0fYrw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jYXJk/aW9sb2d5LXNjaWVu/Y2UtY29uY2VwdC1k/b2N0b3ItaGFuZC11/c2luZy1jcmVhdGl2/ZS1nbG93aW5nLW1l/ZGljYWwtaW50ZXJm/YWNlLWh1ZC1ob2xv/Z3JhbS1ibHVlLWJh/Y2tncm91bmQtbXVs/dGlleHBvc3VyZS0x/NjQxMjA3MTMuanBn", reviews: "Caring cardiologist, very thorough in her diagnosis.", availability: [{ date: "2023-11-21", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-24", slot: "4:00 PM - 4:30 PM" }] },
    { id: 5, name: "Dr. Arjun Patel", department: "ent", hospital: "KIMS", shift: "Morning", days: "Wed-Sat", time: "9:00 AM - 1:00 PM", img: "https://imgs.search.brave.com/fbYy6dEBPuACxbutP1L9-vivfShI_eO9GFZ_29ztqMM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3Ivb3RvbGFy/eW5nb2xvZ3ktY29u/Y2VwdC1lbnQtZG9j/dG9yLXRyZWF0aW5n/LTI2MG53LTIwNjUx/NTkyODMuanBn", reviews: "Very good ENT doctor, solved my long-standing issue.", availability: [{ date: "2023-11-22", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-25", slot: "11:00 AM - 11:30 AM" }] },
    { id: 16, name: "Dr. Sunita Ghosh", department: "ent", hospital: "KIMS", shift: "Evening", days: "Mon-Thu", time: "4:00 PM - 7:00 PM", img: "https://i.pravatar.cc/150?img=40", reviews: "Helpful and professional, resolved my throat infection quickly.", availability: [{ date: "2023-11-20", slot: "5:00 PM - 5:30 PM" }, { date: "2023-11-23", slot: "4:30 PM - 5:00 PM" }] },
    { id: 17, name: "Dr. Alisha Singh", department: "cardiology", hospital: "KIMS", shift: "Morning", days: "Mon-Wed", time: "10:00 AM - 1:00 PM", img: "https://imgs.search.brave.com/qnepCisc_0aqPo5gJwpB14_m7hWrC1SXfEatpVYOYrs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/Y2FsLnJvc3N1LmVk/dS9zaXRlcy9nL2Zp/bGVzL2tyY25rdjI2/MS9maWxlcy9zdHls/ZXMvYXRnZV8zXzJf/Y3JvcF9tZC9wdWJs/aWMvMjAyMi0wNC9D/YXJkaW9sb2d5Lmpw/Zz9oPWE2ZGE0MWEy/Jml0b2s9NlFfUGlZ/U3M", reviews: "Excellent heart specialist. Highly competent.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-22", slot: "12:00 PM - 12:30 PM" }] },
    // --- Patna: AIIMS Patna ---
    { id: 6, name: "Dr. Ananya Singh", department: "ent", hospital: "AIIMS Patna", shift: "Morning", days: "Mon-Wed-Fri", time: "9:00 AM - 12:00 PM", img: "https://imgs.search.brave.com/YRfAl0o5UEp1mc6a8UEzga0nUc1jX73GH8uR60Py6NM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY1Lzkz/L2JmLzY1OTNiZjBi/YmIwZjE3ZjBlMjdi/ZTg4MTZmZjAyYjZk/LmpwZw", reviews: "Highly experienced, takes time to listen to concerns.", availability: [{ date: "2023-11-20", slot: "9:00 AM - 9:30 AM" }, { date: "2023-11-22", slot: "11:00 AM - 11:30 AM" }] },
    { id: 7, name: "Dr. Alok Verma", department: "pediatrics", hospital: "AIIMS Patna", shift: "Morning", days: "Mon-Sat", time: "9:00 AM - 1:00 PM", img: "https://imgs.search.brave.com/uhOPS0k-sJduhEnfu0mg6fyYgsiMnCuYDQThp-siGbg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wZWRp/YXRyaWNzLXBvY2tl/dC10b3lzLWJsdWUt/YmFja2dyb3VuZC10/b3Atdmlldy1zcGFj/ZS10ZXh0LWNoaWxk/cmVuLWZhYnJpYy05/MTI5MDk0MS5qcGc", reviews: "Excellent with kids, very calm and reassuring.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-21", slot: "11:30 AM - 12:00 PM" }] },
    { id: 14, name: "Dr. Meera Das", department: "dermatology", hospital: "AIIMS Patna", shift: "Afternoon", days: "Tue-Thu-Sat", time: "2:00 PM - 5:00 PM", img: "https://imgs.search.brave.com/-zgnx3ywYPQEDmdfl4XSLyjEUy765DaVBAwB0u0Qc2Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ0/NjMxNzYyOC9waG90/by9hLWZlbWFsZS1k/ZXJtYXRvbG9naXN0/LWV4YW1pbmVzLWEt/cGF0aWVudC1pbi1o/ZXItb2ZmaWNlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1H/V0xVc19fQ3hRcG42/U3BqZ3FId2EzRWE5/UFJLckhNWWFLQTVy/ODliWFZVPQ", reviews: "Knowledgeable and friendly. My skin has never looked better.", availability: [{ date: "2023-11-21", slot: "2:30 PM - 3:00 PM" }, { date: "2023-11-23", slot: "4:00 PM - 4:30 PM" }] },
    { id: 18, name: "Dr. Rohan Kumar", department: "orthopedics", hospital: "AIIMS Patna", shift: "Evening", days: "Tue-Fri", time: "5:00 PM - 8:00 PM", img: "https://imgs.search.brave.com/Vs5QBdkWSFqabAimOQDsITQZN_AppJ4pSf7wjnZlsoo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/b3J0aG9wZWRpY3Mt/ZGVzaWduLWNvbmNl/cHRfMTI4NC0xMTMz/MS5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQw", reviews: "Great for fracture treatment. Very skilled surgeon.", availability: [{ date: "2023-11-21", slot: "5:30 PM - 6:00 PM" }, { date: "2023-11-24", slot: "6:00 PM - 6:30 PM" }] },

    // --- Patna: Paras HMRI ---
    { id: 8, name: "Dr. Sneha Reddy", department: "orthopedics", hospital: "Paras HMRI", shift: "Morning", days: "Tue-Thu-Sat", time: "9:30 AM - 12:30 PM", img: "https://imgs.search.brave.com/7XQ5bUSXn5M8PySZySZnD6rMlc3iI9nfmReNgi6ZSYQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODA0/NzA1MTI0L3Bob3Rv/L2Zvb3Qtc3VwcG9y/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VlFKbTdWWFRv/ZklxNVQ3ZHo5b25u/ZjVnTGtPQ1NnaWd4/Z1dkaS1vUENsQT0", reviews: "Professional and very knowledgeable in orthopedics.", availability: [{ date: "2023-11-21", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-23", slot: "11:00 AM - 11:30 AM" }] },
    { id: 9, name: "Dr. Kavita Rao", department: "dermatology", hospital: "Paras HMRI", shift: "Evening", days: "Mon-Wed-Fri", time: "3:00 PM - 6:00 PM", img: "https://imgs.search.brave.com/GmgkBA_25zqdZ2QAXLAQ_XWM_SqMgbH7m3EkshCknSw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9kZXJtYXRv/bG9naXN0LWV4YW1p/bmluZy1wYXRpZW50/LWxvb2tpbmctbWly/cm9yLTI2MG53LTIx/NDgyNTM3ODMuanBn", reviews: "Friendly dermatologist, helped a lot with my skin condition.", availability: [{ date: "2023-11-20", slot: "4:00 PM - 4:30 PM" }, { date: "2023-11-22", slot: "3:30 PM - 4:00 PM" }] },

    // --- Delhi: Fortis Hospital ---
    { id: 10, name: "Dr. Rajesh Gupta", department: "ent", hospital: "Fortis Hospital", shift: "Evening", days: "Tue-Thu-Sat", time: "4:00 PM - 7:00 PM", img: "https://imgs.search.brave.com/CGXhfvStBFuyJZXNNOPcx9qWA6aVuucJuPydaXaYDkk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9lbnQtbWVk/aWNhbC1leGFtaW5h/dGlvbi1saXR0bGUt/Z2lybC0yNjBudy0y/MTI0OTY2MDQxLmpw/Zw", reviews: "Quick diagnosis and effective treatment for ear pain.", availability: [{ date: "2023-11-21", slot: "5:00 PM - 5:30 PM" }, { date: "2023-11-23", slot: "4:30 PM - 5:00 PM" }] },
    { id: 11, name: "Dr. Ritu Agarwal", department: "dermatology", hospital: "Fortis Hospital", shift: "Morning", days: "Mon-Wed-Fri", time: "10:00 AM - 1:00 PM", img: "https://imgs.search.brave.com/bk7WFvtr6LrB1jN8sWG_S1GSJBG-v9t8ZVDgEk3bGiY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvMzE1/ODgwMTU2L3N0b2Nr/LXBob3RvLWNyb3Bw/ZWQtdmlldy1kZXJt/YXRvbG9naXN0LWV4/YW1pbmluZy1za2lu/LXBhdGllbnQtbWFn/bmlmeWluZy1nbGFz/cy1jbGluaWM", reviews: "Very experienced and provides clear explanations.", availability: [{ date: "2023-11-20", slot: "11:00 AM - 11:30 AM" }, { date: "2023-11-22", slot: "10:30 AM - 11:00 AM" }] },
    { id: 19, name: "Dr. Aamir Khan", department: "cardiology", hospital: "Fortis Hospital", shift: "Afternoon", days: "Tue-Thu", time: "2:00 PM - 5:00 PM", img: "https://imgs.search.brave.com/tyUh_rbZVmUNNpAYLkutdLadtIPEY9eaaZEIcEdzkmc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzMzLzM4LzI1/LzM2MF9GXzIzMzM4/MjU4MF9GekQ5UWRw/YmM1RzVVWmt0NEI5/Qnk4Nmd0d3NEbjRr/cy5qcGc", reviews: "Expert in his field, provided great care.", availability: [{ date: "2023-11-21", slot: "2:30 PM - 3:00 PM" }, { date: "2023-11-23", slot: "4:00 PM - 4:30 PM" }] },

    // --- Delhi: Apollo Delhi ---
    { id: 12, name: "Dr. Priya Sharma", department: "ent", hospital: "Apollo Delhi", shift: "Morning", days: "Mon-Fri", time: "10:00 AM - 1:00 PM", img: "https://i.pravatar.cc/150?img=43", reviews: "Friendly and highly professional ENT doctor.", availability: [{ date: "2023-11-20", slot: "10:00 AM - 10:30 AM" }, { date: "2023-11-21", slot: "11:00 AM - 11:30 AM" }] },
    { id: 13, name: "Dr. Neha Singh", department: "pediatrics", hospital: "Apollo Delhi", shift: "Evening", days: "Mon-Fri", time: "5:00 PM - 8:00 PM", img: "https://imgs.search.brave.com/y6um_kV2h9-Im2_wdRXXg1W-2-H1wEwsHCBcfKA0QEk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdG9y/YWdlLmdvb2dsZWFw/aXMuY29tL3RyZWF0/c3BhY2UtcHJvZC1t/ZWRpYS9wcmFjaW1n/L3UtNTY0L2ltYWdl/XzdCZlc3NGwuanBl/Zw", reviews: "Caring pediatrician, kids love her.", availability: [{ date: "2023-11-20", slot: "6:00 PM - 6:30 PM" }, { date: "2023-11-22", slot: "5:30 PM - 6:00 PM" }] },
    { id: 20, name: "Dr. Preeti Jain", department: "dermatology", hospital: "Apollo Delhi", shift: "Afternoon", days: "Wed-Sat", time: "2:00 PM - 5:00 PM", img: "https://imgs.search.brave.com/Islj60EzGqOQNR7uftrJ1cZK5KG4bm6upS6nvGsDWZ8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9zaHV0dGVy/c3RvY2svcGhvdG9z/LzE1NjU0MTM5MDYv/ZGlzcGxheV8xNTAw/L3N0b2NrLXBob3Rv/LWRlcm1hdG9sb2dp/c3Qtc2l0dGluZy1h/dC10YWJsZS1hbmQt/bGlzdGVuaW5nLXRv/LXBhdGllbnQtaW4t/Y2xpbmljLTE1NjU0/MTM5MDYuanBn", reviews: "Provided great solutions for my skin condition.", availability: [{ date: "2023-11-22", slot: "3:00 PM - 3:30 PM" }, { date: "2023-11-25", slot: "4:00 PM - 4:30 PM" }] }
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