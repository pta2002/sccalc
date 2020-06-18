export function readNum(num, base) {
    if (base <= 1 || base > 36)
        return "Erro: base inválida";

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

export function showNum(num, base) {
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