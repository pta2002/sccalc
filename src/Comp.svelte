<h5 class="card-title">Complemento para {comp} com <input type="number" min="2" max="36" step="1" bind:value={repr.bits}> bits</h5>

{#if Math.floor(number) !== number}
    <p class="text-danger">Complemento para {comp} só funciona com números inteiros</p>
{:else}
    {#if comp1.length > repr.bits}
        <p class="text-danger">Overflow: Input tem {comp1.length} bits</p>
    {:else}
        <div><strong>Valor original em binário: </strong> <pre>{ binOrig }</pre></div>
        {#if comp == 1}
            <div><strong>Complemento para 1 em binário: </strong> <pre>{ comp1 }</pre></div>
            <div><strong>Representação em complemento para 1: </strong> <pre>{#if number < 0} { comp1 } {:else} {binOrig} {/if}</pre></div>
        {:else}
            <div>
                <strong>Complemento para 2 em binário: </strong>
                {#if number != 0}
                    <pre>{ comp2 }</pre>
                {:else}
                    <p class="text-danger">0 não tem complemento para 2</p>
                {/if}
                <div><strong>Representação em complemento para 2: </strong> <pre>{#if number < 0} { comp2 } {:else} {binOrig} {/if}</pre></div>
            </div>
        {/if}
        <div><strong>Valor real (assumindo que o input é representado em complemento para {comp}): </strong> <pre>{ real }</pre></div>
    {/if}
{/if}

<script>
    import {showNum, readNum} from './helper';
    export let repr, comp, number;

    let binOrig;
    let comp1;
    let comp2;
    let real;

    $: {
        if (number < 0) {
            binOrig = "-" + showNum(-number, 2).padStart(repr.bits, "0");
        } else {
            binOrig = showNum(number, 2).padStart(repr.bits, "0");
        }

        comp1 = flip(binOrig);
        comp2 = showNum(readNum(comp1, 2) + 1, 2).padStart(repr.bits, "0");

        if (comp == 1) {
            if (comp1[0] == "0") {
                real = -readNum(comp1, 2);
            } else {
                real = number;
            }
        } else {
            if (comp2[0] == "0") {
                real = -readNum(comp2, 2);
            } else {
                real = number;
            }
        }
    }

    function flip(s) {
        let r = "";
        for (let char in s) {
            if (s[char] == "0")
                r += "1";
            else if (s[char] == "1")
                r += "0";
        }

        return r;
    }
</script>

<style>
    input {
        width: 4rem;
    }
</style>