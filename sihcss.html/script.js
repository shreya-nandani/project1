// Handle User Form
document.getElementById("userForm").addEventListener("submit", function(event){
  event.preventDefault();
  alert("User Login Successful!");
});

// Handle Demographic Form
document.getElementById("demographicForm").addEventListener("submit", function(event){
  event.preventDefault();
  alert("Demographic Profile Created!");
});

// Admin Button
document.querySelector(".admin-btn").addEventListener("click", function(){
  alert("Redirecting to Admin Portal...");
});
