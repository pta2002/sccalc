<h5 class="card-title">Float IEEE 754</h5>

<div class="row mb-2">
    <div class="input-group col-md-6">
        <div class="input-group-prepend">
            <div class="input-group-text">Bits mantissa</div>
        </div>
        <input type="number" class="form-control" min="1" step="1" bind:value={repr.mbits}>
    </div>
    <div class="input-group col-md-6">
        <div class="input-group-prepend">
            <div class="input-group-text">Bits expoente</div>
        </div>
        <input type="number" class="form-control" min="1" step="1" bind:value={repr.ebits}>
    </div>
</div>

<div>
    <strong>Excesso do expoente: </strong> {excess}
</div>

<div>
    <strong>Bit sinal:</strong> {sign} ({#if sign == 1}-{:else}+{/if})
</div>

<div>
    <strong>Mantissa:</strong> <pre>{mantissa}</pre>
</div>

<div>
    <strong>Expoente:</strong> <pre>{exponent} ({exponent} - {excess} = {exponent - excess})</pre>
</div>

<div>
    <strong>Bits finais:</strong>
    <pre>{sign} {showNum(exponent, 2).padStart(repr.ebits, "0")} {mantissa}</pre>
</div>

<script>
    import {showNum, normalize} from './helper';

    export let repr, number;

    let excess, sign, mantissa, exponent;

    $: excess = Math.pow(2, repr.ebits - 1) - 1
    $: {
        sign = number < 0 ? 1 : 0;
        let bin = showNum(Math.abs(number), 2);
        let normalized = normalize(bin);
        console.log(bin, normalized);
        mantissa = normalized.n.split(".")[1].padEnd(repr.mbits, "0");
        if (normalized.n[0] == "0")
            exponent = 0;
        else
            exponent = normalized.e + excess;
    }
</script>