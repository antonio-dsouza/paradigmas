const m_server = 'http://localhost:3000/';

document.addEventListener("DOMContentLoaded", function(e) {
    getTransactions();
        
    $(document).on("click","#popup",function() {
        $("#popup").hide();
    });
});

async function calculateTotal() {
    let entradas = 0;
    let saidas = 0;
    $(".table-line").each(function(index, element) {
        console.log(element);
        if ($(element).data("type") == "Entrada") {
            entradas += Number($(element).find('p:nth-child(2)').text());
        }
        if ($(element).data("type") == "Saída") {
            saidas += Number($(element).find('p:nth-child(2)').text());
        }

        $("#saidas").text(`R$ ${saidas}`);
        $("#entradas").text(`R$ ${entradas}`);
        $("#total").text(`R$ ${entradas - saidas}`);
    });
}

async function getTransactions() {
    await fetch(`${m_server}get-transactions`,{
        method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
        response.forEach(transaction => {
            if (transaction.date.length <= 10) {
                var dateObject = new Date(transaction.date + ' 00:00:01');
            } else {
                var dateObject = new Date(transaction.date);
            }
            $(".table-body").append(`
            <div class="table-line" data-type="${transaction.action}" id="${transaction.id}">
                <p>${transaction.description}</p>
                <p>${transaction.value}</p>
                <p>${transaction.category}</p>
                <p>${transaction.action}</p>
                <p>${dateObject.toLocaleDateString()}</p>
                <p>
                <a onclick="deleteTransaction(${transaction.id})"><svg class="svg-icon" viewBox="0 0 20 20" style="width: 1.5rem;height: 1.5rem;">
                <path fill="#fff" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
                <path fill="#fff" d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
                <path fill="#fff" d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
            </svg></a>
                </p>
            </div>`);
        });;
        calculateTotal();
    });
}

async function deleteTransaction(id) {
    await fetch(`${m_server}delete-transaction`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": id})
    }).then(() => alert("Deletado com sucesso!"));
    $(`#${id}`).remove();
    calculateTotal();
}

async function createTransaction() {
    const params = {
        description: $("#description").val(),
        value: $("#value").val(),
        category: $("#category").val(),
        date: $("#date").val(),
        action: $("#action").val(),
    }

    await fetch(`${m_server}create-transaction`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(() => console.log("Criado com sucesso!"));
    var dateObject = new Date(params.date);
    $(".table-body").append(`
        <div class="table-line" data-type="${params.action}" id="${params.id}">
            <p>${params.description}</p>
            <p>${params.value}</p>
            <p>${params.category}</p>
            <p>${params.action}</p>
            <p>${dateObject.toLocaleDateString()}</p>
            <p>
            <a onclick="deleteTransaction(${params.id})"><svg class="svg-icon" viewBox="0 0 20 20" style="width: 1.5rem;height: 1.5rem;">
            <path fill="#fff" d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"></path>
            <path fill="#fff" d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"></path>
            <path fill="#fff" d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"></path>
        </svg></a>
            </p>
        </div>`);
    calculateTotal();
}

function showForm() {
    $(".popup-box").css("display", "flex");
}
