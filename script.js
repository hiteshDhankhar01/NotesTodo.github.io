const addBtn = document.querySelector("#add_btn")
const main = document.querySelector("#main")
const body = document.getElementsByTagName("body")[0]
const allNotes = []
// const addSomeNotes12 = true

function addSomeNotes() {
    noPage = ` 
    <h1 id="elementToHide" class="addSomeNotes w-75 m-auto text-center bg-success text-white rounded-pill">Please Add Some Notes</h1>
    <img  class="addSomeNotes_img m-auto" src="img/addNotes.png" alt="">
    `
    main.insertAdjacentHTML('afterbegin', noPage)
}

function Remove_addSomeNotes() {
    const addSomeNotes12 = document.querySelector('.addSomeNotes')
    const a = addSomeNotes12.parentNode
    a.removeChild(addSomeNotes12)
    const addSomeNotesImg = document.querySelector('.addSomeNotes_img')
    const b = addSomeNotesImg.parentNode
    b.removeChild(addSomeNotesImg)
}

const add_Note = (text = '') => {
    new_item = `
    <div class="new_add">
        <div class=" card col-lg-3 mx-auto my-2 zxcv">
            <div class="card-img-overlay">
                <div class="head d-flex justify-content-between aling-item-center">
                    <h4 class="card-title ">Notes</h4>
                    <div class="btn">
                        <button onclick="saveNotes()" type="button" class="btn btn-success">save</button>
                        <button onclick="remove_btn()" class="delete_btn"><img class="image" src="img/close_icon.png" alt=""></button>
                    </div>
                </div>
                <textarea style="width:100%; height:90%" name="notes" id="notes_text12">${text}</textarea>
            </div>
        </div>
    </div>`
    main.insertAdjacentHTML('afterbegin', new_item)
}
//--------------------------------------------------------------
const remove_btn = () => {
    const new_add = document.querySelector('.new_add')
    const a = new_add.parentNode
    a.removeChild(new_add)
}


const addNotes = (text) => {

    const keyValue = JSON.parse(localStorage.getItem("saveNotes"));

    if (keyValue === null || keyValue <= 0) {
        Remove_addSomeNotes();
    }

    newitem = `
        <div class="card col-lg-3 mx-auto my-2 zxcv ">
            <div class="card-img-overlay rounded-4">
                <div class="head d-flex justify-content-between aling-item-center">
                    <h4 class="card-title ">Notes+</h4>
                    <div class="btn">
                        <button type="button" class="rounded-pill btn btn-danger deleteBtn">delete</button>
                    </div>
                </div>
                <textarea style="width:100%; height:90%" name="notes" id="notes_text">${text}</textarea>
            </div>
        </div>    
        `
    main.insertAdjacentHTML('afterbegin', newitem)

    const deleteBtn = document.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', e => { deleteNotes(e); })

}

addBtn.addEventListener(
    'click',
    function add() {
        add_Note()
    },
)

function saveNotes() {
    const showData = JSON.parse(localStorage.getItem("saveNotes"));

    const notes = document.querySelector("#notes_text12")
    const saveData = notes.value
    addNotes(saveData)

    const saveNotes = document.querySelectorAll("#notes_text")
    const data = []
    saveNotes.forEach(
        (textarea) => {
            data.push(textarea.value)
        }
    )
    localStorage.setItem('saveNotes', JSON.stringify(data))
    remove_btn()
    // fetchData()
     if (showData == null && showData.length == 0) {
        Remove_addSomeNotes()
    }

}

function deleteNotes(e) {
    let noteCard = e.target.closest(".card");
    noteCard.parentNode.removeChild(noteCard);

    const noteText = noteCard.querySelector("textarea").value;
    const savedNotes = JSON.parse(localStorage.getItem("saveNotes")) || [];
    const updatedNotes = savedNotes.filter(note => note !== noteText);
    localStorage.setItem("saveNotes", JSON.stringify(updatedNotes));

    const keyValue = JSON.parse(localStorage.getItem("saveNotes"));
    if (keyValue === null || keyValue <= 0) {
        addSomeNotes();
    }
}

function fetchData() {
    const showData = JSON.parse(localStorage.getItem("saveNotes"))
    if (showData !== null && showData.length > 0) {
        showData.reverse().forEach(
            (data) => {
                addNotes(data)
            }
        )
    }
    else {
        addSomeNotes()
    }
}
fetchData()
