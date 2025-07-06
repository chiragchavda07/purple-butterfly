document.addEventListener('DOMContentLoaded', () => {
  const photos = document.querySelectorAll('.photo img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightboxBtn = document.getElementById('closeLightbox');

  const gallery = document.querySelector('.gallery');
  const backgroundMusic = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');

  // Show gallery only after audio can play through
  backgroundMusic.addEventListener('canplaythrough', () => {
    gallery.classList.add('visible');
  });

  photos.forEach(photo => {
    photo.addEventListener('click', () => {
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      closeLightboxBtn.focus();
    });

    photo.parentElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photo.click();
      }
    });
  });

  closeLightboxBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  // Automatically unmute and play music on first user interaction
  function unmuteAndPlay() {
    backgroundMusic.muted = false;
    backgroundMusic.play();
    musicToggle.innerHTML = '&#10074;&#10074;'; // Pause icon
    document.removeEventListener('click', unmuteAndPlay);
    document.removeEventListener('keydown', unmuteAndPlay);
  }

  document.addEventListener('click', unmuteAndPlay);
  document.addEventListener('keydown', unmuteAndPlay);

  musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicToggle.innerHTML = '&#10074;&#10074;'; // Pause icon
    } else {
      backgroundMusic.pause();
      musicToggle.innerHTML = '&#9658;'; // Play icon
    }
  });
});
