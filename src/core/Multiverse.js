<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:image" content="http://agar.io/img/1200x630.png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:type" content="website"/>
    <title>OgarUnlimited.io</title>
    <link id="favicon" rel="icon" type="image/png" href="favicon-32x32.png"/>
    <link href='https://fonts.googleapis.com/css?family=Ubuntu:700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="Vector2.js"></script>
    <script src="main_out.js?542"></script>
    <script>
    	$(document).ready(function(){
    function getConnection(){
    var connectionfail = false;
        var request = prompt("Enter server address:port (if ws doesnt work, use wss)", "ws://127.0.0.1:443");
        if(request != null){

  connect(request); 
}
}
    getConnection();
});

    	
    </script>
    <style>body {
        padding: 0;
        margin: 0;
        overflow: hidden;
    }

    #canvas {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .checkbox label {
        margin-right: 10px;
    }

    form {
        margin-bottom: 0px;
    }

    .btn-play, .btn-settings, .btn-spectate {
        display: block;
        height: 35px;
    }

    .btn-play {
        width: 85%;
        float: left;
    }

    .btn-settings {
        width: 13%;
        float: right;
    }

    .btn-spectate {
        display: block;
        float: right;
    }

    #adsBottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #adsBottomInner {
        margin: 0px auto;
        width: 728px;
        height: 90px;
        border: 5px solid white;
        border-radius: 5px 5px 0px 0px;
        background-color: #FFFFFF;
        box-sizing: content-box;
    }

    .region-message {
        display: none;
        margin-bottom: 12px;
        margin-left: 6px;
        margin-right: 6px;
        text-align: center;
    }

    #nick, #locationKnown #region {
        width: 65%;
        float: left;
    }

    #locationUnknown #region {
        margin-bottom: 15px;
    }

    #gamemode, #spectateBtn {
        width: 33%;
        float: right;
    }

    #helloDialog {
        width: 350px;
        background-color: #FFFFFF;
        margin: 10px auto;
        border-radius: 15px;
        padding: 5px 15px 5px 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    #chat_textbox {
        -webkit-transition: all .5s ease-in-out;
        -moz-transition: all .5s ease-in-out;
        -o-transition: all .5s ease-in-out;
        transition: all .5s ease-in-out;
        position: absolute;
        z-index: 1;
        bottom: 10px;
        background: rgba(0, 0, 0, .2);
        border: 0px;
        outline: none;
        color: #FFF;
        height: 30px;
        text-indent: 12px;
        left: 10px;
        width: 300px;
    }

    #chat_textbox:focus {
        background: rgba(0, 0, 0, .5);
    }

    #a300x250 {
        width: 300px;
        height: 250px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
    }</style>
</head>
<body>
<div id="fb-root"></div>
<div id="overlays"
     style="display:none; position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 200;">
    <div id="helloDialog">
        <form role="form">
            <div class="form-group">
                <div style="float: left; margin-left: 20px;"><h2>OgarUnlimited.io</h2></div>
                <div class="fb-like" style="float: right; margin-top: 30px;"
                     data-href="https://www.facebook.com/playagar.io" data-layout="button" data-action="like"
                     data-show-faces="true" data-share="true"></div>
                <br clear="both"/>
                <div style="margin-left: 55px">
                <a href="https://github.com/AJS-development/Ogar-unlimited">Ogar Unlimited - Github</a>
                </div>
            </div>
            <div class="form-group">
                <input id="nick" class="form-control" placeholder="Nick" maxlength="15"/>
                <select id="gamemode" class="form-control" onchange="setGameMode($(this).val());">
                    <option selected value="">FFA</option>
                    <option value=":teams">Teams</option>
                    <option value=":experimental">Experimental</option>
                </select>
                <br clear="both"/>
            </div>
            <div id="locationUnknown" style="display:none;">
                <select id="region" class="form-control" onchange="setRegion($('#region').val());">
                    <option selected disabled value=""> -- Select a Region --</option>
                    <option value="US-Fremont">US West</option>
                    <option value="US-Atlanta">US East</option>
                    <option value="BR-Brazil">South America</option>
                    <option value="EU-London">Europe</option>
                    <option value="RU-Russia">Russia</option>
                    <option value="TK-Turkey">Turkey</option>
                    <option value="JP-Tokyo">East Asia</option>
                    <option value="CN-China">China</option>
                    <option value="SG-Singapore">Oceania</option>
                </select>
            </div>
            <div>
                <div class="text-muted region-message CN-China">

                </div>
            </div>
            <div class="form-group">
                <div>

                    <p></p>
                </div>

                <button type="submit" id="playBtn"
                        onclick="setNick(document.getElementById('nick').value); return false;"
                        class="btn btn-play btn-primary btn-needs-server">Play
                </button>
                <button onclick="$('#settings, #instructions').toggle();return false;"
                        class="btn btn-info btn-settings"><i class="glyphicon glyphicon-cog"></i></button>
                <br clear="both"/>
            </div>
            <div id="cantc" style="display:none;">
