async function loadCMSContent() {
  // 1. Logo
  const logo = await fetch('/content/logo.json').then(r => r.json());
  document.getElementById('site-logo').src = logo.logo;

  // 2. Clients section
  const clients = await fetch('/content/clients.json').then(r => r.json());
  document.getElementById('clients-title').textContent = clients.clients_title;
  document.getElementById('clients-subtitle').textContent = clients.clients_subtitle;

  const logosContainer = document.getElementById('clients-logos');
  logosContainer.innerHTML = '';
  clients.clients_logos.forEach(url => {
    const div = document.createElement('div');
    div.className = 'client-item';
    div.innerHTML = `<img src="${url}" alt="Client">`;
    logosContainer.appendChild(div);
  });

  // 3. Contact info
  const contact = await fetch('/content/contact.json').then(r => r.json());
  document.getElementById('contact-phone').textContent = contact.contact_phone;
  document.getElementById('contact-email').textContent = contact.contact_email;
  document.getElementById('contact-address').textContent = contact.contact_address;
  document.getElementById('contact-whatsapp').href = contact.contact_whatsapp;

  // 4. Social links
  const social = await fetch('/content/social.json').then(r => r.json());
  document.getElementById('social-twitter').href = social.social_twitter;
  document.getElementById('social-linkedin').href = social.social_linkedin;
  document.getElementById('social-facebook').href = social.social_facebook;
  document.getElementById('social-instagram').href = social.social_instagram;
}

// run after DOM is ready
document.addEventListener('DOMContentLoaded', loadCMSContent);
