// Sending Message through email
// Can't directly send without server side lang - first store the message in json and then
// server sidee automatically sends that mail securely to us.
document.getElementById('sendMssg').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('mssg').value;
    let subject = document.getElementById('subject').value;

    // Prepare email body
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message;
    
    // Send email
    window.open("mailto:sannyajuneja4@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body));

    // Reseting the inputs

    // name = '';
    // This won't work bcoz name contains the entered value of name by the user, 
    // not the value prop
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mssg').value = '';
    document.getElementById('subject').value = '';
            
  });
  