var data_flag = location.search.substr(-1);
var w;

var All_Data;
var New_Data = new Array();

google.charts.load('current', {'packages':['corechart']});

Set_Data();
Table_Load();
Set_Initial();
Type_Change(data_flag);

window.onresize = function () {
	google.charts.setOnLoadCallback(Draw_Chart);
}

function Type_Change(type)
{
	var text;
	if(data_flag != type)
	{
		data_flag = type;
	}

	switch (data_flag){
  	case "1":
    		text = "Weight";
    		break;
	case "2":
    		text = "Growth";
		break;
	case "3":
    		text = "Reading Count";
		break;
	case "4":
    		text = "Uniformity";
		break;
	case "5":
    		text = "Standard Deviation";
		break;
	default:
		text = "";
	}

	document.getElementById("graph_type").innerHTML = text;
	google.charts.setOnLoadCallback(Draw_Chart);
}

function Set_Initial()
{
	var today;

	var Y = new Date().getFullYear();
	var M = new Date().getMonth();
	var D = new Date().getDate() - 90;

	var yyyy;
	var mm;
	var dd;

	today = new Date();
	today.setDate(today.getDate());
	yyyy = today.getFullYear();
	mm = ("0"+(today.getMonth()+1)).slice(-2);
	dd = ("0"+today.getDate()).slice(-2);
 	document.getElementById("end_date").value = yyyy + "-" + mm + "-" + dd;

	today = new Date(Y,M,D);
	today.setDate(new Date(Y,M,D).getDate());
	yyyy = today.getFullYear();
	mm = ("0"+(today.getMonth()+1)).slice(-2);
	dd = ("0"+today.getDate()).slice(-2);
 	document.getElementById("start_date").value = yyyy + "-" + mm + "-" + dd;
}

