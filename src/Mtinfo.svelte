<script>
    import { position } from "./ShipInfo.js";

    let mtText =
        $position.lat +
        " " +
        $position.latmin +
        " " +
        $position.long +
        " " +
        $position.longmin;
    let thenum = [];
    let theBignum = [];
    $: {
        theBignum = mtText.match(/\d+/g);
        if (theBignum) {
            if (theBignum.length == 4) {
                thenum = theBignum;
                $position.speed = 10;
            } else if (theBignum.length > 10) {
                alert(
                    "Too many numbers here for me! Cut everything before Latitude / Longitude: !"
                );
            } else {
                thenum = [
                    theBignum[0],
                    theBignum[1],
                    theBignum[2],
                    theBignum[3],
                ];
                $position.speed = theBignum[4] / 1 + theBignum[5] / 10;
            }
        } else {
            alert("No numbers here for me! ");
        }
        $position.lat = thenum[0];
        $position.latmin = (60 * numToDecimal(thenum[1])).toFixed(2);
        $position.long = thenum[2];
        $position.longmin = (60 * numToDecimal(thenum[3])).toFixed(2);
    }

    function numToDecimal(num) {
        var num_length = num.toString().length;
        var numLog = Math.log(+num) / Math.LN10;
        var decLog = numLog - num_length;
        return Math.pow(10, decLog);
    }

    function handleMouseOver(e) {
        var txt = "";
        theBignum.forEach(arrayIteration);
        mtText = txt;

        function arrayIteration(value, index, array) {
            txt = txt + value + " ";
        }
    }
</script>

<label on:mouseover={handleMouseOver}>
    <input class="mtinfo" bind:value={mtText} />
</label>

<!-- {@debug $position} -->
<style>
    .mtinfo {
        margin-left: auto;
        margin-right: auto;
        max-width: 90%;
        padding: 5px;
        background-color: #ffff99;
        width: 550px;
        color: #cc0000;
    }
</style>
