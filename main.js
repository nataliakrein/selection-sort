<script type="text/javascript">
    let vetor = [];
    waitTime = 10;
    //Cria o grid
    function CriarGrid() {
        tamanhoDoVetor = 50;
        //Vetor com números aleatórios
        for (let i = 0; i < tamanhoDoVetor; i++) {
            vetor.push(getRandom(1, tamanhoDoVetor));
        }
        //Cria a div com as colunas
        var grid = document.getElementById("grid");
        for (let i = 0; i < vetor.length; i++) {
            var divColuna = document.createElement("div");
            divColuna.className = "col";
            divColuna.id = i;
            divColuna.appendChild(createColumn(vetor[i], i));
            grid.appendChild(divColuna);
        }
    }

    //ordenar vetor
    function order() {
        document.getElementById("btn").disabled = true;
        selectionSort();
    }

    /* Usa o conceito de "promessa", uma Promise é tipo uma chamada de uma API, você envia uma informação e seu código é forçado a esperar até essa informação 
    retornar para continuar.
    O detalhe é que o setTimeout devolve o 'resolve' como resposta depois depois do delay.
    O setTimeout é uma função que O QUE ESTÁ DENTRO DELA, é executado depois de um tempo.
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
    A função de sleep só vai funcionar em funções assíncronas(que usam o termo async) funções async são realizadas em um fluxo diferente do resto do código, 
    em outra thread do processadores digamos assim. */
    
    async function selectionSort() {
        for (let currentIndex = 0; currentIndex < vetor.length; currentIndex++) {
            //Aqui, por exemplo, vai parar o código nessa parte e esperar pelo valor
            //que estão no waitTime, o padrão é 10, então é 10 ms (0.01 s) 
            await sleep(waitTime);
            // Finding the smallest number in the subarray
            let lowestValueIndex = currentIndex;
            addClass(document.getElementById(lowestValueIndex), "blue");
            for (let j = currentIndex + 1; j < vetor.length; j++) {
                addClass(document.getElementById(j), "green");
                await sleep(waitTime);
                if (vetor[j] < vetor[lowestValueIndex]) {
                    removeClass(document.getElementById(j), "green");
                    removeClass(document.getElementById(lowestValueIndex), "red");
                    addClass(document.getElementById(j), "red");
                    lowestValueIndex = j;
                } else {
                    removeClass(document.getElementById(j), "green");
                }

            }
            removeClass(document.getElementById(lowestValueIndex), "red");
            removeClass(document.getElementById(currentIndex), "blue");
            if (currentIndex !== lowestValueIndex) {
                //Troca as colunas, é uma mudança visual, que não muda o valor dentro do vetor)
                changeColumn(currentIndex, lowestValueIndex);
                //Aqui sim, aqui troca os elementos do vetor
                let valorTroca = vetor[currentIndex];
                vetor[currentIndex] = vetor[lowestValueIndex];
                vetor[lowestValueIndex] = valorTroca;
            }
        }
        document.getElementById("btn").disabled = false;
    }

    //adicionar classe de estilo
    function addClass(element, nameClass) {
        element.classList.add(nameClass);
    }
    //remover uma classe de estilo
    function removeClass(element, nameClass) {
        element.classList.remove(nameClass)
    }

    /* Muda o valor mostrado pelo tooltip da coluna(não muda o index, só muda os quadradinhos pretos que significam o valor) */
    function changeColumn(index1, index2) {
        var grid = document.getElementById("grid");
        let column1 = document.getElementById(index1);
        let column2 = document.getElementById(index2);
        //remove os quadradinhos da coluna, dai só recriar denovo
        column1.removeChild(column1.firstElementChild);
        column2.removeChild(column2.firstElementChild);
        //recria a coluna com mesmo index, mas valor diferente
        column1.appendChild(createColumn(vetor[index2], index1));
        column2.appendChild(createColumn(vetor[index1], index2));
        //Apenas coloca no console o que foi trocado(Usar Ctrl+Shit+i e ir na aba 'Console')
        let changed = "changed Index " + index1 + "(value " + vetor[index1] + ")";
        let target = "Index " + index2 + "(value " + vetor[index2] + ")";
        console.log(changed + " with " + target);
    }

    //Cria uma coluna no grid, também coloca o index nela
    function createColumn(value, index) {
        var divColumnHolder = document.createElement("div");
        divColumnHolder.id = "holder";
        //Criar os quadradinhos pintados de preto significando o valor que está dentro do index
        for (let j = 0; j < vetor.length; j++) {
            var divValor = document.createElement("div");
            divValor.className = "cel";
            if (j < vetor.length - value) {
                divValor.className += " cel-color-white";
            } else {
                divValor.className += " tooltip";
                var spamValor = document.createElement("spam");
                spamValor.className = "tooltiptext";
                spamValor.textContent = value;
                divValor.appendChild(spamValor);
            }
            divColumnHolder.appendChild(divValor);
        }
        //Parte que cria duas div extras para mostrar o Index da coluna
        var ExtraDiv1 = document.createElement("div");
        var ExtraDiv2 = document.createElement("div");
        ExtraDiv1.textContent = " | ";
        ExtraDiv2.textContent = index;
        addClass(ExtraDiv1, "extraDiv");
        addClass(ExtraDiv2, "extraDiv");
        divColumnHolder.appendChild(ExtraDiv1);
        divColumnHolder.appendChild(ExtraDiv2);
        //
        return divColumnHolder;
    }

    //Escreve a velocidade dos passos(selecionado pelo input de range)
    function rangeSlide(value) {
        //Como no input de range o valor pode ser 0, um operador ternário substitui o 0 por 1 
        let val = (value > 0 ? value : 1);
        //waitTime deve ser em milisegundos
        waitTime = val;
        // val/1000 para mostrar o valor em segundos no html
        document.getElementById('rangeValue').textContent = "Velocidade dos passos: " + val / 1000 + " s";
    }

    //Gera um número aleatório
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
