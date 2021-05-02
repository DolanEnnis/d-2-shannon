<script>
    import { createEventDispatcher } from "svelte";
    import { position, outputInfo } from "./ShipInfo.js";
    import { waypoints, guard } from "./WP.js";
    let out;
    let container;
    let map;
    let zoom = 7;
    let center = { lat: 52.5, lng: -9.71 };
    var line = []; //List of lines ship to WP

    import { onMount } from "svelte";

    const dispatch = createEventDispatcher();

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
            title: wp.name,
        });

        marker.addListener("click", () => {
            dispatch("newWP", { wp: wp });
        });
    }

    export const shipMarker = () => {
        //Show position of ship
        let shiplat = $position.lat * 1 + $position.latmin / 60;
        let shiplong = $position.long * 1 + $position.longmin / 60;
        let shipPosition = { lat: shiplat, lng: -shiplong };
        let text =
            $outputInfo.fromTime.toLocaleTimeString() +
            " ETA " +
            $outputInfo.etaKil.toLocaleString();
        const marker = new google.maps.Marker({
            position: shipPosition,
            map,
            title: text,
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
        //Draw Line from Ship to next WP

        //clear old lines
        for (var i = 0; i < line.length; i++) {
            line[i].setVisible(false);
        }
        var legCoordinates = [
            { lat: $outputInfo.nextWP.lat, lng: $outputInfo.nextWP.long },
            shipPosition,
        ];
        var firstLeg = new google.maps.Polyline();
        //firstLeg.setMap(null);
        firstLeg = new google.maps.Polyline({
            path: legCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        line.push(firstLeg);
        firstLeg.setMap(map);
    };

    export const newroute = () => {
        let shiplat = $position.lat * 1 + $position.latmin / 60;
        let shiplong = $position.long * 1 + $position.longmin / 60;
        let shipPosition = { lat: shiplat, lng: -shiplong };
        for (var i = 0; i < line.length; i++) {
            line[i].setVisible(false);
        }
        var legCoordinates = [
            { lat: $outputInfo.nextWP.lat, lng: $outputInfo.nextWP.long },
            shipPosition,
        ];
        var firstLeg = new google.maps.Polyline();
        //firstLeg.setMap(null);
        firstLeg = new google.maps.Polyline({
            path: legCoordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        line.push(firstLeg);
        firstLeg.setMap(map);
    };
</script>

<div bind:this={container} />

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>
