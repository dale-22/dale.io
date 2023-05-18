$(document).ready(function() {
    $('#reservation-btn').click(function(event) {
       event.preventDefault(); // Prevent the default form submission
 
       let checkInDate = $('#check-in-date').val();
       let checkOutDate = $('#check-out-date').val();
       let guestName = $('#guest-name').val();
       let contacts = $('#contacts').val();
       let roomNumber = $('#room-number').val();
 
       // Perform reservation validation
       if (checkInDate && checkOutDate && guestName && contacts && roomNumber) {
          if (isReservationDateAvailable(checkInDate, checkOutDate, roomNumber)) {
             let proceed = confirm('The selected dates are available. Would you like to proceed with the reservation?');
             if (proceed) {
                let reservation = {
                   checkInDate: checkInDate,
                   checkOutDate: checkOutDate,
                   guestName: guestName,
                   contacts: contacts,
                   roomNumber: roomNumber
                };
                saveReservation(reservation); // Save the reservation
             }
          } else {
             alert('There is already a reservation for the selected date or room number. Please choose another date or room number.');
          }
       } else {
          alert('Please fill in all the reservation details.');
       }
    });
 
    function isReservationDateAvailable(checkInDate, checkOutDate, roomNumber) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        for (let i = 0; i < users.length; i++) {
           let user = users[i];
           let userReservations = user.reservations || [];
           
           for (let j = 0; j < userReservations.length; j++) {
              let reservation = userReservations[j];
              
              if (
                 reservation.roomNumber === roomNumber &&
                 (
                    (new Date(checkInDate) >= new Date(reservation.checkInDate) && new Date(checkInDate) < new Date(reservation.checkOutDate)) ||
                    (new Date(checkOutDate) > new Date(reservation.checkInDate) && new Date(checkOutDate) <= new Date(reservation.checkOutDate)) ||
                    (new Date(checkInDate) <= new Date(reservation.checkInDate) && new Date(checkOutDate) >= new Date(reservation.checkOutDate))
                 )
              ) {
                 return false; // Overlapping reservation found
              }
           }
        }
        
        return true; // No overlapping reservations found
     }
 
// Function to generate a reservation ID
function generateReservationId() {
    // Logic to generate a unique reservation ID, such as using a timestamp or a combination of random characters
    // Return the generated reservation ID
    return "RES-" + Math.floor(Math.random() * 1000000);
  }
  
  // Function to save the reservation
  function saveReservation(reservation) {
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
    if (loggedInUser) {
      // Generate a reservation ID
      let reservationId = generateReservationId();
  
      // Add the reservation ID to the reservation object
      reservation.reservationId = reservationId;
  
      // Retrieve the reservations for the logged-in user from local storage
      let userReservations = loggedInUser.reservations || [];
  
      // Add the new reservation to the user's reservations
      userReservations.push(reservation);
  
      // Update the reservations for the logged-in user
      loggedInUser.reservations = userReservations;
  
      // Retrieve the user data from local storage
      let users = JSON.parse(localStorage.getItem('users')) || [];
  
      // Find the index of the logged-in user in the users array
      let existingUserIndex = users.findIndex(function(user) {
        return user.username === loggedInUser.username;
      });
  
      if (existingUserIndex !== -1) {
        // Update the existing user data
        users[existingUserIndex].reservations = userReservations;
      }
  
      // Store the updated user data in local storage
      localStorage.setItem('users', JSON.stringify(users));
      alert('Reservation successful! Thank you for choosing our service.');
      window.location.href = "homepage.html";
    }
  }

  function backHomepage(){
    // Redirect to homepage
    window.location.href = "homepage.html";
 }
 const homeLink = document.getElementById('home-link');
 homeLink.addEventListener('click', backHomepage);

});



    