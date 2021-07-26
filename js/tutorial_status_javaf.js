var Element = new Array();
Element[0] = document.getElementById("restart");
Element[1] = document.getElementById("table1");
Element[2] = document.getElementById("photo");

var ipkun = document.getElementById("ipkun");

var Z = [1,2,3];

var Blind_Black = document.getElementById("blind_black");
var Blind_Clea = document.getElementById("blind_clea");

function Tutorial_Next()
{
	var flag = Number(document.getElementById("tutorial_flag").value);

	Tutorial_Initial();
	Tutorial_Text(flag);
	ipkun.src = "img/ipkun2.png";

	switch (flag){
  	case 0:
    		break;
	case 4:
		break;
	case 5:
	    	Tutorial_End();
		break;
	default://1～3
		Tutorial_Effect(flag-1);
	}

	var num = flag + 1;
	if(flag == 5){num = 0;}
	
	document.getElementById("tutorial_flag").value = num;
}

function Tutorial_Text(num)
{
	var Text = new Array();
	Text[0] = "それではこのページの詳細についてご説明いたします。説明中の箇所を明るくしますのでご覧ください";
	Text[1] = "Restartは再起動ボタンです。eYeGrowのアップデートを反映させる際に再起動を行います";
	Text[2] = "この表でeYeGrowのバージョンやMACアドレス、また接続IPアドレスを確認できます";
	Text[3] = "この写真はつい先ほどeYeGrowが撮影した3D写真です。色の違いが地面からの高さを表しています。";
	Text[4] = "簡単ですがこのページのご説明は以上です。ありがとうございました";
	Text[5] = "このページはeYeGrowのステータス画面です。私をクリックするとページのご説明をいたします";

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
	Blind_Black.style.background = "rgba(0, 0, 0, 0)";
	Blind_Black.style.zIndex = -100;
	Blind_Clea.style.zIndex = -100;
	document.body.scrollIntoView({behavior:'smooth'});
}
