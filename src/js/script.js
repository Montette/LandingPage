(function () {
    const navigation = document.querySelector('.nav');
    const menuButton = document.querySelector('.burger');
    const navigationMenu = document.querySelector('.nav__menu');
    const links = [...document.querySelectorAll('a')];
    const menuHeigh = document.querySelector('.nav').getBoundingClientRect().height;


    function isInViewport(element) {
        const scroll = window.scrollY || window.pageYOffset
        const boundsTop = element.getBoundingClientRect().top + scroll
        console.log(scroll);
        console.log(boundsTop);
        const viewport = {
            top: scroll,
            bottom: scroll + window.innerHeight,
        }

        const bounds = {
            top: boundsTop,
            bottom: boundsTop + element.clientHeight,
        }

        return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
            (bounds.top <= viewport.bottom && bounds.top >= viewport.top);

    }

    const colorizeNav = () => {
        window.scrollY >= 300 ? navigation.classList.add('colorNav') : navigation.classList.remove('colorNav');
    }

    const animateonScroll = () => {
        const el = document.querySelectorAll('.animate');
        el.forEach(el=> {
            if (isInViewport(el)) {
                el.classList.add('animateScroll')
            }
    
        })
    }

    window.addEventListener('scroll', () => {
        colorizeNav();
        animateonScroll()
    })


    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        navigationMenu.classList.toggle('visible-menu');

        if (menuButton.classList.contains('open')) {
            menuButton.setAttribute("aria-label", "close menu");
            menuButton.setAttribute("aria-expanded", "true");
            document.querySelectorAll('.nav__link').forEach(link => {
                link.tabIndex = 0;
            })

        } else {
            menuButton.setAttribute("aria-label", "open menu");
            menuButton.setAttribute("aria-expanded", "false");
            document.querySelectorAll('.nav__link').forEach(link => {
                link.tabIndex = -1;
            })
        }

    })

    const scrollToSection = section => {
        const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
        let options = {
            behavior: 'smooth',
            left: 0,
            top: section.offsetTop - menuHeigh
        }
        isSmoothScrollSupported ? window.scrollTo(options) : window.scrollTo(options.left, options.top);
    }

    const getSectionName = (event, linkHref) => {
        event.preventDefault();
        if (event.target.classList.contains('nav__logo-img')) {
            linkHref = "#home";
        }
        let sectionId = linkHref.slice(1, linkHref.length);
        let section = document.getElementById(sectionId);
        scrollToSection(section)
    }


    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (/(\#)([^\s]+)/gi.test(linkHref)) {
            link.addEventListener('click', (event) => getSectionName(event, linkHref))
        }
    })



}())