<div class="input-group">
    <input type="text" placeholder="Número" bind:value={numberText} class="form-control col-sm-10">
    <input type="number" placeholder="Base" min="2" step="1" bind:value={base} class="form-control col-sm-2">
</div>

{#if representacoes.length > 0}
    {#each representacoes as repr, i}
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-11">
                        {#if repr.name == "base"}
                            <ValorEmBase bind:repr={repr} number={number}></ValorEmBase>
                        {:else if repr.name == "comp1"}
                            <Comp comp="1" bind:repr={repr} number={number}></Comp>
                        {:else if repr.name == "comp2"}
                            <Comp comp="2" bind:repr={repr} number={number}></Comp>
                        {:else}
                            <h5>Coming soon</h5>
                            <p class="text-muted">Esta representação ainda não foi implementada</p>
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

<div class="input-group">
    <select class="custom-select col-sm-10" bind:value={add}>
        <option selected value="base">Representação em base ...</option>
        <option value="comp1">Complemento para 1</option>
        <option value="comp2">Complemento para 2</option>
        <option value="float">Float IEEE 754</option>
    </select>
    <button class="btn btn-primary col-sm-2 form-control" on:click={addRepr}><i class="fas fa-plus"></i></button>
</div>

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
    import Comp from './Comp.svelte';

    import {readNum} from './helper';

    let numberText = "";
    let base = 10;
    let number;
    let add;

    let representacoes = [
        {name: "base", base: 2},
        {name: "comp1", bits: 8},
        {name: "comp2", bits: 8},
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

    function deleteRepr(i) {
        representacoes.splice(i, 1);
        representacoes = representacoes;
    }

    function addRepr() {
        let repr = {name: add};

        if (add == "base")
            repr.base = 10;
        else if (add == "comp1" || add == "comp2")
            repr.bits = 8;

        representacoes = [ ...representacoes, repr ];
    }
</script>