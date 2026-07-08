document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.step');
  
  // Graphic Elements
  const loopLeft = document.getElementById('svg-loop-left');
  const loopRight = document.getElementById('svg-loop-right');
  const bedrock = document.getElementById('svg-bedrock');
  const node1 = document.getElementById('node-1');
  const node2 = document.getElementById('node-2');
  const node3 = document.getElementById('node-3');
  const node4 = document.getElementById('node-4');

  // Helper to reset all graphic elements
  function resetGraphics() {
    [loopLeft, loopRight, bedrock, node1, node2, node3, node4].forEach(el => {
      if(el) el.classList.remove('active');
    });
  }

  // Define what happens for each step index (1-6)
  function activateStepGraphics(stepIndex) {
    resetGraphics();
    
    switch (stepIndex) {
      case 1:
        // The Blank Page Problem: Everything is dim/inactive (default state).
        break;
      case 2:
        // Prepared Canvassers: Left loop activates, top-left node lights up.
        loopLeft.classList.add('active');
        node1.classList.add('active');
        break;
      case 3:
        // Confident Door-Knocks: Left loop is active, bottom-left node lights up.
        loopLeft.classList.add('active');
        node1.classList.add('active');
        node2.classList.add('active');
        break;
      case 4:
        // The Field Notes Bedrock: Bedrock activates, left loop remains active.
        loopLeft.classList.add('active');
        bedrock.classList.add('active');
        node1.classList.add('active');
        node2.classList.add('active');
        break;
      case 5:
        // The Model Recalibrates: Right loop starts activating, bedrock active.
        loopLeft.classList.add('active');
        bedrock.classList.add('active');
        loopRight.classList.add('active');
        node3.classList.add('active');
        break;
      case 6:
        // Sharper Briefings & Compounding Trust
        loopLeft.classList.add('active');
        bedrock.classList.add('active');
        loopRight.classList.add('active');
        node1.classList.add('active');
        node2.classList.add('active');
        node3.classList.add('active');
        node4.classList.add('active');
        break;
      case 7:
        // Winning Elections: The full system glows.
        loopLeft.classList.add('active');
        bedrock.classList.add('active');
        loopRight.classList.add('active');
        node1.classList.add('active');
        node2.classList.add('active');
        node3.classList.add('active');
        node4.classList.add('active');
        // Extra effect can be applied via CSS if needed
        break;
      default:
        break;
    }
  }

  // Setup Intersection Observer for Scrollytelling
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', // Triggers when the step is near the middle of the viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all steps
        steps.forEach(s => s.classList.remove('is-active'));
        
        // Add active class to current step
        entry.target.classList.add('is-active');

        // Trigger corresponding SVG changes
        const stepIndex = parseInt(entry.target.getAttribute('data-step'), 10);
        activateStepGraphics(stepIndex);
      }
    });
  }, observerOptions);

  steps.forEach(step => observer.observe(step));
});
