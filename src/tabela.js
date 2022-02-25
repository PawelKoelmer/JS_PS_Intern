var table = new Array();

showTable();

function showTable(){
    table = JSON.parse(window.sessionStorage.getItem("userTable"))
    console.log(table);
}

