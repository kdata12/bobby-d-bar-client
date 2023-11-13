document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight; // Get the height of the navigation bar

    window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > navHeight) {
        // Scrolling Down
        nav.classList.remove('nav-visible');
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling Up
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);

    const current_location = window.location.href;
    const navLinks = document.querySelectorAll('nav a')
  
    navLinks.forEach(link => {
      if (link.href == current_location) {
        link.classList.add('active')
      }
    })
})

let saveFile = () => {
    	
    // Get the data from each element on the form.
    const uname = document.getElementById('uname');
    const fname = document.getElementById('fname');
    const email = document.getElementById('email');
    const Address = document.getElementById('Address');
    const paymentMethod = document.getElementById('paymentMethod');
    const message = document.getElementById('Address');

    
    // This variable stores all the data.
    let data = 
        '\r Username: ' + uname.value + ' \r\n ' + 
        'Full Name: ' +fname.value + ' \r\n ' + 
        'Email: ' + email.value + ' \r\n ' + 
        'Address: ' + Address.value + ' \r\n ' + 
        'Payment Method: ' + paymentMethod.value + ' \r\n ' + 
        'Message: ' + message.value;
    
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click(); 
}