import Timing from '../util/timing'

export default function Animation (opts) {
    this.isStop = false;
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    opts.timing = opts.timing || 'linear';
    
    let delay = 17;

    let createAnimationFrame = function () {
        if (typeof requestAnimationFrame !== 'undefined') {
            return requestAnimationFrame;
        } else if (typeof setTimeout !== 'undefined') {
            return function (step, delay) {
                setTimeout(function () {
                    let timeStamp = +new Date();
                    step(timeStamp);
                }, delay);
            }
        } else {
            return function (step) {
                step(null);
            }
        }
    }
    let animationFrame = createAnimationFrame();
    let startTimeStamp = null;
    let step = function (timestamp) {
        if (timestamp === null || this.isStop === true) {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
            return;
        }
        if (startTimeStamp === null) {
            startTimeStamp = timestamp;
        } 
        if (timestamp - startTimeStamp < opts.duration) {
            let process = (timestamp - startTimeStamp) / opts.duration;
            let timingFunction = Timing[opts.timing];
            process = timingFunction(process);
            opts.onProcess && opts.onProcess(process);
            animationFrame(step, delay);
        } else {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
        }
    };
    step = step.bind(this);

    animationFrame(step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
    this.isStop = true;
}
