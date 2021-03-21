import { writable, derived, readable } from 'svelte/store';



let startValue = ({ lat: 52, latmin: 0, long: 9, longmin: 0, speed: 10, delay_hrs: 0, delay_mns: 0 })

export const position = writable(startValue);
function createOutput() {
    const { subscribe, set, update } = writable(getData(startValue));

    return {
        subscribe,
        increment: (pos) => update(now => getData(pos)),
    };
}

function getData(pos) {
    let op = ({
        fromTime: new Date(),
        nextWP: "Bull",
        distToWP: 10,
        distToKil: 100,
        timeToKil: 10,
        etaKil: 12,
        etaScattery: 12,
    })
    console.log(pos.lat)
    return op
}
export const outputInfo = createOutput();