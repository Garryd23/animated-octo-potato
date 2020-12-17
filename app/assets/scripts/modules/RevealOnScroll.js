class RevealOnScroll {

  constructor() {
    this.itemsToReveal = document.querySelectorAll('.feature-item');
    this.hideInitially();
    this.events();
  }

  events() {
    window.addEventListener("scroll", () => {
      this.itemsToReveal.forEach(el => {
        this.checkIfScrolledTo(el);
      })
    })
  }

  hideInitially() {
    this.itemsToReveal.forEach(el =>el.classList.add('reveal-item'));
  }

  checkIfScrolledTo(el) {
    let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;
    console.log(el.getBoundingClientRect().y+" / "+window.innerHeight+"*100 = "+scrollPercent)
    if(scrollPercent > 75 && scrollPercent < 100) {
      el.classList.add('reveal-item--is-visible');
    }
  }

}

export default RevealOnScroll;