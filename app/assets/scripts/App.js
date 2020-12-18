import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

var featureItem = document.querySelectorAll('.feature-item')
var testimonialItem = document.querySelectorAll('.testimonial-item')

let mobileMenu = new MobileMenu();
new RevealOnScroll(featureItem, 75);
new RevealOnScroll(testimonialItem, 60);
let stickyHeader = new StickyHeader();


//Accept hot module replacements so browser is auto updated with changes tp CSS and JS
if(module.hot){
    module.hot.accept();
}

