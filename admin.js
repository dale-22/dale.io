// Button to generate Transaction Table
$(document).ready(function() {
  // Add event listener to the "Generate Reports" button
  $("#generateTransactionBtn").click(function() {
    // Call the populateGuestTable function
    populateGuestTable();

    // Hide the user table and show the guest table
    $("#userContainer").hide();
    $("#reservationContainer").show();
    $("#generatedReports").hide();
  });
});

// Button to generate Account Management Table
$(document).ready(function() {
  // Add event listener to the "Generate Reports" button
  $("#accountManagementBtn").click(function() {
    // Call the populateGuestTable function
    populateUserTable();

    // Hide the user table and show the guest table
    $("#userContainer").show();
    $("#reservationContainer").hide();
    $("#generatedReports").hide();
  });
});

// Bttton to generate Reports Table
$(document).ready(function() {
  // Add event listener to the "Generate Reports" button
  $("#generateReportBtn").click(function() {
    // Call the populateGuestTable function
    generateReport();

    // Hide the user table and show the guest table
    $("#userContainer").hide();
    $("#reservationContainer").hide();
    $("#generatedReports").show();
  });
});

  // Function to generate the user table
  function populateUserTable() {
    // Retrieve user data from local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userTableBody = $("#userTable tbody");
    let reservationTableBody = $("#reservationTable tbody");

    // Clear existing table rows
    userTableBody.empty();
    reservationTableBody.empty();

    // Loop through each user and add a row to the user table
    users.forEach(function(user) {
      let userRow = $("<tr>");

      let guestIDCell = $("<td>").text(user.guestId);
      userRow.append(guestIDCell);

      let usernameCell = $("<td>").text(user.username);
      userRow.append(usernameCell);

      let emailCell = $("<td>").text(user.email);
      userRow.append(emailCell);

      let passwordCell = $("<td>").text(user.password);
      userRow.append(passwordCell);

      let statusCell = $("<td>").text(user.isLoggedIn ? "Online" : "Offline");
      userRow.append(statusCell);

      let manageCell = $("<td>");


      let updateButton = $("<button>").text("Update");
      updateButton.on("click", function() {
        updateUser(user.guestId);
      });
      manageCell.append(updateButton);

      let deleteButton = $("<button>").text("Delete");
      deleteButton.on("click", function() {
        deleteUser(user.guestId);
      });
      manageCell.append(deleteButton);

      userRow.append(manageCell);

      userTableBody.append(userRow);
    });
  }

  $(window).on("load", populateUserTable);


// Function to generate the transaction table
function populateGuestTable() {
  // Retrieve user data from local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let guestTableBody = $("#reservationTable tbody");

  // Clear existing table rows
  guestTableBody.empty();

  // Loop through each user and add a row to the guest table
  users.forEach(function(user) {
    // Check if the user has reservations
    if (user.reservations && user.reservations.length > 0) {
      // Loop through each reservation and add separate rows for each detail
      user.reservations.forEach(function(reservation) {
        let reservationRow = $("<tr>");

        let guestIDCell = $("<td>").text(user.guestId);
        reservationRow.append(guestIDCell);

        let usernameCell = $("<td>").text(user.username);
        reservationRow.append(usernameCell);

        let emailCell = $("<td>").text(user.email);
        reservationRow.append(emailCell);

        let checkInDateCell = $("<td>").text(reservation.checkInDate);
        reservationRow.append(checkInDateCell);

        let checkOutDateCell = $("<td>").text(reservation.checkOutDate);
        reservationRow.append(checkOutDateCell);

        let guestNameCell = $("<td>").text(reservation.guestName);
        reservationRow.append(guestNameCell);

        let contactsCell = $("<td>").text(reservation.contacts);
        reservationRow.append(contactsCell);

        let roomNumberCell = $("<td>").text(reservation.roomNumber);
        reservationRow.append(roomNumberCell);

        // Generate a drop-down button with payment status options
        let paymentStatusCell = $("<td>");
        let paymentStatusDropdown = $("<select>");

        // Add options for payment status
        let paidOption = $("<option>").val("paid").text("Paid");
        paymentStatusDropdown.append(paidOption);

        let unpaidOption = $("<option>").val("unpaid").text("Unpaid");
        paymentStatusDropdown.append(unpaidOption);

        var onHoldOption = $("<option>").val("onHold").text("On Hold");
        paymentStatusDropdown.append(onHoldOption);

        paymentStatusDropdown.val(reservation.paymentStatus);
        paymentStatusDropdown.on("change", function() {
          reservation.paymentStatus = paymentStatusDropdown.val();
        });

        paymentStatusCell.append(paymentStatusDropdown);
        reservationRow.append(paymentStatusCell);

        // Generate a drop-down button with guest status options
        let guestStatusCell = $("<td>");
        let guestStatusDropdown = $("<select>");

        // Add options for guest status
        let checkedInOption = $("<option>").val("checkedIn").text("Checked In");
        guestStatusDropdown.append(checkedInOption);

        let checkedOutOption = $("<option>").val("checkedOut").text("Checked Out");
        guestStatusDropdown.append(checkedOutOption);

        var onHoldOption = $("<option>").val("onHold").text("On Hold");
        guestStatusDropdown.append(onHoldOption);

        guestStatusDropdown.val(reservation.guestStatus);
        guestStatusDropdown.on("change", function() {
          reservation.guestStatus = guestStatusDropdown.val();
        });

        guestStatusCell.append(guestStatusDropdown);
        reservationRow.append(guestStatusCell);

        let saveButtonCell = $("<td>");
        let saveButton = $("<button>").text("Save");
        saveButton.on("click", function() {
          updateLocalStorage(users);
        });
        saveButtonCell.append(saveButton);
        reservationRow.append(saveButtonCell);

        guestTableBody.append(reservationRow);
      });
    }
  });

  function updateLocalStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  updateLocalStorage(users);
}
  $(document).ready(function() {
    populateGuestTable();
  });

