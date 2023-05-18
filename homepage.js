   // Check availability
   document.getElementById('availability').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
   
      var checkIn = document.getElementById('check-in').value;
      var checkOut = document.getElementById('check-out').value;
   
   // Perform reservation validation
      if (checkIn && checkOut) {
      if (isReservationDateAvailable(checkIn, checkOut)) {
         var proceed = confirm('The selected dates are available. Would you like to proceed with the reservation?');
         if (proceed) {
            window.location.href = "reservation.html";
         }
      } else {
         alert('There is already a reservation for the selected date. Please choose another date.');
      }
      } else {
      alert('Please fill in all the reservation details.');
      }
   });

 //check the availability of the reservation date
   function isReservationDateAvailable(checkInDate, checkOutDate) {
   var reservations = JSON.parse(localStorage.getItem('reservations')) || [];
   for (var i = 0; i < reservations.length; i++) {
     var reservation = reservations[i];
     var existingCheckInDate = new Date(reservation.checkInDate);
     var existingCheckOutDate = new Date(reservation.checkOutDate);
     var newCheckInDate = new Date(checkInDate);
     var newCheckOutDate = new Date(checkOutDate);
 
     if (
       (newCheckInDate >= existingCheckInDate && newCheckInDate < existingCheckOutDate) ||
       (newCheckOutDate > existingCheckInDate && newCheckOutDate <= existingCheckOutDate) ||
       (newCheckInDate <= existingCheckInDate && newCheckOutDate >= existingCheckOutDate)
     ) {
       return false; // Conflict found, the date is not available
     }
   }
   return true; // No conflicts found, the date is available
 }
  

   // Function to handle logout
   function handleLogout() {
      // Retrieve user data from local storage
      var users = JSON.parse(localStorage.getItem("users")) || [];
   
      // Find the logged-in user
      var loggedInUser = users.find(function(u) {
      return u.isLoggedIn === true;
      });
   
      if (loggedInUser) {
      // Mark the user as logged out
      loggedInUser.isLoggedIn = false;
   
      // Store the updated user data in local storage
      localStorage.setItem("users", JSON.stringify(users));
   
      // Redirect to the login page
      window.location.href = "login.html";
      }
   }

   var logoutLink = document.getElementById('logout-link');
   logoutLink.addEventListener('click', handleLogout);


// Homepage animation
let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
   navbar.classList.toggle('active');
}

window.onscroll = () =>{
   navbar.classList.remove('active');
}

document.querySelectorAll('.contact .row .faq .box h3').forEach(faqBox => {
   faqBox.onclick = () =>{
      faqBox.parentElement.classList.toggle('active');
   }
});

var swiper = new Swiper(".home-slider", {
   loop:true,
   effect: "coverflow",
   spaceBetween: 30,
   grabCursor: true,
   coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".gallery-slider", {
   loop:true,
   effect: "coverflow",
   slidesPerView: "auto",
   centeredSlides: true,
   grabCursor: true,
   coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
   },
   pagination: {
      el: ".swiper-pagination",
    },
});

var swiper = new Swiper(".reviews-slider", {
   loop:true,
   slidesPerView: "auto",
   grabCursor: true,
   spaceBetween: 30,
   pagination: {
      el: ".swiper-pagination",
   },
   breakpoints: {
      768: {
        slidesPerView: 1,
      },
      991: {
        slidesPerView: 2,
      },
   },
});
