<script>
    import { position, outputInfo } from "./ShipInfo.js";
</script>

<div class="container-fluid m-2">
    <h2>Ships Position</h2>
</div>
<!-- lat: 52, latmin: 0, long: 9, longmin: 0, speed: 10  -->
<container class="container">
    <div class="item">
        <label>
            <div>Lat</div>
            <input bind:value={$position.lat} />
        </label>
        <div class="extraText">&deg;</div>
        <label>
            <div>min</div>
            <input bind:value={$position.latmin} />
        </label>
        <div class="extraText">'</div>
    </div>
    <div class="item">
        <label
            ><div>Long</div>
            <input bind:value={$position.long} />
        </label>
        <div class="extraText">&deg;</div>
        <label>
            <div>min</div>
            <input bind:value={$position.longmin} />
        </label>
        <div class="extraText">'</div>
    </div>
    <div class="itemSpeed">
        <label class="speed"
            ><div>Speed</div>
            <input class="speed" bind:value={$position.speed} />
        </label>
        <div class="longText">Kts</div>
    </div>
    <div class="item">
        <label class="speed"
            ><div>Delay</div>
            <input class="speed" bind:value={$position.delay_hrs} />
        </label>
        <div class="longText">Hrs</div>
        <label class="speed"
            ><div>(in min)</div>
            <input class="speed" bind:value={$position.delay_mns} />
        </label>
        <div class="longText">Min</div>
    </div>
    <div class="buttonitem">
        <button class="button" on:click={outputInfo.increment($position)}
            >Submit</button
        >
    </div>
</container>

<style>
    .container {
        display: flex;
        justify-content: center;
    }

    .buttonitem {
        align-self: center;
    }

    .button {
        background-color: #337ab7;
        color: white;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
    }

    .container .item {
        display: flex;
        text-align: left;
        width: 20px;
        flex: 2;
        border: 3px;
    }

    .container input {
        justify-content: right;
        width: 95%;
    }

    .longText {
        align-self: center;
        padding-top: 10px;
    }

    .extraText {
        flex: 1;
        align-self: center;
        text-align: left;
    }
    .container .speed {
        text-align: right;
        flex-basis: 100px;
    }
    .container .itemSpeed {
        display: flex;
        text-align: left;
        width: 20px;
        flex: 1;
        border: 3px;
    }
</style>