// Function to generate the report table
  function generateReport() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let reservedRoomsCount = 0;
    let checkedInCount = 0;
    let checkedOutCount = 0;
    let onHoldCount = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let reportTableBody = $("#generatedReportstbl tbody");
    let existingReservationIds = [];
  
    // Clear the existing table body
    reportTableBody.empty();
  
    users.forEach(function(user) {
      let reservations = user.reservations || [];
  
      reservations.forEach(function(reservation) {
        if (!existingReservationIds.includes(reservation.reservationId)) {
          existingReservationIds.push(reservation.reservationId);
          reservedRoomsCount++;
  
          let reportRow = $("<tr></tr>");
  
          $("<td></td>").text(reservation.reservationId).appendTo(reportRow);
          $("<td></td>").text(user.guestId).appendTo(reportRow);
          $("<td></td>").text(user.username).appendTo(reportRow);
          $("<td></td>").text(user.email).appendTo(reportRow);
          $("<td></td>").text(reservation.checkInDate).appendTo(reportRow);
          $("<td></td>").text(reservation.checkOutDate).appendTo(reportRow);
          $("<td></td>").text(reservation.guestName).appendTo(reportRow);
          $("<td></td>").text(reservation.contacts).appendTo(reportRow);
          $("<td></td>").text(reservation.roomNumber).appendTo(reportRow);
          $("<td></td>").text(reservation.guestStatus).appendTo(reportRow);
          $("<td></td>").text(reservation.paymentStatus).appendTo(reportRow);
  
          reportTableBody.append(reportRow);
  
          // Update guest status counts based on reservation status
          if (reservation.guestStatus === "checkedIn") {
            checkedInCount++;
          } else if (reservation.guestStatus === "checkedOut") {
            checkedOutCount++;
          } else if (reservation.guestStatus === "onHold") {
            onHoldCount++;
          }
  
          // Update payment status counts based on payment status
          if (reservation.paymentStatus === "paid") {
            paidCount++;
          } else if (reservation.paymentStatus === "unpaid") {
            unpaidCount++;
          }
        }
      });
    });
  
    // Display the reserved rooms count
    $("#reservedRoomsCount").text("Number of reserved rooms: " + reservedRoomsCount);
  
    // Display the guest status counts
    $("#checkedInCount").text("Checked-In: " + checkedInCount);
    $("#checkedOutCount").text("Checked-Out: " + checkedOutCount);
    $("#onHoldCount").text("On Hold: " + onHoldCount);
  
    // Display the payment status counts
    $("#paidCount").text("Paid: " + paidCount);
    $("#unpaidCount").text("Unpaid: " + unpaidCount);
  }



// function to delete a user
function deleteUser(guestId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the index of the user with the given guestId
  let userIndex = users.findIndex(function(user) {
    return user.guestId === guestId;
  });

  if (userIndex !== -1) {
    // Prompt the user for confirmation
    let confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      // Remove the user from the users array
      users.splice(userIndex, 1);

      // Update the user data in local storage
      localStorage.setItem("users", JSON.stringify(users));

      // Re-populate the user table to reflect the changes
      populateUserTable();

      // Display a success message or perform any other actions
      alert("User deleted successfully.");
    }
  } else {
    // Display an error message or perform any other actions
    alert("User not found.");
  }
}



function updateUser(guestId) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user with the given guestId
  let user = users.find(function(user) {
    return user.guestId === guestId;
  });

  if (user) {
    // Perform the update operation on the user object
    // For example, prompt the user to enter the updated details and update the user object accordingly
    let updatedUsername = prompt("Enter the updated username:");
    if (updatedUsername === null) {
      // User canceled the operation, no further action needed
      return;
    }

    let updatedEmail = prompt("Enter the updated email:");
    if (updatedEmail === null) {
      // User canceled the operation, no further action needed
      return;
    }

    let updatedPassword = prompt("Enter the updated password:");
    if (updatedPassword === null) {
      // User canceled the operation, no further action needed
      return;
    }

    // Update the user object with the new values
    user.username = updatedUsername;
    user.email = updatedEmail;
    user.password = updatedPassword;

    // Update the user data in local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Re-populate the user table to reflect the changes
    populateUserTable();

    // Display a success message or perform any other actions
    alert("User updated successfully.");
  } else {
    // Display an error message or perform any other actions
    alert("User not found.");
  }
}