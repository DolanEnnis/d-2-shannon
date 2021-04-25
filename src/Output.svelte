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
                <td>{$outputInfo.nextWP.name}</td>
            </tr>
            <tr>
                <td>Distance to WP</td>
                <td>{$outputInfo.distToWP.toFixed(2)}'</td>
            </tr>
            <tr>
                <td>Distance to Kilcreadan</td>
                <td>{$outputInfo.distToKil.toFixed(2)}'</td>
            </tr>
            <!--             <tr>
                <td>&nbsp;</td>
            </tr> -->
            <tr>
                <td>Time to Kilcreadan</td>
                <td> <span>{$outputInfo.timeToKil.toFixed(2)}</span> hrs</td>
            </tr>
            <tr>
                <td>ETA Kilcreadan</td>
                <td>{formatter.format($outputInfo.etaKil)}</td>
            </tr>
            <tr>
                <td>ETA Scattery</td>
                <td>{formatter.format($outputInfo.etaScattery)}</td>
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

    td {
        padding: 10px;
    }
</style>
