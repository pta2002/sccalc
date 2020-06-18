<h5 class="card-title">Complemento para {comp} com <input type="number" min="2" max="36" step="1" bind:value={repr.bits}> bits</h5>

{#if Math.floor(number) !== number}
    <p class="text-danger">Complemento para {comp} só funciona com números inteiros</p>
{:else}
    {#if comp1.length > repr.bits}
        <p class="text-danger">Overflow: Input tem {comp1.length} bits</p>
    {:else}
        <div><strong>Valor original em binário: </strong> <pre>{ binOrig }</pre></div>
        <div><strong>Complemento para 1 em binário: </strong> <pre>{ comp1 }</pre></div>
        <div><strong>Valor real (assumindo que o input é representado em complemento para {comp}): </strong> <pre>{ real }</pre></div>
    {/if}
{/if}

<script>
    import {showNum} from './helper';
    export let repr, comp, number;

    let binOrig;
    let comp1;
    let real;

    $: {
        if (number < 0) {
            binOrig = "-" + showNum(-number, 2).padStart(repr.bits, "0");
        } else {
            binOrig = showNum(number, 2).padStart(repr.bits, "0");
        }

        comp1 = flip(binOrig);

        if (comp1[0] == "0") {
            real = -number;
        } else {
            real = number;
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