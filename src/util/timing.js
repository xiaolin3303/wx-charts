export default {
    easeIn: function(pos){
        return Math.pow(pos, 3);
    },

    easeOut: function(pos){
        return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOut: function(pos){
        if ( (pos /= 0.5) < 1 ) {
            return 0.5 * Math.pow(pos, 3);
        } else {     
            return 0.5 * (Math.pow((pos - 2), 3) + 2);
        }
    },

    linear: function(pos) {
        return pos;
    },
}
