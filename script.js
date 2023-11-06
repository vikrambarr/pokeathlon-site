document.addEventListener('DOMContentLoaded', (event) => {

    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        const container = document.getElementById('container');

        container.addEventListener('click', function(e) {
            e.preventDefault();
        });

        container.addEventListener('dblclick', function(e) {
            const iconWrapper = e.target.closest('.icon-wrapper');
            if (iconWrapper) {
                const link = iconWrapper.querySelector('a');
                if (link) window.open(link.href, '_blank');
            }
        });

        let draggedItem = null;
        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialIconX = 0;
        let initialIconY = 0;

        container.addEventListener('mousedown', function(e) {
            const selected = document.querySelector('.selected');
            if (selected) selected.classList.remove('selected');

            if (e.target.closest('.icon-wrapper')) {
                e.target.closest('.icon-wrapper').classList.add('selected');
                e.preventDefault();
            }

            e.preventDefault();
            draggedItem = e.target.closest('.icon-wrapper');
            if (draggedItem) {
                initialMouseX = e.clientX;
                initialMouseY = e.clientY;
                initialIconX = (draggedItem.offsetLeft / container.offsetWidth) * 100;
                initialIconY = (draggedItem.offsetTop / container.offsetHeight) * 100;

                const onMouseMove = (e) => {
                    const deltaXPercent = ((e.clientX - initialMouseX) / container.offsetWidth) * 100;
                    const deltaYPercent = ((e.clientY - initialMouseY) / container.offsetHeight) * 100;
                    draggedItem.style.left = `${initialIconX + deltaXPercent}%`;
                    draggedItem.style.top = `${initialIconY + deltaYPercent}%`;
                };
        
                const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };
        
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }
        });
    } else {
        const marqueeText = document.getElementsByClassName('poke-marquee');
        for (let marqueeElem of marqueeText) marqueeElem.style.display = 'none';
    }
});