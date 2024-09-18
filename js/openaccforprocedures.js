document.addEventListener('DOMContentLoaded', function () {
    // Function to open the accordion, scroll to it, and highlight the specific element
    function openAccordionAndHighlightFromHash() {
        const hash = window.location.hash.substring(1); // Remove the '#' at the start
        const [accordionId, panelId, elementClass] = hash.split(':');
  
        if (accordionId && panelId && elementClass) {
            const accordion = document.getElementById(accordionId);
            const panel = document.getElementById(panelId);
            const elementToHighlight = panel.querySelector('.' + elementClass);
            
            // Open the accordion panel
            if (!panel.style.display || panel.style.display === 'none') {
                accordion.classList.add("active");
                panel.style.display = "block";
            }
  
            // Scroll to the accordion and center the highlighted element in the viewport
            const yOffset = -window.innerHeight / 2; // Centering offset
            const elementPosition = elementToHighlight.getBoundingClientRect().top + window.pageYOffset;
            const yOffsetPosition = elementPosition + yOffset;
            window.scrollTo({ top: yOffsetPosition, behavior: 'smooth' });
  
            // Highlight the element
            elementToHighlight.classList.add('highlight');
        }
    }
  
    openAccordionAndHighlightFromHash();
  });

  document.addEventListener('DOMContentLoaded', function () {
    // Attach event listeners to all links with the class 'accordion-ref'
    const links = document.querySelectorAll('a.accordion-ref');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const accordionId = link.getAttribute('data-accordion-id');
            const panelId = link.getAttribute('data-panel-id');
            const elementClass = link.getAttribute('data-element-class');
  
            // Modify the href to include the accordion details in the hash
            const href = `${link.href.split('#')[0]}#${accordionId}:${panelId}:${elementClass}`;
            
            // Open the link in a new tab with the modified href
            window.open(href, '_blank');
        });
  
        // Attach touch event listeners for touch devices
        link.addEventListener('touchstart', function (e) {
            const accordionId = link.getAttribute('data-accordion-id');
            const panelId = link.getAttribute('data-panel-id');
            const elementClass = link.getAttribute('data-element-class');
  
            // Modify the href to include the accordion details in the hash
            const href = `${link.href.split('#')[0]}#${accordionId}:${panelId}:${elementClass}`;
            
            // Open the link in a new tab with the modified href
            window.open(href, '_blank');
        });
    });
  });
  