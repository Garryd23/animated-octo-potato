import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

var featureItem = document.querySelectorAll('.feature-item')
var testimonialItem = document.querySelectorAll('.testimonial-item')

let mobileMenu = new MobileMenu();
new RevealOnScroll(featureItem, 75);
new RevealOnScroll(testimonialItem, 60);


//Accept hot module replacements so browser is auto updated with changes tp CSS and JS
if(module.hot){
    module.hot.accept();
}

