const draggable_list = document.getElementById("draggable-list");
const ckeck = document.getElementById("check");

const richestPeople = [
    'Jeff Bezos','Bill Gates','Warren Buffet','Bernard Arnault','Carlos Slim Helu','Amancio Ortega','Larry Ellison',
    'Mark Zuckerberg','Michael bloomberg','Lary Page'
];

const listItems = [];

let dragStartIndex;

createList();

function createList(){
    [...richestPeople]
    .map(a => ({value: a, sort: Math.random() }))
    .sort((a,b)=> a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) =>{
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index',index);
        listItem.innerHTML = `<span class="number">${index+1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>`;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
    });

    addEventListeners(); 
}

function dragStart(){
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);
} 

function dragEnter(){ 
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragOver(e){ 
    // console.log('Event: ', 'dragleave');
    e.preventDefault(); 
}

function dragLeave(){ 
    // console.log('Event: ', 'dragover');
    this.classList.remove('over');
}

function dragDrop(){ 
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex); 

    this.classList.remove('over');

}

function swapItems(fromIndex, toIndex){ 
    const itemone = listItems[fromIndex].querySelector('.draggable');
    const itemtwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemtwo); 
    listItems[toIndex].appendChild(itemone); 

}

function checkOrder(){ 
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable')
        .innerText.trim();
        
        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong'); 
        } else{ 
            listItem.classList.remove('wrong'); 
            listItem.classList.add('right');
        }
        
    
    }); 

}

function addEventListeners(){ 
    const draggables = document.querySelectorAll('.draggable'); 
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItems.forEach(item => { 
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder); 