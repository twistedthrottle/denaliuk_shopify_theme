Parallax = function(container) {
    // Get images
    const images = document.querySelectorAll('img');

    // Bail if no images.
    if (images.length == 0) {
        console.warn('Warning. No images.');
        return false;
    }

    images.forEach((image) => {

        const instance = new simpleParallax(image, {
           scale: 1.2,
           delay: .5,
           overflow: false,
           customWrapper: 'parallax__image',
           transition: 'cubic-bezier(0,0,0,1)'
       });

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    instance.refresh();
                }
            });
        }

        const observer = new IntersectionObserver(callback);
        observer.observe(image);
    });
}

// Load vendor script once
if ( document.querySelectorAll('[data-section-type="parallax"]').length >= 1 ) {
const loader = new theme.Helpers.scriptLoader();
loader.load([jsAssets.parallax]).finally(() => {
    initParallax();
});
}

// initParallax for each section on load and editor events
function initParallax() {
document.querySelectorAll('[data-section-type="parallax"]').forEach(function(container){
    Parallax(container);
});

document.addEventListener("shopify:section:load", function(event) {
    if (event.target.querySelector('[data-section-type="parallax"]')) {
    Parallax(event.target.querySelector('[data-section-type="parallax"]'));
    }
});
}