function Draw_Chart()
{
	w = document.body.offsetWidth;

	var chart_width = w - 185;
	var data_array = new Array();

	var start_date = new Date(document.getElementById("start_date").value);
	var end_date = new Date(document.getElementById("end_date").value);

	data_array.push([New_Data[0][0], New_Data[0][data_flag]]);

	for(var i = 1; i <= New_Data.length - 1; i++)
	{
		if(start_date <= New_Data[i][0] && New_Data[i][0] <= end_date)
		{
			data_array.push([New_Data[i][0], New_Data[i][data_flag]]);
		}
	}

	var data = google.visualization.arrayToDataTable(data_array);
	var option_v;
	var option_h;
	var title;
	var area;

	switch (data_flag){
  	case "1":
		option_v = {
			title: "Weight",
			textStyle:{fontSize: 12},
			titleTextStyle:{fontSize: 12, fontName: "Arial", italic: false},
			ticks: [20,40,60,80,100,120,140]
		};
    		break;
	case "2":
		option_v = {
			title: "Growth",
			textStyle:{fontSize: 12},
			titleTextStyle:{fontSize: 12, fontName: "Arial", italic: false}
		};
		break;
	case "3":
		option_v = {
			title: "Reading Count",
			textStyle:{fontSize: 12},
			titleTextStyle:{fontSize: 12, fontName: "Arial", italic: false}
		};
		break;
	case "4":
		option_v = {
			title: "Uniformity",
			textStyle:{fontSize: 12},
			titleTextStyle:{fontSize: 12, fontName: "Arial", italic: false}
		};
		break;
	case "5":
		option_v = {
			title: "Standard Deviation",
			textStyle:{fontSize: 12},
			titleTextStyle:{fontSize: 12, fontName: "Arial", italic: false}
		};
		break;
	default:
		text = "";
	}

	option_h = {
		gridlines:{color: '#FFFFFF'},
		textStyle:{fontSize: 12}
	};

	area = {
		left: 100,
		top: 35,
		width: chart_width,
		height: 375
	};


	var options = {
		curveType: 'function',
		pointSize: 8,
		colors: ['#70af4d'],
		legend: { position: 'none'},
		chartArea:area,
        	vAxis: option_v,
		hAxis: option_h,
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart'));
        chart.draw(data, options);
}

function Table_Load()//表にデータを追加
{
	var table = document.getElementById('table1');		//表のオブジェクトを取得
	var row;
	var cell = new Array();
	var text;
	var Y;
	var M;
	var D;

	for(var i = 1; i <= All_Data.length - 1; i++)
	{
		row = table.insertRow(-1);			//行末に行(tr要素)を追加
		for(var j = 0; j <= 5; j++)
		{
			if(j == 0)
			{
				Y = New_Data[i][j].getFullYear();
				M = New_Data[i][j].getMonth();
				D = New_Data[i][j].getDate();
				text = Y +"-"+ M +"-"+ D;
			}
			else
			{
				text = New_Data[i][j];
			}
			cell[j] = row.insertCell(j);	//セル(td要素)の追加
			cell[j].innerHTML = text;	//セルにデータを挿入する
		}
	}
}

function Download_Text()
{
	let text = "";
	var Y;
	var M;
	var D;
	for(var i = 0; i <= New_Data.length - 1; i++)
	{
		for(var j = 0; j <= 5; j++)
		{
			if(j == 0 && i != 0)
			{
				Y = New_Data[i][j].getFullYear();
				M = New_Data[i][j].getMonth() + 1;
				D = New_Data[i][j].getDate();
				text = text + Y +"/"+ M +"/"+ D + ",";
			}
			else if(j != 5)
			{
				text = text + New_Data[i][j] + ",";
			}
			else
			{
				text = text + New_Data[i][j];
			}
			
		}
		text = text + "\n";
	}
	
	const a = document.createElement('a');
	a.href = 'data:text/plain,' + encodeURIComponent(text);
	a.download = 'eYeGrow Demo.csv';

	a.style.display = 'none';
	document.body.appendChild(a); // ※ DOM が構築されてからでないとエラーになる
	a.click();
	document.body.removeChild(a);
}

function Set_Data()
{
All_Data = [
["Date","Weight (KG)","Growth (grams)","Reading Count","Unifomity","Standard Deviation"],
[new Date('2018/8/14'),83.83,1223,293,70,11],
[new Date('2018/8/13'),82.61,1031,446,68.6,10.1],
[new Date('2018/8/12'),81.58,910,369,76.6,9.5],
[new Date('2018/8/11'),80.67,969,321,76.3,10.3],
[new Date('2018/8/10'),79.7,706,219,68.7,10.6],
[new Date('2018/8/9'),78.99,914,201,64.9,11.8],
[new Date('2018/8/8'),78.08,1201,277,78.5,10],
[new Date('2018/8/7'),76.88,718,391,78.1,11.8],
[new Date('2018/8/6'),76.16,768,350,66.9,9.6],
[new Date('2018/8/5'),75.39,1180,292,78.1,11],
[new Date('2018/8/4'),74.21,1173,351,65.2,10.9],
[new Date('2018/8/3'),73.04,1021,439,61.3,10.8],
[new Date('2018/8/2'),72.02,1503,423,70.8,11.4],
[new Date('2018/8/1'),70.52,1159,403,59.9,9.9],
[new Date('2018/7/31'),69.36,1117,427,61.3,9.8],
[new Date('2018/7/30'),68.24,1561,398,74.9,10.7],
[new Date('2018/7/29'),66.68,1636,435,68.5,9.9],
[new Date('2018/7/28'),65.04,940,431,61.7,9.4],
[new Date('2018/7/27'),64.1,1414,249,71.7,9.8],
[new Date('2018/7/26'),62.69,1253,423,73.9,9.4],
[new Date('2018/7/25'),61.44,1047,374,58.1,10.5],
[new Date('2018/7/24'),60.39,1038,309,72.3,10.6],
[new Date('2018/7/23'),59.35,1035,400,62.8,9.9],
[new Date('2018/7/22'),58.32,1052,390,59,10.2],
[new Date('2018/7/21'),57.27,583,323,64.7,10.2],
[new Date('2018/7/20'),56.69,1113,295,55.3,10.4],
[new Date('2018/7/19'),55.58,846,234,67.2,11.1],
[new Date('2018/7/18'),54.73,1187,355,67.9,9.6],
[new Date('2018/7/17'),53.54,1332,340,57.1,9.2],
[new Date('2018/7/16'),52.21,422,66,57.3,12.6],
[new Date('2018/7/15'),51.79,195,57,65.6,11.9],
[new Date('2018/7/14'),51.6,173,56,55.7,13.8],
[new Date('2018/7/13'),51.46,101,48,65,11.6],
[new Date('2018/7/12'),51.5,203,66,64.8,12.6],
[new Date('2018/7/9'),106.44,381,78,91.7,12.6],
[new Date('2018/7/8'),106.06,180,61,83.8,13],
[new Date('2018/7/7'),105.88,186,63,78.5,12.7],
[new Date('2018/7/6'),105.7,93,62,86.6,12.3],
[new Date('2018/7/5'),105.61,508,88,86,13.2],
[new Date('2018/7/4'),105.1,148,85,80.5,12.1],
[new Date('2018/7/3'),104.95,756,68,91.5,12.2],
[new Date('2018/7/2'),104.19,427,49,82.1,12.6],
[new Date('2018/7/1'),103.76,905,80,77.8,11],
[new Date('2018/6/30'),102.86,1074,85,83.5,11.2],
[new Date('2018/6/29'),101.79,484,52,84.5,11.4],
[new Date('2018/6/28'),101.31,1060,55,78.1,10.9],
[new Date('2018/6/27'),100.25,891,60,76.8,12.2],
[new Date('2018/6/26'),99.36,903,69,82,13.5],
[new Date('2018/6/25'),98.46,893,135,76.2,10.2],
[new Date('2018/6/24'),97.57,942,137,79.1,12],
[new Date('2018/6/23'),96.63,964,173,87.2,12.4],
[new Date('2018/6/22'),95.67,737,166,81.6,9.9],
[new Date('2018/6/21'),94.93,1211,232,86.9,11.4],
[new Date('2018/6/20'),93.72,1157,241,73.8,11.6],
[new Date('2018/6/19'),92.56,866,344,83,9.5],
[new Date('2018/6/18'),91.69,1081,389,84.4,10.5],
[new Date('2018/6/17'),90.61,1259,379,81.6,11.7],
[new Date('2018/6/16'),89.35,901,422,80.1,10.8],
[new Date('2018/6/15'),88.45,1241,449,73.9,10.9],
[new Date('2018/6/14'),87.21,1534,311,85.6,11.1],
[new Date('2018/6/13'),85.68,1436,217,70.2,11.9],
[new Date('2018/6/12'),84.25,1370,405,68.4,10.7],
[new Date('2018/6/11'),82.88,1277,414,73.1,10.4],
[new Date('2018/6/10'),81.6,1028,324,85.4,10.1],
[new Date('2018/6/9'),80.57,1342,295,77.3,9.2],
[new Date('2018/6/8'),79.23,892,314,71.8,9.4],
[new Date('2018/6/7'),78.34,1052,445,82.4,9.3],
[new Date('2018/6/6'),77.29,1175,262,73.2,10.5],
[new Date('2018/6/5'),76.11,707,433,83.4,9.4],
[new Date('2018/6/4'),75.4,606,244,71.6,11.9],
[new Date('2018/6/3'),74.79,805,373,69.9,10.9],
[new Date('2018/6/2'),73.99,877,402,76.7,9.6],
[new Date('2018/6/1'),73.11,1077,289,74.1,9.6],
[new Date('2018/5/31'),72.03,954,324,64.4,9.7],
[new Date('2018/5/30'),71.08,1619,277,66.3,10.3],
[new Date('2018/5/29'),69.46,1356,273,77.1,10.2],
[new Date('2018/5/28'),68.1,1469,83,68.8,13.4],
[new Date('2018/5/27'),66.63,1838,61,70.3,11.8],
[new Date('2018/5/26'),64.79,1006,57,71.7,12.8],
[new Date('2018/5/25'),63.78,1318,74,72.3,13.7],
[new Date('2018/5/24'),62.46,1252,66,62.3,12.3],
[new Date('2018/5/23'),61.21,1004,57,77.7,10.8],
[new Date('2018/5/22'),60.21,939,71,66.8,13.3],
[new Date('2018/5/21'),59.27,1179,86,68.7,11.1],
[new Date('2018/5/20'),58.09,724,61,74.6,11.6],
[new Date('2018/5/19'),57.37,434,75,75.5,13.3],
[new Date('2018/5/18'),56.94,858,46,61.5,11.8],
[new Date('2018/5/17'),56.08,906,49,66,11.9],
[new Date('2018/5/16'),55.17,990,74,64.8,11.9],
[new Date('2018/5/15'),54.18,1131,58,64.1,13.3],
[new Date('2018/5/14'),53.05,1213,52,61.1,13.1],
[new Date('2018/5/13'),51.84,584,68,70.3,12.2],
[new Date('2018/5/12'),51.26,489,65,64.3,11.9],
[new Date('2018/5/11'),50.77,173,41,71.4,11.7],
[new Date('2018/5/10'),50.78,101,47,66.8,11.7],
[new Date('2018/5/9'),50.85,203,87,67.8,11.9],
[new Date('2018/5/8'),50.89,154,253,71.8,10.2],
[new Date('2018/5/7'),51,0,312,57.7,9.6],
[new Date('2018/5/1'),106.5,342,255,74.8,9.8],
[new Date('2018/4/30'),106.16,166,296,88.6,9.7],
[new Date('2018/4/29'),105.99,143,257,85.6,10.5],
[new Date('2018/4/28'),105.85,-52,258,77.1,11.1],
[new Date('2018/4/27'),105.9,215,345,76.9,11.8],
[new Date('2018/4/26'),105.69,-153,408,87.4,9.1],
[new Date('2018/4/25'),105.84,41,369,74.7,11],
[new Date('2018/4/24'),105.8,384,446,85.9,9.8],
[new Date('2018/4/23'),105.42,290,304,87.5,9.8],
[new Date('2018/4/22'),105.13,722,249,85,11.3],
[new Date('2018/4/21'),104.41,575,351,86.1,11.5],
[new Date('2018/4/20'),103.84,1442,206,75.6,11.5],
[new Date('2018/4/19'),102.4,1554,411,77.4,9.1],
[new Date('2018/4/18'),100.85,825,319,84.3,11.5],
[new Date('2018/4/17'),100.03,1471,268,70.2,10.3],
[new Date('2018/4/16'),98.56,1135,260,85,11],
[new Date('2018/4/15'),97.43,1298,389,77.7,11.5],
[new Date('2018/4/14'),96.13,1472,251,78.4,11.7],
[new Date('2018/4/13'),94.66,1420,382,71.3,11.8],
[new Date('2018/4/12'),93.24,938,350,79.9,9.3],
[new Date('2018/4/11'),92.3,1121,234,80,11.8],
[new Date('2018/4/10'),91.18,766,332,76.6,9.9],
[new Date('2018/4/9'),90.41,1192,421,73.5,11.3],
[new Date('2018/4/8'),89.22,1000,276,69.4,9.2],
[new Date('2018/4/7'),88.22,771,426,67.3,9.4],
[new Date('2018/4/6'),87.45,721,284,73.3,9.3],
[new Date('2018/4/5'),86.73,1113,259,71.9,9.9],
[new Date('2018/4/4'),85.62,857,370,73.9,11],
[new Date('2018/4/3'),84.76,1243,209,76.1,10.5],
[new Date('2018/4/2'),83.52,1410,319,76.4,9.5],
[new Date('2018/4/1'),82.11,1393,277,65.5,10.7],
[new Date('2018/3/31'),80.72,1511,215,73.4,11.3],
[new Date('2018/3/30'),79.21,1245,236,64.8,10.7],
[new Date('2018/3/29'),77.97,1430,206,74.3,10.5],
[new Date('2018/3/28'),76.54,1476,242,66.4,9.6],
[new Date('2018/3/27'),75.06,1458,284,62.8,10.7],
[new Date('2018/3/26'),73.6,1438,337,72.5,9.9],
[new Date('2018/3/25'),72.16,1018,356,60.7,9.1],
[new Date('2018/3/24'),71.14,709,304,74.5,11.9],
[new Date('2018/3/23'),70.43,812,307,74.9,10.3],
[new Date('2018/3/22'),69.62,515,326,67.1,9.8],
[new Date('2018/3/21'),69.11,760,276,72.9,11.8],
[new Date('2018/3/20'),68.35,1014,332,58.4,10.4],
[new Date('2018/3/19'),67.34,1106,422,74.9,9.8],
[new Date('2018/3/18'),66.24,903,279,58.4,12],
[new Date('2018/3/17'),65.34,1274,317,63.9,10.9],
[new Date('2018/3/16'),64.07,1117,398,66.2,9.5],
[new Date('2018/3/15'),62.95,1281,380,66.8,11.7],
[new Date('2018/3/14'),61.67,1188,323,57.1,10.4],
[new Date('2018/3/13'),60.48,1541,221,56,9.7],
[new Date('2018/3/12'),58.94,936,445,56.6,9.2],
[new Date('2018/3/11'),58,1021,266,66.3,9.1],
[new Date('2018/3/10'),56.98,1641,317,57.4,10.1],
[new Date('2018/3/9'),55.34,954,268,62.2,11.3],
[new Date('2018/3/8'),54.39,1462,418,68.7,9.8],
[new Date('2018/3/7'),52.93,1169,435,54.1,12],
[new Date('2018/3/6'),51.76,954,381,60.7,10.6],
[new Date('2018/3/5'),50.81,507,235,55.5,9.6],
[new Date('2018/3/4'),50.3,221,58,53.1,13.1],
[new Date('2018/3/3'),50.08,173,83,61,11.7],
[new Date('2018/3/2'),50.1,101,50,64.6,11.6],
[new Date('2018/3/1'),50.12,203,45,63.9,12.3],
[new Date('2018/2/28'),50.04,154,63,66.3,13.8],
[new Date('2018/2/27'),50.1,0,86,58,13.5],
[new Date('2018/2/21'),106.9,384,58,81.3,11.6],
[new Date('2018/2/20'),106.52,500,53,84.6,13],
[new Date('2018/2/19'),106.02,378,44,86.5,12.2],
[new Date('2018/2/18'),105.64,264,62,85.7,13.7],
[new Date('2018/2/17'),105.38,380,78,71.7,10.9],
[new Date('2018/2/16'),105,465,77,80.1,11.1],
[new Date('2018/2/15'),104.53,150,49,73.2,11.3],
[new Date('2018/2/14'),104.38,805,78,83,11],
[new Date('2018/2/13'),103.58,468,78,75.9,11.9],
[new Date('2018/2/12'),103.11,463,59,81.9,14],
[new Date('2018/2/11'),102.65,885,50,70,13],
[new Date('2018/2/10'),101.77,1169,82,70.4,13.8],
[new Date('2018/2/9'),100.6,602,72,83.4,13.2],
[new Date('2018/2/8'),100,723,176,75.4,10.6],
[new Date('2018/2/7'),99.28,483,267,72.2,12.2],
[new Date('2018/2/6'),98.8,687,167,79.4,12.1],
[new Date('2018/2/5'),98.11,925,285,84.2,11.7],
[new Date('2018/2/4'),97.19,1215,279,71.3,10.2],
[new Date('2018/2/3'),95.98,1057,259,68.5,11],
[new Date('2018/2/2'),94.92,1143,236,69.9,11.4],
[new Date('2018/2/1'),93.78,1487,223,72.7,9.6],
[new Date('2018/1/31'),92.29,1747,379,77.7,11.8],
[new Date('2018/1/30'),90.54,955,387,72.7,10],
[new Date('2018/1/29'),89.59,1372,422,72.2,10.6],
[new Date('2018/1/28'),88.22,1547,394,65.2,9.8],
[new Date('2018/1/27'),86.67,1129,349,80.1,10.1],
[new Date('2018/1/26'),85.54,1241,359,80.2,11.9],
[new Date('2018/1/25'),84.3,934,279,73.8,9.4],
[new Date('2018/1/24'),83.37,850,257,67.7,11],
[new Date('2018/1/23'),82.52,847,255,71.4,9],
[new Date('2018/1/22'),81.67,1006,341,62.5,11.4],
[new Date('2018/1/21'),80.66,571,229,64.2,10.2],
[new Date('2018/1/20'),80.09,753,444,61.8,11.1],
[new Date('2018/1/19'),79.34,511,320,64.9,10.9],
[new Date('2018/1/18'),78.83,869,413,62.7,11.5],
[new Date('2018/1/17'),77.96,790,332,73,11.1],
[new Date('2018/1/16'),77.17,1233,260,63.4,9.2],
[new Date('2018/1/15'),75.94,1407,262,68.5,11.9],
[new Date('2018/1/14'),74.53,1071,270,61.6,11.5],
[new Date('2018/1/13'),73.46,1647,268,70.5,10.2],
[new Date('2018/1/12'),71.81,1258,339,61.5,11.9],
[new Date('2018/1/11'),70.55,1612,275,67.4,11.1],
[new Date('2018/1/10'),68.94,1364,271,70.9,10.3],
[new Date('2018/1/9'),67.58,1090,344,63.6,10.1],
[new Date('2018/1/8'),66.49,1090,306,70.2,10.6],
[new Date('2018/1/7'),65.4,1186,422,62.2,11],
[new Date('2018/1/6'),64.21,728,245,63.5,11],
[new Date('2018/1/5'),63.48,923,446,66,11],
[new Date('2018/1/4'),62.56,999,397,63.7,9.9],
[new Date('2018/1/3'),61.56,745,343,68.7,9.4],
[new Date('2018/1/2'),60.82,566,246,59.7,9.3],
[new Date('2018/1/1'),60.25,739,219,56.7,10.1],
[new Date('2017/12/31'),59.51,1026,274,63.2,10],
[new Date('2017/12/30'),58.48,1041,340,61.3,9.2],
[new Date('2017/12/29'),57.44,966,258,64.6,11.7],
[new Date('2017/12/28'),56.47,979,310,63.3,10.3],
[new Date('2017/12/27'),55.49,1022,402,63.5,9.6],
[new Date('2017/12/26'),54.47,1004,368,59.9,11.9],
[new Date('2017/12/25'),53.47,972,242,69.6,9.9],
[new Date('2017/12/24'),52.5,173,414,65.3,12],
[new Date('2017/12/23'),52.5,101,352,64,9.1],
[new Date('2017/12/22'),52.52,203,225,67,9.9],
[new Date('2017/12/21'),52.43,154,215,63.3,9.2],
[new Date('2017/12/20'),52.3,0,271,54.8,10.2]
];

	var slide_date = (new Date() - All_Data[1][0]) / 86400000;
	var date;
	var Y;
	var M;
	var D;

	New_Data.push([All_Data[0][0], All_Data[0][1], All_Data[0][2], All_Data[0][3], All_Data[0][4], All_Data[0][5]]);

	for(var i = 1; i <= All_Data.length - 1; i++)
	{
		date = All_Data[i][0];
		Y = date.getFullYear();
		M = date.getMonth();
		D = date.getDate() + slide_date;

		New_Data.push([new Date(Y,M,D), All_Data[i][1], All_Data[i][2], All_Data[i][3], All_Data[i][4], All_Data[i][5]]);
	}

}
