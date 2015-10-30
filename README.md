# Lightweight jQuery Slider
## Demo
Check live version:
http://plata.adamwaz.pl/apps/slider/
##Installation
###1. Link files
Link all required files before closing your <body>.
```html
<!-- jQuery library -->
<script src="assets/js/jquery-1.11.2.min.js"></script>
<!-- Slider JS File -->
<script src="assets/js/slider.js"></script>
```

###2. Create HTML element.
Create HTML element, with your slides inside.
```html
<ul class="slider">
  <li><img src="/images/bg1.jpg" /></li>
  <li><img src="/images/bg2.jpg" /></li>
  <li><img src="/images/bg3.jpg" /></li>
</ul>
```
###3. Initialize slider.
```javascript
$(document).ready(function() {
  $('.slider').Slider();
}
```
##Available options
**speed**
Slide transition duration (in ms).
```
default: 400
options: integer
```
**mode**
Slide transition mode.
```
default: 'horizontal'
options: 'horizontal', 'vertical'
```
