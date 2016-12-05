import Timing from '../util/timing'

export default function Animation (opts) {
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    opts.timing = opts.timing || 'linear';
    
    let startTimeStamp = null;

    function step (timestamp) {
        if (startTimeStamp === null) {
            startTimeStamp = timestamp;
        } 
        if (timestamp - startTimeStamp < opts.duration) {
            let process = (timestamp - startTimeStamp) / opts.duration;
            let timingFunction = Timing[opts.timing];
            process = timingFunction(process);
            opts.onProcess && opts.onProcess(process);
            requestAnimationFrame(step);
        } else {
            opts.onProcess && opts.onProcess(1);
            opts.onAnimationFinish && opts.onAnimationFinish();
        }
    }

    requestAnimationFrame(step);
}
