var Element = new Array();
Element[0] = document.getElementById("background-top");
Element[1] = document.getElementById("weight");
Element[2] = document.getElementById("growth");
Element[3] = document.getElementById("reading_count");
Element[4] = document.getElementById("uniformity");
Element[5] = document.getElementById("standard_deviation");
Element[6] = document.getElementById("sensor_status");

var ipkun = document.getElementById("ipkun");
var click = document.getElementById("click");

var Z = [1,2,3,4,5,6,7];

var Blind_Black = document.getElementById("blind_black");
var Blind_Clea = document.getElementById("blind_clea");

function Tutorial_Next()
{
	var flag = Number(document.getElementById("tutorial_flag").value);

	Tutorial_Initial();
	Tutorial_Text(flag);
	ipkun.src = "img/ipkun2.png";
	click.style.visibility ="hidden";

	switch (flag){
  	case 0:
    		break;
	case 8:
		break;
	case 9:
	    	Tutorial_End();
		break;
	default://1～7
		Tutorial_Effect(flag-1);
	}

	var num = flag + 1;
	if(flag == 9){num = 0;}
	
	document.getElementById("tutorial_flag").value = num;
}

function Tutorial_Text(num)
{
	var Text = new Array();
	Text[0] = "それではこのページの詳細についてご説明いたします。説明中の箇所を明るくしますのでご覧ください";
	Text[1] = "メニューバーです Home Status Settingへ移動できます。スマホでご覧の方は三本線タップでメニューが出ます";
	Text[2] = "Weightは前日に撮影したデータをもとに計算した群の平均体重です";
	Text[3] = "Growthは前日に群の体重がどれほど増えたかを表しています";
	Text[4] = "Reading Countは今日有効なデータが撮影された回数を表しています";
	Text[5] = "Uniformityは均一性です。Weightの±5％以内の豚が群の何％を占めているかを表しています";
	Text[6] = "Standard Deviationは標準偏差です。撮影したデータのばらつきを表しています";
	Text[7] = "Sensor Statusは機器の状態を表します。問題なければOK、ネットへの接続不良など問題が起きた際NGとなります";
	Text[8] = "簡単ですがこのページのご説明は以上です。ありがとうございました";
	Text[9] = "アイピー通商のあいぴぃと申します。私をクリックするとページのご説明をいたします";

	document.getElementById("balloon_text").textContent = Text[num];
}

function Tutorial_Effect(num)
{
	Element[num].style.zIndex = 25;
	Element[num].scrollIntoView({behavior:'smooth'});
}

function Tutorial_Initial()
{
	for(var i = 0; i <= Element.length - 1; i++)
	{
		Element[i].style.zIndex = Z[i];
	}

	Blind_Black.style.zIndex = 20;
	Blind_Clea.style.zIndex = 30;
    	Blind_Black.style.background = "rgba(0, 0, 0, 0.50)";
}

function Tutorial_End()
{
 	Tutorial_Initial()

	ipkun.src = "img/ipkun1.png";
	click.style.visibility = "visible";
	Blind_Black.style.background = "rgba(0, 0, 0, 0)";
	Blind_Black.style.zIndex = -100;
	Blind_Clea.style.zIndex = -100;
	document.body.scrollIntoView({behavior:'smooth'});
}
