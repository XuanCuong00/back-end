function onYouTubeIframeAPIReady(){
    player=new YT.Player('ytPlayer',{
        width:'95%',
        videoId:video_id,
        events:{'onStateChange':onYouTubePlayerStateChange}})}
        function YouTubePlaying(){
            played+=0.1;
            roundedPlayed=Math.ceil(played);
            document.getElementById("played").innerHTML=Math.min(roundedPlayed,length);
            if(roundedPlayed==length){
                if(fullyPlayed==false){
                    YouTubePlayed();
                    fullyPlayed=true
                }
            }}

        function YouTubePlayed(){
            $.post("system/modules/youtube/process.php",{data:response});
            document.getElementById(response).style.visibility="visible"
        }

        function onYouTubePlayerReady(a){
            ytplayer=document.getElementById("myytplayer");
            ytplayer.addEventListener("onStateChange","onYouTubePlayerStateChange")
        }
        function onYouTubePlayerStateChange(a){
            if(a.data==YT.PlayerState.PLAYING){
                playing=true;interval=window.setInterval("YouTubePlaying()",100)
            }else{
                if(playing){
                    window.clearInterval(interval)
                }
            playing=false
        }}


            function report_page(a,b,c){
                var e=prompt(report_msg);
                if(e){$.ajax({
                    type:"POST",
                    url:"system/ajax.php",
                    data:{
                        id: 13123123,
                        dataType:'json',
                    },
                        success:function(d){
                            if(d.type==='success'){
                                skipuser(a,'1')
                            }
                                alert(d.message)
                            }
                        }
                    )
                }
            }