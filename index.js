function showData() {
    // Ambil data dari localStorage atau inisialisasikan sebagai array kosong
    var todoList = JSON.parse(localStorage.getItem("todolist")) || [];

    todoList.sort(function(a, b) {
        var dateA = new Date(a.deadline);
        var dateB = new Date(b.deadline);
        return dateA - dateB;
    });
    // Ambil elemen HTML tempat Anda ingin menampilkan data (tabel dengan ID "resultTable")
    var resultTable = document.getElementById("resultTable");

    // Hapus semua baris sebelum menambahkan data baru
    resultTable.innerHTML = "";

    // Tambahkan baris judul
    var headerRow = resultTable.insertRow(0);
    var headers = ["No","Todo", "Deadline", "Checklist","Action"];
    for (var i = 0; i < headers.length; i++) {
        var headerCell = headerRow.insertCell(i);
        headerCell.innerHTML = "<b>" + headers[i] + "</b>";
    }

    // Loop melalui todoList dan tambahkan setiap tugas ke dalam tabel
    for (var i = 0; i < todoList.length; i++) {
        (function(index) {
            var todoItem = todoList[index];
            var newRow = resultTable.insertRow(index + 1);

            var cellNumber = newRow.insertCell(0);
            cellNumber.innerHTML = index + 1;

            newRow.insertCell(1).innerHTML = todoItem.todo;
          var todo=  newRow.insertCell(2).innerHTML = todoItem.deadline;

            var cellCheckbox = newRow.insertCell(3);
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input");
            
            checkbox.checked = todoItem.checklist;
            cellCheckbox.appendChild(checkbox);
  
            // Tambahkan event listener untuk mengubah status checklist saat checkbox diubah
            checkbox.addEventListener("change", function () {
            updateChecklist(index, checkbox.checked);
        });
        var cellDelete = newRow.insertCell(4);
        var btnDelete = document.createElement("button");
        btnDelete.textContent = "Hapus";
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.addEventListener("click", function() {
            removeData(index);
        });
        cellDelete.appendChild(btnDelete);
        })(i);
            }
        }
document.onload =showData();

//add todo list
function AddData(){
    // Ambil data dari localStorage atau inisialisasikan sebagai array kosong
    var todoList = JSON.parse(localStorage.getItem("todolist")) || [];

    var todo = document.getElementById("todo").value;
    var deadline = document.getElementById("deadline").value;
    var checklistElement = document.getElementById("checklist");
 // Set default checklist ke false jika checklist kosong
 var checklist = checklistElement.checked;
 
    // Tambahkan data baru ke dalam array
    todoList.push({
        todo: todo,
        deadline: deadline,
        checklist: checklist,
    });

    // Simpan kembali ke localStorage
    localStorage.setItem("todolist", JSON.stringify(todoList));

    // Tampilkan data terbaru
    showData();
}


function removeData(index) {
    var todoList = JSON.parse(localStorage.getItem("todolist")) || [];


    // Validasi agar indeks tidak melebihi panjang array
    if (index >= 0 && index < todoList.length) {
        todoList.splice(index, 1);
        localStorage.setItem("todolist", JSON.stringify(todoList));
        showData();
    } else {
        console.error("Invalid index:", index);
    }
}


function updateChecklist(index, newChecklistValue) {
    var todoList = JSON.parse(localStorage.getItem("todolist")) || [];

    // Validasi agar indeks tidak melebihi panjang array
    if (index >= 0 && index < todoList.length) {
        // Update nilai checklist pada objek dengan indeks yang sesuai
        todoList[index].checklist = newChecklistValue;

        // Simpan kembali ke localStorage
        localStorage.setItem("todolist", JSON.stringify(todoList));

        // Tampilkan data terbaru
        showData();
    } else {
        console.error("Invalid index:", index);
    }
}
