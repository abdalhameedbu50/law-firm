// js/cms-content.js
fetch('/content/home.json')
  .then(response => response.json())
  .then(data => {
    // Hero section
    document.getElementById('hero_title').textContent = data.hero_title;
    document.getElementById('hero_subtitle').textContent = data.hero_subtitle;

    const cta  = document.getElementById('hero_cta');
    cta.textContent = data.hero_cta_text;
    cta.href        = data.hero_cta_url;

    const cta2 = document.getElementById('hero_cta2');
    cta2.textContent = data.hero_cta2_text;
    cta2.href        = data.hero_cta2_url;

    // Contact info
    document.getElementById('contact_phone').textContent   = data.contact_phone;
    document.getElementById('contact_email').textContent   = data.contact_email;
    document.getElementById('contact_address').textContent = data.contact_address;

    const whatsapp = document.getElementById('whatsapp_link');
    whatsapp.href = data.whatsapp_link || `https://wa.me/${data.contact_whatsapp}`;

    // Logos
    document.getElementById('site_logo').src   = data.site_logo;
    document.getElementById('footer_logo').src = data.site_logo;
    document.getElementById('footer_tagline').textContent = data.footer_tagline;

    // Clients slider
    const slider = document.getElementById('clients_slider');
    if (slider && Array.isArray(data.clients)) {
      slider.innerHTML = '';
      data.clients.forEach(c => {
        const item = document.createElement('div');
        item.className = 'client-item';
        item.innerHTML = `<img src="${c.image}" alt="${c.alt}">`;
        slider.appendChild(item);
      });
    }
  })
  .catch(err => console.error('Error loading CMS content:', err));
