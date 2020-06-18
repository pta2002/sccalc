<h2>Valor</h2>

<div class="input-group">
    <input type="text" placeholder="Número" bind:value={numberText} class="form-control col-md-10">
    <input type="number" placeholder="Base" min="2" step="1" bind:value={base} class="form-control col-md-2">
</div>

{#if representacoes.length > 0}
    {#each representacoes as repr, i}
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-11">
                        {#if repr.name == "base"}
                            <ValorEmBase bind:repr={repr} number={number}></ValorEmBase>
                        {/if}
                    </div>
                    <div class="col-sm-1">
                        <div on:click={()=>deleteRepr(i)} class="text-danger del"><i class="fas fa-trash"></i></div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
{:else}
    <div class="my-3 font-italic">
        <h5>Não há nenhuma representação!</h5>
        <p class="text-muted">Clica no botão em baixo para adicionar uma</p>
    </div>
{/if}

<button class="btn btn-primary w-100" on:click={addRepr}><i class="fas fa-plus"></i></button>

<style>
    .card {
        margin: 1rem 0;
    }

    .del {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>

<script>
    import ValorEmBase from './ValorEmBase.svelte';

    let numberText = "";
    let base = 10;
    let number;

    let representacoes = [
        {name: "base", base: 2},
        {name: "base", base: 10},
        {name: "base", base: 16},
    ];

    let error = "";

    $: {
        number = readNum(numberText, base);
        if (typeof number == "string") {
            error = number;
            number = 0;
        } else {
            error = "";
        }
    }

    function readNum(num, base) {
        num = num.trim().toLowerCase();
        if (num.length == 0)
            return 0;

        let ret = 0;
        let sign = num[0] == "-" ? -1 : 1;

        if (sign < 0) {
            num = num.substr(1);
        }

        let charsUntilPoint = num.split(".")[0].length;

        let exp = charsUntilPoint - 1;

        for (let i = 0; i < num.length; i++) {
            if (num[i] == '.') continue;

            let digit;
            if ('0' <= num[i] && num[i] <= '9') {
                digit = parseInt(num[i]);
            } else if ('a' <= num[i] && num[i] <= 'z') {
                digit = 10 + num[i].charCodeAt(0) - 97;
            } else {
                return "Erro: Número inválido!";
            }

            if (digit >= base) {
                return "Erro: Não pertence à base!"
            }

            ret += Math.pow(base, exp) * digit;
            exp--;
        }

        return ret * sign;
    }

    function deleteRepr(i) {
        representacoes.splice(i, 1);
        representacoes = representacoes;
    }

    function addRepr() {
        representacoes = [ ...representacoes, {name: "base", base: 10} ];
    }
</script>