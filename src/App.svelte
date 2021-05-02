<script>
    import { position, outputInfo } from "./ShipInfo.js";
    import Footer from "./Footer.svelte";
    import Mtinfo from "./Mtinfo.svelte";
    import Input from "./Input.svelte";
    import Output from "./Output.svelte";
    import Map from "./Map.svelte";
    import Slider from "./Slider.svelte";
    export let ready;
    let mymap;

    const setUpShipsPos = () => {
        outputInfo.increment($position);
        mymap.shipMarker();
    };

    const speedChange = () => {
        outputInfo.increment($position);
    };
    const changeWP = (wp) => {
        outputInfo.inc(wp, $position);
        mymap.newroute();
    };
</script>

<svelte:head>
    <script
        defer
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeP9jyrgywkOEtnblsWTE9wY8ASsn4EKY&callback=initMap&libraries=geometry">
    </script>
</svelte:head>

<main>
    <h1>Calculate Distance To Kilcreadaun</h1>
    <Mtinfo />
    <Input on:submitted={setUpShipsPos} />
</main>
<div id="parent" style="display:flex; height:100%; ">
    <div id="left" class="center">
        <Output />
        <div class="slider"><Slider on:speedChange={speedChange} /></div>
    </div>

    <div class="map">
        {#if ready}
            <Map bind:this={mymap} on:newWP={(e) => changeWP(e.detail)} />
        {/if}
    </div>
</div>

<Footer />

<style>
    main {
        background-color: #c6e2ff;
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #454545;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }

    .center {
        display: flex;
        flex-direction: column;
        flex: 3;
        text-align: left;
        align-content: space-between;
        background-color: #c6e2ff;
    }
    .slider {
        flex-grow: 2;
    }

    .map {
        flex: 5;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
