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
    },
    approximatelyEqual: function (num1, num2) {
        return Math.abs(num1 - num2) < 1e-10;
    },
    isSameSign: function (num1, num2) {
        return (Math.abs(num1) === num1 && Math.abs(num2) === num2)
            || (Math.abs(num1) !== num1 && Math.abs(num2) !== num2)
    },
    isSameXCoordinateArea: function (p1, p2) {
        return this.isSameSign(p1.x, p2.x);
    },
    isCollision: function (obj1, obj2) {
        obj1.end = {};
        obj1.end.x = obj1.start.x + obj1.width;
        obj1.end.y = obj1.start.y - obj1.height;
        obj2.end = {};
        obj2.end.x = obj2.start.x + obj2.width;
        obj2.end.y = obj2.start.y - obj2.height;
        let flag = obj2.start.x > obj1.end.x
                || obj2.end.x < obj1.start.x
                || obj2.end.y > obj1.start.y
                || obj2.start.y < obj1.end.y;

        return !flag;
    },
    sparseArray: function (arr, num) {
        const numIdx = []; // 所需数量的索引
        if (num > 1) {
            let group = num - 1;  // 把数组分成除去头尾剩余的num - 1组
            let length = arr.length;
            let groupIdx = parseInt(length / group);
            numIdx.push(0);
            for (let i = 1; i < group; i++) {
                numIdx.push(i * groupIdx)
            }
            numIdx.push(length - 1);
        } 
        return numIdx;
    }
}

export default util;