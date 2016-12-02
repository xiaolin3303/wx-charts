let util = {
    toFixed: function (num, limit) {
        limit = limit || 2;
        if (this.isFloat(num)) {
            num = num.toFixed(limit);
        }
        return num;
    },
    isFloat: function (num) {
        return num % 1 !== 0;
    }    
}

export default util;