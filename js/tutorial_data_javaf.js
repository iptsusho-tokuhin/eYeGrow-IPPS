var Element = new Array();
Element[0] = document.getElementById("date1");
Element[1] = document.getElementById("date2");
Element[2] = document.getElementById("type");
Element[3] = document.getElementById("Update");
Element[4] = document.getElementById("Download");
Element[5] = document.getElementById("chart");
Element[6] = document.getElementById("table_window");

var Z = [1,2,7,4,5,6,2];

var Blind_Black = document.getElementById("blind_black");
var Blind_Clea = document.getElementById("blind_clea");

function Tutorial_Next()
{
	var flag = Number(document.getElementById("tutorial_flag").value);

	Tutorial_Initial();
	Tutorial_Text(flag);

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
	Text[1] = "Start dateはグラフの描画開始日です。お望みの日付に変更できます";
	Text[2] = "End dateはグラフの最終日です。お望みの日付に変更できます";
	Text[3] = "Graph typeでどのデータをグラフ化するか選択できます";
	Text[4] = "Update ボタンで変更した日付をグラフに反映できます";
	Text[5] = "Downroad ボタンよりデータをダウンロードできます。ここのデータもダウンロードできるのでお試しください";
	Text[6] = "データをグラフにしたものです。グラフの各点をクリックすると日付やデータを確認できます";
	Text[7] = "データを表にまとめたものです。表の上が新しい日付のデータです";
	Text[8] = "簡単ですがこのページのご説明は以上です。ありがとうございました";
	Text[9] = "このページはデータをグラフ化したページです。私をクリックするとページのご説明をいたします";

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
