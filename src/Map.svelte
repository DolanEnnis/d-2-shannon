<script>
    import { position } from "./ShipInfo.js";
    import { waypoints } from "./WP.js";
    let container;
    let map;
    let zoom = 7;
    let center = { lat: 52.5, lng: -9.71 };

    import { onMount } from "svelte";

    onMount(async () => {
        map = new google.maps.Map(container, {
            zoom,
            center,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
        });
        //Show all WP and create listener
        waypoints.forEach((wp) => setMarker(wp));
    });

    function setMarker(wp) {
        const marker = new google.maps.Marker({
            position: { lat: wp.lat, lng: wp.long },
            map,
            title: "Hello World!",
        });

        marker.addListener("click", () => {
            console.log("WP clicked: " + wp.dist);
        });
    }

    export function setShipPosition(pos) {
        //Show position of ship
        console.log("I am here");
        let shiplat = pos.lat * 1 + pos.latmin / 60;
        let shiplong = pos.long * 1 + pos.longmin / 60;
        console.log(shiplat);
        const marker = new google.maps.Marker({
            position: { lat: shiplat, lng: -shiplong },
            map,
            title: "Ship!",
        });
    }
    export const setshipPosition = setShipPosition($position);
</script>

<div bind:this={container} />

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
