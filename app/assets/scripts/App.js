import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';

let mobileMenu = new MobileMenu();


//Accept hot module replacements so browser is auto updated with changes tp CSS and JS
if(module.hot){
    module.hot.accept();
}

