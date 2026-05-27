if(localStorage.getItem('numeroTarefa') == null){
    localStorage.setItem('numeroTarefa', 0)
}

fetch("https://raw.githubusercontent.com/Gabrielsuz/Gerenciador-de-Tarefas/main/version.json")
.then(res => res.json())
.then(data => {

    $("#versao").text(
        "Versão: " + data.version
    );

});

$("#versao").text("Versão: " + data.version);

if(data.version != versaoAtual){
    $("#update").show();
}

$(function() {
    $("#confirmar").click(function () { 
        let texto = $("#texto").val();
        let titulo = $("#titulo").val();
        let tempo = parseInt($("#temp").val() * 1000);
        let getNum = parseInt(localStorage.getItem('numeroTarefa'))
        getNum = getNum + 1

        localStorage.setItem('numeroTarefa',getNum)

        if (texto == "") {
            alert("Insira uma descrição para a tarefa.")
        } else {
            if (titulo == "") {
                $("#lista").append('<div id="aguardando" data-id="'+ getNum +'" class="tarefa" ><div class="info"><button id="close">X</button> <button id="change"><i class="fa-solid fa-chart-simple"></i> </button> <span id="status">Em Andamento</span></div>  <h1>TAREFA #0'+getNum+'</h1><p>'+texto+'</p> </div>');
            } else {
                $("#lista").append('<div id="aguardando" data-id="'+ getNum +'" class="tarefa"><div class="info"><button id="close">X</button> <button id="change"><i class="fa-solid fa-chart-simple"></i> </button> <span id="status">Em Andamento</span></div>  <h1>'+titulo+'</h1><p>'+texto+'</p> </div>');
            }
        }
        
        if (tempo != null && tempo > 0 && typeof tempo === "number") {
            setTimeout(() => {
                let tarefa = $('.tarefa[data-id="' + getNum + '"]');
                console.log("Excluido")
                tarefa.remove();
            }, tempo);
        console.log(tempo)
        } else {
            if (tempo == 0) {
                return
            } else {
                alert("O tempo: "+ $("#temp").val() +" é invalido.")
            }
        }
        
    });

    $("#limpar").click(function () { 
        localStorage.setItem('numeroTarefa', 0)
        $("#lista").empty()
    });

    $("#lista").on("click", "#close", function () {
        let obj = $(this).parent().parent()
        var pergunta = confirm  ("Você tem certeza que quer apagar essa tarefa?")
        
        if (pergunta === true) {
            obj.remove();
        }
    });

    $("#lista").on("click", "#change", function () {
        let obj = $(this).parent().parent()
        
        if ($(obj).attr("id") == "pronto") {
            obj.attr("id","aguardando")
            $(this).parent().find("#status").text("Em Andamento");
            
        } else {
            obj.attr("id","pronto")
            $(this).parent().find("#status").text("Concluída");
        }
    });

});