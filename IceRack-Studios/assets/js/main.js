/*=============== HOME SPLIT TEXT ===============*/
const {animate, text, stagger } = anime

const {chars: chars1} = text.split('.home__profession-1', {chars: true})
const {chars: chars2} = text.split('.home__profession-2', {chars: true})

animate(chars1, {
    y: [
        {to: ['100%', '0%']},
        {to: '-100%', delay: 4000, ease: 'in(3)'}
    ],
    duration: 900,
    ease:'out(3)',
    delay:stagger(80),
    loop:true,
})

animate(chars2, {
    y: [
        {to: ['100%', '0%']},
        {to: '-100%', delay: 4000, ease: 'in(3)'}
    ],
    duration: 900,
    ease:'out(3)',
    delay:stagger(80),
    loop:true,
})

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
    loop:true,
    spaceBetween:24,
    slidesPerView:'auto',
    grabCursor:true,
    speed:600,

    pagination:{
        el:'.swiper-pagination',
        clickable:true,
    },

    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    }
})

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')


tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target,
                targetContent = document.querySelector(targetSelector)

        // disble all content and active tabs
        tabContents.forEach ((content) => content.classList.remove('work-active'))
        tabs.forEach((t) => t.classList.remove('work-active'))

        // active the tab and corresponding content
        tab.classList.add('work-active')
        targetContent.classList.add('work-active')
    })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
    //add height to services info
    const heightInfo = document.querySelector('.services__info')
             heightInfo.style.height = heightInfo.scrollHeight + 'px'

    button.addEventListener('click', () => {
        const servicesCards = document.querySelectorAll('.services__card'),
                currentCard = button.parentNode,
                currentInfo = currentCard.querySelector('.services__info'),
                isCardOpen = currentCard.classList.contains('services-open')


        //close all other services info
        servicesCards.forEach(card => {
            card.classList.replace('services-open', 'services-close')

            const info = card.querySelector('.services__info')
                        info.style.height = '0'
        })

        //open only if not already open
        if(!isCardOpen){
            currentCard.classList.replace('services-close', 'services-open')
            currentInfo.style.height = currentInfo.scrollHeight + 'px'
        }

    })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
        copyEmail = document.getElementById('contact-email').textContent


copyBtn.addEventListener('click', () => {
    //use the clipboard api to copy text
    navigator.clipboard.writeText(copyEmail).then(() => {
        copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'


        //restore the original text

        setTimeout(() => {
            copyBtn.innerHTML = 'Copy Email <i class="ri-mail-line"></i>'
        }, 2000)
    })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year'),
        currentYear = new Date().getFullYear()


// each year it is updated to the current year
textYear.textContent = currentYear

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    //get the postion by scrolling down
    const scrollY = window.scrollY

    sections.forEach(section => {
        const id = section.id, //id for each section
                top = section.offsetTop - 50, // distance from the top edge
                height = section.offsetHeight, // element height
                link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

        if(!link) return

        link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // store mouse position

const cursorMove = () => {
    //position the cursor
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = 'translate(-50%, -50%)'

    //update the cursor animation
    requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

cursorMove()

/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hide-cursor')
    })
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hide-cursor')
    })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true, //aniamtions repeat
})

sr.reveal(`.home__image, .projects__container, .work__container, .contact__container`)
sr.reveal(`.home__data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin: 'bottom'})
sr.reveal(`.home__social, .home__cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})