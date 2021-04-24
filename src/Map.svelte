<script>
    import { position, outputInfo } from "./ShipInfo.js";
    import { waypoints, guard } from "./WP.js";
    let out;
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
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 2,
            },
            map,
            title: "Hello World!",
        });

        marker.addListener("click", () => {
            console.log("WP clicked: " + wp.dist);
        });
    }

    export const shipMarker = () => {
        //Show position of ship
        let shiplat = $position.lat * 1 + $position.latmin / 60;
        let shiplong = $position.long * 1 + $position.longmin / 60;
        let shipPosition = { lat: shiplat, lng: -shiplong };
        //console.log(shiplat);
        const marker = new google.maps.Marker({
            position: shipPosition,
            map,
            title: "Ship!",
        });
        // change zoom level of map
        var KilcreadaunPos = new google.maps.LatLng(
            waypoints[0].lat,
            waypoints[0].long
        );
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(shipPosition);
        bounds.extend(KilcreadaunPos);
        map.fitBounds(bounds);
    };
</script>

<div bind:this={container} />

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
