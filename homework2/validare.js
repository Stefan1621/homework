function validateForm() {
    // Resetăm mesajele de eroare
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('confirmPasswordError').innerHTML = '';
  
    // Obținem valorile introduse de utilizator
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
  
    // Validarea adresei de e-mail
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').innerHTML = 'Adresa de e-mail nu este validă';
      return false;
    }
  
    // Validarea parolei (minim 8 caractere, cel puțin o literă mică, o literă mare, un număr și un caracter special)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById('passwordError').innerHTML = 'Parola trebuie să aibă cel puțin 8 caractere, o literă mică, o literă mare, un număr și un caracter special';
      return false;
    }
  
    // Validarea confirmării parolei
    if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').innerHTML = 'Parola nu se potrivește cu confirmarea';
      return false;
    }
  
    // Formularul este valid
    alert('Formularul este valid! Puteți să vă înregistrați.');
    return true;
  }  