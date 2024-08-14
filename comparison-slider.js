<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LUT Comparison Slider for Leadpages Embeds</title>
    <style>
        .comparison-slider {
            position: relative;
            width: 100%;
            max-width: 800px;
            height: 400px;
            overflow: hidden;
            margin: 20px auto;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .comparison-slider img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            pointer-events: none;
        }
        .comparison-slider .before-image {
            clip-path: inset(0 50% 0 0);
        }
        .comparison-slider .slider {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 4px;
            background: white;
            cursor: ew-resize;
        }
        .comparison-slider .slider::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            opacity: 0.8;
        }
        .comparison-slider .label {
            position: absolute;
            bottom: 10px;
            padding: 5px 10px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            border-radius: 4px;
            pointer-events: none;
        }
        .comparison-slider .label.before {
            left: 10px;
        }
        .comparison-slider .label.after {
            right: 10px;
        }
    </style>
</head>
<body>
    <div id="comparisonSliderContainer"></div>

    <script>
        function initComparisonSlider(containerId, beforeSrc, afterSrc, beforeLabel, afterLabel) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const sliderHtml = `
                <div class="comparison-slider">
                    <img src="${afterSrc}" alt="After LUT" class="after-image">
                    <img src="${beforeSrc}" alt="Before LUT" class="before-image">
                    <div class="slider"></div>
                    <div class="label before">${beforeLabel}</div>
                    <div class="label after">${afterLabel}</div>
                </div>
            `;
            container.innerHTML = sliderHtml;

            const slider = container.querySelector('.comparison-slider');
            const beforeImage = slider.querySelector('.before-image');
            const sliderHandle = slider.querySelector('.slider');
            let isDragging = false;

            const updateSliderPosition = (x) => {
                const sliderRect = slider.getBoundingClientRect();
                let position = (x - sliderRect.left) / sliderRect.width;
                position = Math.max(0, Math.min(position, 1));
                
                beforeImage.style.clipPath = `inset(0 ${(1 - position) * 100}% 0 0)`;
                sliderHandle.style.left = `${position * 100}%`;
            };

            const handleMove = (e) => {
                if (!isDragging) return;
                const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
                updateSliderPosition(clientX);
                e.preventDefault();
            };

            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                handleMove(e);
            });

            slider.addEventListener('touchstart', (e) => {
                isDragging = true;
                handleMove(e.touches[0]);
            });

            window.addEventListener('mousemove', handleMove);
            window.addEventListener('touchmove', handleMove);

            window.addEventListener('mouseup', () => isDragging = false);
            window.addEventListener('touchend', () => isDragging = false);

            // Initialize slider position
            updateSliderPosition(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width / 2);
        }

        // Example usage:
        initComparisonSlider('comparisonSliderContainer', '/api/placeholder/800/400?text=Before+LUT', '/api/placeholder/800/400?text=After+LUT', 'Rec 709', 'LUT Name');
    </script>
</body>
</html>
