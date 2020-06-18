<h5 class="card-title">Valor em base <input type="number" min="2" max="36" step="1" bind:value={repr.base}></h5>
<!-- TODO spaces between numbers, separators, etc -->
<pre>{ showNum(number, repr.base) }</pre>

<style>
    pre {
        margin-bottom: 0;
    }

    input {
        width: 4rem;
    }
</style>

<script>
    export let repr, number;

    function showNum(num, base) {
        let ret = "";
        let sign = "";
        let afterPoint = "";

        if (num < 0) {
            sign = "-";
            num *= -1;
        }

        // Primeiro a parte depois do ponto
        let int = Math.floor(num);
        let frac = num - int;
        let i = 0; // TODO problemas com floating point, provavelmente tenho de guardar os numeros de outra forma

        while (frac != 0 && i < 16) {
            let x = frac * base;
            let digit = Math.floor(x);

            if (digit < 10) {
                digit = digit.toString();
            } else {
                digit = String.fromCharCode(digit + 55);
            }

            afterPoint += digit;
            frac = x - digit;
            i++;
        }

        if (afterPoint != "")
            afterPoint = "." + afterPoint;
        
        if (int == 0)
            ret = "0";

        while (int != 0) {
            let digit = int % base;

            if (digit < 10) {
                digit = digit.toString();
            } else {
                digit = String.fromCharCode(digit + 55);
            }

            ret = digit + ret;
            int = Math.floor(int / base);
        }

        return sign + ret + afterPoint;
    }
</script>