<h4>Cannot connect to server, click the reconnect button below to try again</h4>
<br/>
</div>
            <div id="settings" class="checkbox" style="display:none;">
                <div class="form-group" id="mainform">
                    <div id="locationKnown"></div>
                    <button id="spectateBtn" onclick="spectate(); return false;" disabled
                            class="btn btn-warning btn-spectate btn-needs-server">Spectate
                    </button>
                    <br clear="both"/>
                </div>
                <div style="margin: 6px;">
                    <label><input type="checkbox" onchange="setSkins(!$(this).is(':checked'));"> No skins</label>
                    <label><input type="checkbox" onchange="setNames(!$(this).is(':checked'));"> No names</label>
                    <label><input type="checkbox" onchange="setDarkTheme($(this).is(':checked'));"> Dark Theme</label>
                    <label><input type="checkbox" onchange="setColors($(this).is(':checked'));"> No colors</label>
                    <label><input type="checkbox" onchange="setShowMass($(this).is(':checked'));"> Show mass</label>
                    <label><input type="checkbox" onchange="setHideChat($(this).is(':checked'));"> Hide chat</label>
                    <label><input type="checkbox" onchange="setSmooth($(this).is(':checked'));"> Smooth Render</label>
                    <label><input type="checkbox" onchange="setAcid($(this).is(':checked'));"> Acid mode</label>
                    <label><input type="checkbox" onchange="setHideGrid($(this).is(':checked'));">Hide Grid</label>
                    <label><button onclick="getConnection()">Reconnect</button></label>
                </div>
            </div>
        </form>
        <div id="instructions">
            <hr/>
        </div>
        <hr/>
        <center>

            <center>
    <span class="text-muted">
       </span>
            </center>
            <div>
            </div>
            <small class="text-muted text-center"></small>
        </center>
        <hr style="margin-bottom: 7px; "/>
        <div style="margin-bottom: 5px; line-height: 32px; margin-left: 6px; height: 32px;">
            <center>
              
            </center>
        </div>

    </div>
</div>
<div id="connecting"
     style="display:none;position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 100; background-color: rgba(0,0,0,0.5);">
    <div style="width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;">
        <h2>Connecting</h2>

        <p> If you cannot connect to the servers, check if you have some anti virus or firewall blocking the connection.
    </div>
</div>
<canvas id="canvas" width="800" height="600"></canvas>
<input type="text" id="chat_textbox" maxlength="200" placeholder="Press Enter to chat!"/>

<div style="font-family:'Ubuntu'">&nbsp;</div>


</body>

<script type="text/javascript">
    $('input').keypress(function(e) {
        if (e.which == '13') {
            e.preventDefault();
            if (!isSpectating) setNick(document.getElementById('nick').value);
        }
    });
</script>


</html>

