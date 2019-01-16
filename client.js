var lyric = `[ti:告白百阿]
[ar:]
[al:]
[by:]
[offset:0]
[00:04.98]
[00:5.10]告白百阿
[00:10.10]作词：怎么都队
[00:15.10]作曲：周杰伦
[00:23.83]西子湖畔 星爸爸咖啡
[00:26.31]我手一杯 品尝你的美
[00:29.32]不打哈欠的嘴
[00:32.30]
[00:34.51]国王天使 花名叫错谁
[00:37.02]告白百阿 感染全世界
[00:40.04]微笑在天上飞
[00:42.58]
[00:44.17]国王你愿望难追
[00:46.72]天使我不肯后退
[00:49.46]礼物不需挑最贵
[00:52.06]只要你认真准备
[00:54.74]打造欢乐的氛围
[00:57.42]做任务不顾一切
[01:00.14]拥有你就拥有 全世界
[01:04.47]
[01:05.18]百阿啊 爱上你 从今天起
[01:11.52]甜蜜的很轻易
[01:15.06]
[01:15.91]同学们 别任性 你的眼睛
[01:22.27]在说我爱你
[01:26.11]
[01:49.07]怎么都队 默契的滋味
[01:51.74]气味很对 品尝你的美
[01:54.84]每个人都珍贵
[01:57.47]
[01:59.77]迈克领队 机灵来游说
[02:02.43]佳壹很美 任务主动背
[02:05.40]来鸥带我们飞
[02:08.78]
[02:09.42]辣鱼茅台真的贵
[02:12.03]泽民不知难而退
[02:14.77]力远老婆真是美
[02:17.37]辰逍玄末啥都会
[02:20.03]湘柳首杀很吃亏
[02:22.73]龙哥反串很是媚
[02:25.52]小闻希定格下 全世界
[02:30.56]怎么都队 爱上你 从今天起
[02:36.87]快乐的很轻易
[02:40.16]
[02:41.27]同学们 别离弃 百阿记忆
[02:47.53]有你来参与
[02:51.88]班班啊 因为你 从今天起
[02:58.18]快乐的很轻易
[03:02.53]同学们 别离弃 百阿记忆
[03:08.92]有我来参与
[03:13.20]同学们 别离弃 百阿记忆
[03:20.52]
[03:21.74]我们在一起`;

var lyricWrap = document.querySelector(".qrc_ctn");
var playel = document.querySelector(".play");
var iconel = document.querySelector(".j_play");
var playing = false;
var audio = document.createElement("audio")
var curtime = 0;
var lyricels;

function initlyric() {
    var i = 0;
    var str = lyric.replace(/\[(?:(?:(\d+):([\d\.]+))|([^\]]+))\](.*?)([\n\r]+|$)/g, function ($0, $1, $2, $3, $4) {
        let t = $1 && $1 * 60 + Number($2) + 3.1;
``
        if (
            t &&
            /\S/.test($4)
        ) {
            return '<p  data-index="' + i++ + '" data-time="' + t + '">' + $4 + "</p>";
        } else {
            return "";
        }
    });
    lyricWrap.innerHTML = str;
    lyricels = lyricWrap.children;
}

var offset = 0;
var ismobile = /(Android)(?:\s+|\/)(?:[A-z\-]*)([\d.]+)/.test(window.navigator.userAgent) || /(iPhone\sOS)\s([\d_]+)/.test(window.navigator.userAgent);
var offsetheight = ismobile ? 400 : 0;
function movelyric(time) {
  time = time + offset;
  for (var i = 0, el; (el = lyricels[i]); i++) {
    if (time < el.getAttribute("data-time")) {
      el = lyricels[Math.max(0, i - 1)];
      break;
    }
  }

  if (time > lyricels[lyricels.length - 1].getAttribute("data-time")) {
    el = lyricels[lyricels.length - 1];
  }

  if (el) {
    var removecel = document.querySelector(".on");
    removecel && (removecel.className = "");
    el.className= "on";
    let index = el.getAttribute("data-index");
    let h = el.offsetHeight;
    lyricWrap.style.cssText = `transition: -webkit-transform 0.1s ease-out 0s; transform: translateY(${(index - 2) * -h + offsetheight}px);`;
  }
}

function initplayer() {
    document.body.append(audio);
    audio.src = "./gbqq.mp3";
    audio.addEventListener("ended", onend);

    audio.addEventListener("play", onplay);

    audio.addEventListener("pause", onpause);

    audio.addEventListener("timeupdate", ontimeupdate);
}

function onend() {
    playing = false;
    iconel.className = "icon_play_red j_play";
}

function onplay() {

}

function onpause() {

}

function ontimeupdate() {
    curtime = audio.currentTime;
    movelyric(curtime);
}

function bind() {
    iconel.addEventListener("click", function () {
        if (playing === false) {
            audio.play();
            playing = true;
            iconel.className = "icon_stop_red j_paly";
        } else {
            audio.pause();
            playing = false;
            iconel.className = "icon_play_red j_play";
        }
    })
}

function init() {
    initlyric();
    initplayer();
    bind();
}

init();
