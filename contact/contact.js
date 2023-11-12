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