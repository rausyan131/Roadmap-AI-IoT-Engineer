document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling.nextElementSibling; 
      content.classList.toggle('open');
    });
  });

  const phases = [1, 2, 3, 4, 5, 6];
  phases.forEach(phase => {
    const checklists = document.querySelectorAll(`#phase${phase} .checklist`);
    const progressBar = document.getElementById(`progress-bar-phase${phase}`);

    checklists.forEach(checkbox => {
      const savedState = localStorage.getItem(checkbox.id);
      if (savedState === 'checked') {
        checkbox.checked = true;
      }
    });

    const updateProgress = () => {
      const total = checklists.length;
      const checked = Array.from(checklists).filter(cb => cb.checked).length;
      const percentage = Math.round((checked / total) * 100);
      progressBar.style.width = `${percentage}%`;
    };

    updateProgress();

    checklists.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        localStorage.setItem(checkbox.id, checkbox.checked ? 'checked' : 'unchecked');
        updateProgress();
      });
    });
  });