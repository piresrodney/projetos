function scroller() {
    let title = document.getElementById('about-me').getBoundingClientRect()
    sessionStorage.setItem('position-about-me', title.y) 

    title = document.getElementById('project').getBoundingClientRect()
    sessionStorage.setItem('position-project', title.y)   
}

scroller()