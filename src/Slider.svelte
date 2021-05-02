<script>
    import { createEventDispatcher } from "svelte";
    import { position } from "./ShipInfo.js";

    const dispatch = createEventDispatcher();

    const speedChange = () => {
        dispatch("speedChange");
    };
</script>

<label>
    <input
        on:change={speedChange}
        class="slider"
        type="range"
        bind:value={$position.speed}
        min="0"
        max="20"
        step="0.25"
    />
</label>
<div>Using a speed of: {$position.speed}Kts</div>

<style>
    .slider {
        width: 100%;
        cursor: pointer;
    }
</style>
