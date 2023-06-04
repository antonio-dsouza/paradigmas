const m_server = 'https://c5ac-2804-d51-6060-d900-b52a-30d0-5b5a-ecaa.ngrok-free.app/';

document.addEventListener("DOMContentLoaded", function(e) {
    function calculateTotal() {
        const entradas = document.getElementById("entradas");
    
        console.log(entradas);
    }
    const result = fetch(`${m_server}get-transactions`,{
        method: 'GET'
    })
    console.log(result);
    calculateTotal();
});