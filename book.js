var Name = document.getElementById("siteName");
var Url = document.getElementById("siteUrl");
var books;
var storedData = localStorage.getItem('books');
if (storedData) {
    books = JSON.parse(storedData);
    display(books);
} else {
    books = [];
}

function addData(event) {
    event.preventDefault();

    var book = {
        Name: Name.value,
        Url: Url.value,
    };

    var isValidName = validateName(book.Name);

    if (!isValidName) {
        document.getElementById("warningName").innerHTML = `<p> Site name must be more than three letters!</p>`;
        document.getElementById("siteName").classList.remove("is-valid");
        document.getElementById("siteName").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("siteName").classList.remove("is-invalid");
        document.getElementById("siteName").classList.add("is-valid");
    }

       var isValidurl = validateurl(book.Url);

    if (!isValidurl) {
        document.getElementById("warningpass").innerHTML = `<p> invalid url!</p>`;
        document.getElementById("siteUrl").classList.remove("is-valid");
        document.getElementById("siteUrl").classList.add("is-invalid");
        return;
    } else {
        document.getElementById("warningpass").innerHTML = "";
        document.getElementById("siteUrl").classList.remove("is-invalid");
        document.getElementById("siteUrl").classList.add("is-valid");
    }



    books.push(book);

    // Save to local storage
    localStorage.setItem('books', JSON.stringify(books));

    // Call the display function after updating the books array
    display(books);
}

function display(books) {
    var tableContent = document.getElementById("tableContent");
    tableContent.innerHTML = ''; // Clear the existing content

    var cartoona = "";

    for (var i = 0; i < books.length; i++) {
        cartoona += `
            <tr>
                <td>${i+1}</td>
                <td>${books[i].Name}</td>
                <td><button class="btn btn-delete pe-2" data-index="${i}" onclick="visitWebsite('${books[i].Url}')">Visit
                    <i class="fa-solid fa-eye pe-1"></i>
                </button></td>
                <td>
                    <button class="btn pe-2" onclick="deleteBook(${i})" data-index="${i}">Delete
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>`;
    }

    cartoona += `</tbody></table>`;

    tableContent.innerHTML = cartoona;
}

// Visit site
function visitWebsite(url) {
    window.open(url, '_blank');
}

// Add a deleteBook function to handle book deletion
function deleteBook(index) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    display(books);
}

function validateurl(url) {
    var regex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
}
function validateName(Name) {
    var regex = /(?:[a-z][- ]?){3}/;

    if (regex.test(Name)) {
        return true;
    } else {
        return false;
    }
}


