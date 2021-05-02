import { writable, derived, readable } from 'svelte/store';
import { waypoints, points } from "./WP.js";



let startValue = ({ lat: 53, latmin: 0, long: 10, longmin: 0, speed: 10, delay_hrs: 0, delay_mns: 0 })

export const position = writable(startValue);


function createOutput() {
    const { subscribe, set, update } = writable(getData(startValue));

    return {
        subscribe,
        increment: (pos) => update(now => getData(pos)),
        inc: (wp, pos) => update(now => updateWP(wp, pos))
    };
}

function getData(pos) {
    let op = ({
        fromTime: new Date(),
        nextWP: nextWP(pos.lat / 1 + (pos.latmin / 60), pos.long / 1 + (pos.longmin / 60)),
        distToWP: 10,
        distToKil: 10,
        timeToKil: 10,
        etaKil: 12,
        etaScattery: 12,
    })
    updateOp(pos, op)
    return op
}
export const outputInfo = createOutput();



function updateOp(pos, op) {

    //Get the time the ship was last seen
    var fromTime = new Date()
    fromTime.setMinutes(fromTime.getMinutes() - pos.delay_mns)
    fromTime.setHours(fromTime.getHours() - pos.delay_hrs)
    op.fromTime = fromTime


    op.distToWP = distance(pos.lat / 1 + (pos.latmin / 60),
        -(pos.long / 1 + (pos.longmin / 60)),
        op.nextWP.lat,
        op.nextWP.long);
    op.distToKil = (parseFloat(op.distToWP) + parseFloat(op.nextWP.dist));
    op.timeToKil = (op.distToKil / parseFloat(pos.speed));
    op.etaKil = new Date(op.fromTime.getTime());
    op.etaKil.setHours(op.fromTime.getHours() + op.timeToKil);
    op.etaKil.setMinutes(op.fromTime.getMinutes() + (op.timeToKil % 1 * 60));
    op.etaScattery = new Date(op.etaKil.getTime());
    op.etaScattery.setMinutes(op.etaScattery.getMinutes() + (9 / pos.speed) * 60)
}
// Function to go through waypoints and find the next wapoint for shipPosition

function updateWP(wp, pos) {

    let op = ({
        fromTime: new Date(),
        nextWP: wp.wp, //don't ask me why it has given itself a double wrap!
        distToWP: 10,
        distToKil: 10,
        timeToKil: 10,
        etaKil: 12,
        etaScattery: 12,
    })
    updateOp(pos, op)
    return op
}

function nextWP(lat, long) {
    var nearestDist = 10000000;
    var nearWP = {
        lat: 0,
        long: 0,
        use: "Kilcreadaun",
        name: "Nothing Near",
        dist: 1000000,
    };
    for (var i = 0; i < points.length; i++) {
        var dist = distance(
            lat,
            -long,
            points[i].lat,
            points[i].long
        );
        if (dist < nearestDist) {
            nearestDist = dist;
            nearWP = points[i];
        }
    }
    var wp
    for (var i = 0; i < waypoints.length; i++) {
        if (waypoints[i].name == nearWP.use) {
            wp = waypoints[i]
        }
    }
    return wp;
}



// to get distance in Nautical Miles between two points
//obtained from geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) {
        return 0;
    } else {
        var radlat1 = (Math.PI * lat1) / 180;
        var radlat2 = (Math.PI * lat2) / 180;
        var theta = lon1 - lon2;
        var radtheta = (Math.PI * theta) / 180;
        var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60;
        return dist;
    }
}