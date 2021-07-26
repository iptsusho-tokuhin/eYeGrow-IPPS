var Element = new Array();
Element[0] = document.getElementById("name");
Element[1] = document.getElementById("select1");
Element[2] = document.getElementById("select2");
Element[3] = document.getElementById("save");

var ipkun = document.getElementById("ipkun");

var Z = [1,2,7,4,5,6,2];

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
	case 5:
		break;
	case 6:
	    	Tutorial_End();
		break;
	default://1～4
		Tutorial_Effect(flag-1);
	}

	var num = flag + 1;
	if(flag == 6){num = 0;}
	
	document.getElementById("tutorial_flag").value = num;
}

function Tutorial_Text(num)
{
	var Text = new Array();
	Text[0] = "それではこのページの詳細についてご説明いたします。説明中の箇所を明るくしますのでご覧ください";
	Text[1] = "Sensor NameでeYeGrowに個別の名前を付けることができます。今は名前を「eYeGrow Demo」としています";
	Text[2] = "Unitsでは単位系を変更できます。メートル法とヤード。ポンド法が選択できます";
	Text[3] = "Time Zoneではタイムゾーンを選択できます。今は日本時間に設定しています。";
	Text[4] = "Saveボタンで変更した設定を保存します※このデモページでは動作しません";
	Text[5] = "簡単ですがこのページのご説明は以上です。ありがとうございました";
	Text[6] = "このページはeYeGrowのステータス画面です。私をクリックするとページのご説明をいたします";

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

	Blind_Black.style.background = "rgba(0, 0, 0, 0)";
	Blind_Black.style.zIndex = -100;
	Blind_Clea.style.zIndex = -100;
	document.body.scrollIntoView({behavior:'smooth'});
}
