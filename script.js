document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-icon');
  const toggleText = document.getElementById('theme-text');

  // Check system preference and local storage
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
    updateToggleUI('light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleUI(newTheme);
  });

  function updateToggleUI(theme) {
    if (theme === 'light') {
      toggleIcon.textContent = '🌙';
      toggleText.textContent = 'Dark Mode';
    } else {
      toggleIcon.textContent = '☀️';
      toggleText.textContent = 'Light Mode';
    }
  }

  // Load and inject the Ohio background map SVG
  const mapContainer = document.getElementById('bg-map-container');
  if (mapContainer) {
    fetch('ohio-bg.svg')
      .then(response => response.text())
      .then(svgData => {
        mapContainer.innerHTML = svgData;
      })
      .catch(err => console.error('Error loading background map:', err));
  }
});
