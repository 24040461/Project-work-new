const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navLinks2 = document.getElementById('other-navs');

hamburger.addEventListener('click', () => {
    navLinks2.classList.toggle('show');
});
//Ref https://www.youtube.com/watch?v=kmTECF0JZyQ&list=PL4cUxeGkcC9itfjle0ji1xOZ2cjRGY_WB&index=3
const fresherList = document.querySelector('#event-list');
const eventForm = document.querySelector('#add-event-form')

// Create element and render cafe
function renderFresherEvent(doc){
    let li = document.createElement('li');
    let title = document.createElement('span');
    let disc = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    disc.textContent = doc.data().disc;
    cross.textContent = 'x';

    li.appendChild(title);
    li.appendChild(disc);
    li.appendChild(cross);

    
    fresherList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (evt) => {
        evt.stopPropagation();
        let id = evt.target.parentElement.getAttribute('data-id');
        db.collection('fresher-events').doc(id).delete();
    })
};

//getting data
db.collection('fresher-events').orderBy('title').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        renderFresherEvent(doc);
    })
});

//Saving data
eventForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    db.collection('fresher-events').add({
        title: eventForm.title.value,
        disc: eventForm.disc.value
    });
    eventForm.title.value= '';
    eventForm.disc.value= '';
});

