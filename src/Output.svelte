<script>
    import { outputInfo } from "./ShipInfo.js";

    const formatter = new Intl.DateTimeFormat("en", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        weekday: "short",
    });
</script>

<container class="container">
    <table class="table">
        <tbody>
            <tr>
                <td>From</td>
                <td>{formatter.format($outputInfo.fromTime)}</td>
            </tr>
            <tr>
                <td>Next Waypoint</td>
                <td id="WP" />
            </tr>
            <tr>
                <td>Distance to WP</td>
                <td id="WPdist" />
            </tr>
            <tr>
                <td>Distance to Kilcreadan</td>
                <td id="KillDist" />
            </tr>
            <!--             <tr>
                <td>&nbsp;</td>
            </tr> -->
            <tr>
                <td>Time to Kilcreadan</td>
                <td> <span id="KillTime" /> hrs</td>
            </tr>
            <tr>
                <td>ETA Kilcreadan</td>
                <td id="ETAKil" />
            </tr>
            <tr>
                <td>ETA Scattery</td>
                <td id="ETAScattery" />
            </tr>
        </tbody>
    </table>
</container>

<style>
    .container {
        display: flex;
        justify-content: left;
        align-content: flex-start;
    }
</style>
