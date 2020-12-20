import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

var featureItem = document.querySelectorAll('.feature-item')
var testimonialItem = document.querySelectorAll('.testimonial-item')

alert('Testing')

let mobileMenu = new MobileMenu();
new RevealOnScroll(featureItem, 75);
new RevealOnScroll(testimonialItem, 60);
let stickyHeader = new StickyHeader();
let modal;

document.querySelectorAll('.open-modal').forEach( el => {
    el.addEventListener('click',e => {
        e.preventDefault();
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */ './modules/Modal').then( x => {
                modal = new x.default();
                setTimeout(() => modal.openModal(), 20)
            }).catch(() => console.log("There was an error."))
        } else {
            modal.openModal()
        }
        
    })
});
//Accept hot module replacements so browser is auto updated with changes tp CSS and JS
if(module.hot){
    module.hot.accept();
}

