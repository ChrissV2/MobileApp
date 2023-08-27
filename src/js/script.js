let deskoptNav
let footerYear
let menuItems
let scrollSpySections
let hamburgerBtn
let mobileNav
let mobileNavItems
let body
let desktopNavItems

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	handleYearInFooter()
}

const prepareDOMElements = () => {
	desktopNavItems = document.querySelectorAll('.nav__items-item')
	deskoptNav = document.querySelector('.nav-desktop')
	footerYear = document.querySelector('.footer__year')
	menuItems = document.querySelectorAll('.nav__items-item')
	scrollSpySections = document.querySelectorAll('.scrollSpy')
	hamburgerBtn = document.querySelector('.hamburger')
	mobileNav = document.querySelector('.nav-mobile')
	mobileNavItems = document.querySelectorAll('.nav-mobile__items-item')
	body = document.querySelector('body')
}

const prepareDOMEvents = () => {
	AOS.init({
		once: true,
	})
	hamburgerBtn.addEventListener('click', openNav)
	hamburgerBtn.addEventListener('click', removeShadowFromNav)
	window.addEventListener('scroll', addShadowToNav)
	window.addEventListener('scroll', handleScrollSpy)
}

const addShadowToNav = () => {
	if (deskoptNav.classList.contains('nav__shadow') && window.scrollY <= 60) {
		deskoptNav.classList.remove('nav__shadow')
	} else if (deskoptNav.classList.contains('nav__shadow') || window.scrollY <= 60) {
		return
	} else {
		deskoptNav.classList.add('nav__shadow')
	}
}

const removeShadowFromNav = () => {
	if (deskoptNav.classList.contains('nav__shadow')) {
		deskoptNav.classList.toggle('nav__shadow')
	} else {
		return
	}
}

const handleYearInFooter = () => {
	const currentYear = new Date().getFullYear()
	footerYear.textContent = currentYear
}

const handleScrollSpy = () => {
	const sections = []

	scrollSpySections.forEach(section => {
		if (window.scrollY <= section.offsetTop + section.offsetHeight - 92) {
			sections.push(section)

			menuItems.forEach(item => item.classList.remove('nav__items-item--active'))

			const activeSection = document.querySelector(`nav.nav-desktop [href*="${sections[0].id}"]`)


			activeSection.classList.add('nav__items-item--active')
		}
	})
}

const openNav = () => {
	mobileNav.classList.toggle('nav-mobile--active')
	mobileNavItems.forEach(element => closeNav(element))
	hamburgerBtn.classList.toggle('is-active')
	body.classList.toggle('overflow-hidden')
}

const closeNav = element => {
	element.addEventListener('click', () => {
		mobileNav.classList.remove('nav-mobile--active')
		hamburgerBtn.classList.remove('is-active')
		body.classList.remove('overflow-hidden')
	})
}

document.addEventListener('DOMContentLoaded', main)
