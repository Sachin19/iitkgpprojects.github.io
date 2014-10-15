var currentBoard = new Array(6);
var scores = new Array(6);
var pscore = new Array(2);
var pmode = new Array(2);
var alphabet = ['A','B','C','D','E','F'];
var logs = [];
pmode[0]=0;
pmode[1]=1;
var turn = 1;
var cur="blue", other="green";
var started=0;
dd=0;
var to1, to2;


function utility(board, player, scores) {
	p1=0;
	p2=0;
	for(i=0;i<6;i++){
		for(j=0;j<6;j++){
			if(board[i][j] == 1){
				p1 = p1 + scores[i][j];
			}
			else if(board[i][j] == 2){
				p2 = p2 + scores[i][j];
			}
		}
	}
	if(player==1){
		return p1-p2;
	}
	else{
		return p2-p1;
	}
}

function isBoardFull(board) {
	for(var i=0; i<6; i++){
		for(var j=0; j<6; j++){
			if(board[i][j]==-1){
				return false;
			}
		}
	}
	return true;
}

function addLog(logval) {
	$('#logtable').append("<span class=\"list-group-item\" >"+logval+"</span>").fadeIn('slow');
}

function nextmoveRec(tboard, scores, tur, maxmin, level, player) {

	if(level > 3 || isBoardFull(tboard)) {
		return [utility(tboard,player, scores),-1,-1];
	}
	else {

		if(maxmin==0) {

			var max1 = -4000;
			var maxi = -1;
			var maxj = -1;

			for(var r1=0;r1<6;r1+=1) {
				for(var c1=0;c1<6;c1+=1) {

					if(tboard[r1][c1] == -1) {

						var board = new Array(6);
						for(var l=0;l<6;l++) {
							board[l] = new Array(6);
						}

						for(var l=0; l<6; l++){
							for(var j=0; j<6; j++){
								board[l][j] = tboard[l][j];
							}
						}

						board[r1][c1] = 3-tur;
						if(extending(board,3-tur,r1,c1)) {
							if(r1-1 >= 0) {
								if(board[r1-1][c1] == tur) {
									board[r1-1][c1] = 3-tur;
								}
							}
							if(r1+1 < 6) {
								if(board[r1+1][c1] == tur) {
									board[r1+1][c1] = 3-tur;
								}
							}
							if(c1-1 >= 0) {
								if(board[r1][c1-1] == tur) {
									board[r1][c1-1] = 3-tur;
								}
							}
							if(c1+1 < 6) {
								if(board[r1][c1+1] == tur) {
									board[r1][c1+1] = 3-tur;
								}
							}
						}
						
						var result = nextmoveRec(board, scores, 3-tur, 1-maxmin, level+1, player);

						if(result[0] > max1) {
							max1 = result[0];
							maxi = r1;
							maxj = c1;
						}
						
					}
				}
			}
			return [max1,maxi,maxj];
		}

		else{
			var min1 = 4000;
			var mini = -1;
			var minj = -1;

			for(var r1=0;r1<6;r1+=1) {
				for(var c1=0;c1<6;c1+=1) {

					if(tboard[r1][c1] == -1) {
						var board = new Array(6);
						for(l=0;l<6;l++) {
							board[l] = new Array(6);
						}

						for(var l=0; l<6; l++){
							for(var j=0; j<6; j++){
								board[l][j] = tboard[l][j];
							}
						}

						board[r1][c1] = 3-tur;
						if(extending(board,3-tur,r1,c1)) {
							if(r1-1 >= 0) {
								if(board[r1-1][c1] == tur) {
									board[r1-1][c1] = 3-tur;
								}
							}
							if(r1+1 < 6) {
								if(board[r1+1][c1] == tur) {
									board[r1+1][c1] = 3-tur;
								}
							}
							if(c1-1 >= 0) {
								if(board[r1][c1-1] == tur) {
									board[r1][c1-1] = 3-tur;
								}
							}
							if(c1+1 < 6) {
								if(board[r1][c1+1] == tur) {
									board[r1][c1+1] = 3-tur;
								}
							}
						}
						
						var result = nextmoveRec(board, scores, 3-tur, 1-maxmin, level+1, player);
						
						if(result[0] < min1) {
							min1 = result[0];
							mini = r1;
							minj = c1;
						}
					}
				}
			}
			return [min1,mini,minj];
		}
	}
	//alert("sdfds");
	
}

function nextMoveAlphaBeta(tboard, scores, tur, maxmin, level, player, alpha, beta) {
	if(level > 4 || isBoardFull(tboard)) {
		return [utility(tboard, player, scores), -1, -1];
	}
	else{
		if(maxmin == 0) {
			var maxi = 100;
			var maxj = 100;

			for(var r1=0;r1<6;r1+=1) {
				for(var c1=0;c1<6;c1+=1) {

					if(tboard[r1][c1] == -1) {

						var board = new Array(6);
						for(var l=0;l<6;l++) {
							board[l] = new Array(6);
						}

						for(var l=0; l<6; l++){
							for(var j=0; j<6; j++){
								board[l][j] = tboard[l][j];
							}
						}

						board[r1][c1] = 3-tur;
						if(extending(board,3-tur,r1,c1)) {
							if(r1-1 >= 0) {
								if(board[r1-1][c1] == tur) {
									board[r1-1][c1] = 3-tur;
								}
							}
							if(r1+1 < 6) {
								if(board[r1+1][c1] == tur) {
									board[r1+1][c1] = 3-tur;
								}
							}
							if(c1-1 >= 0) {
								if(board[r1][c1-1] == tur) {
									board[r1][c1-1] = 3-tur;
								}
							}
							if(c1+1 < 6) {
								if(board[r1][c1+1] == tur) {
									board[r1][c1+1] = 3-tur;
								}
							}
						}
						
						var result = nextMoveAlphaBeta(board, scores, 3-tur, 1-maxmin, level+1, player, alpha, beta);
						if(alpha < result[0]) {
							alpha = result[0];
							maxi = r1;
							maxj = c1;
						}
						if(beta <= alpha){
							return [alpha, maxi, maxj];
						}
					}
				}
			}
			return [alpha,maxi,maxj];
		}

		else {
			var mini = -1;
			var minj = -1;

			for(var r1=0;r1<6;r1+=1) {
				for(var c1=0;c1<6;c1+=1) {

					if(tboard[r1][c1] == -1) {
						var board = new Array(6);
						for(l=0;l<6;l++) {
							board[l] = new Array(6);
						}

						for(var l=0; l<6; l++){
							for(var j=0; j<6; j++){
								board[l][j] = tboard[l][j];
							}
						}

						board[r1][c1] = 3-tur;
						if(extending(board,3-tur,r1,c1)) {
							if(r1-1 >= 0) {
								if(board[r1-1][c1] == tur) {
									board[r1-1][c1] = 3-tur;
								}
							}
							if(r1+1 < 6) {
								if(board[r1+1][c1] == tur) {
									board[r1+1][c1] = 3-tur;
								}
							}
							if(c1-1 >= 0) {
								if(board[r1][c1-1] == tur) {
									board[r1][c1-1] = 3-tur;
								}
							}
							if(c1+1 < 6) {
								if(board[r1][c1+1] == tur) {
									board[r1][c1+1] = 3-tur;
								}
							}
						}
						
						var result = nextMoveAlphaBeta(board, scores, 3-tur, 1-maxmin, level+1, player, alpha, beta);
						if(beta > result[0]) {
							beta = result[0];
							mini = r1;
							minj = c1;
						}
						if(beta <= alpha) {
							return [beta,mini, minj];
						}
					}
				}
			}
			return [beta,mini,minj];
		}
	}
}
//not being used
/*function nextmove(tboard,scores,turn) {
	var ss = new Array(36);
	max1 = -4000;
	maxi = -1;
	maxj = -1;
	for(var i=0;i<36;i++){
		var board = [];
		for(l=0;l<6;l++){
			board[l] = tboard[l].slice(0);
		}
		r1 = parseInt(i/6);
		c1 = parseInt(i%6);

		if(board[r1][c1] == -1){
			board[r1][c1] = 3-turn;
			if(extending(board,3-turn,r1,c1)){
				if(r1-1 >= 0){
					if(board[r1-1][c1] == turn){
						board[r1-1][c1] = 3-turn;
					}
				}
				if(r1+1 < 6){
					if(board[r1+1][c1] == turn){
						board[r1+1][c1] = 3-turn;
					}
				}
				if(c1-1 >= 0){
					if(board[r1][c1-1] == turn){
						board[r1][c1-1] = 3-turn;
					}
				}
				if(c1+1 < 6){
					if(board[r1][c1+1] == turn){
						board[r1][c1+1] = 3-turn;
					}
				}
			}
			min2 = 4000;
			for(var j=0;j<36;j++){

				var t2board = [];
				for(l=0;l<6;l++){
					t2board[l] = board[l].slice(0);
				}

				r2 = parseInt(j/6);
				c2 = parseInt(j%6);
				if(t2board[r2][c2] == -1){
					t2board[r2][c2] = turn;

					if(extending(t2board,3-turn,r2,c2)){
						if(r2-1 >= 0){
							if(t2board[r2-1][c2] == 3-turn){
								t2board[r2-1][c2] = turn;
							}
						}
						if(r2+1 < 6){
							if(t2board[r2+1][c2] == 3-turn){
								t2board[r2+1][c2] = turn;
							}
						}
						if(c2-1 >= 0){
							if(t2board[r2][c2-1] == 3-turn){
								t2board[r2][c2-1] = turn;
							}
						}
						if(c2+1 < 6){
							if(t2board[r2][c2+1] == 3-turn){
								t2board[r2][c2+1] = turn;
							}
						}
					}	

					//alert("nutree");
					max3 = -4000;
					for(var k=0;k<36;k++) {		
						
						var t3board = [];
						for(l=0;l<6;l++){
							t3board[l] = t2board[l].slice(0);
						}

						r3 = parseInt(k/6);
						c3 = parseInt(k%6);
						if(t3board[r3][c3] == -1){
							t3board[r3][c3] = 3-turn;
							
							if(extending(t3board,3-turn,r3,c3)){
								if(r3-1 >= 0){
									if(t3board[r3-1][c3] == turn){
										t3board[r3-1][c3] = 3-turn;
									}
								}
								if(r3+1 < 6){
									if(t3board[r3+1][c3] == turn){
										t3board[r3+1][c3] = 3-turn;
									}
								}
								if(c3-1 >= 0){
									if(t3board[r3][c3-1] == turn){
										t3board[r3][c3-1] = 3-turn;
									}
								}
								if(c3-1 < 6){
									if(t3board[r3][c3+1] == turn){
										t3board[r3][c3+1] = 3-turn;
									}
								}
							}
							//alert("sfsdf");
							ut = utility(t3board, 3-turn, scores);
							//alert(ut);
							if(max3 < ut){
								max3 = ut;
							}
						}
					}

					if(min2 > max3){
						min2 = max3;
					}
				}
			}

			if(max1 < min2) {
				max1 = min2;
				maxi = r1;
				maxj = c1;
			}
			//alert(1);
			ss[i] = maxi;

		}
		else{
		 	//alert("no"+i);
		}
	}
	alert(ss);
	return [ss[maxi*6+maxj],maxi,maxj];

}
*/
/*nextmove*/


function isGameOver(){
	return isBoardFull(currentBoard);
}


function extending(board,i,r,c){
	//alert(i+" "+r+" "+c);
	if(r-1 >= 0){
		if(board[r-1][c]==i)
			return true;
	}
	if(r+1<6){
		if(board[r+1][c]==i)
			return true;	
	}
	if(c-1>=0){	
		if(board[r][c-1]==i)
			return true;
	}
	if(c+1<6){
		if(board[r][c+1]==i)
			return true;
	}	
	return false;
}

function calcScore(turn) {
	scoret=0;
	for(var i=0; i<6; i++){
		for(var j=0; j<6; j++){
			if(currentBoard[i][j]==turn)
				scoret += scores[i][j];
		}
	}
	return scoret;
}

function winner() {
	score1=calcScore(1);
	score2=calcScore(2);
	if(score1 > score2){
		return 1;
	}
	else if(score1 == score2){
		return 2;
	}
	else{
		return 3;
	}
};

function playOpponent(tur){

	var temp;
	if(pmode[2-tur] == 2)
		temp = nextMoveAlphaBeta(currentBoard, scores, tur, 0, 1, 3-tur, -10000, 10000);
	else {
		temp = nextmoveRec(currentBoard, scores, tur, 0, 1, 3-tur);
	}

	i=parseInt(temp[1]);
	j=parseInt(temp[2]);

	if(i<0 || j<0){
		alert(i+" "+j);
	}

	if(currentBoard[i][j]==-1){
		currentBoard[i][j]=3-tur;
		$('#'+i+"-"+j).removeClass("defaultback");
		$('#'+i+"-"+j).addClass(other);
		flag=0;
		logval = ""+other;
		r=i;
		c=j;
		alpha = alphabet[c];

		if(extending(currentBoard,3-tur,r,c)){
			
			logval+=" M1 Death Blitz "+alpha+r;
			addLog(logval);
			logs.push(logval);
			flag = 1;
			t=c-1;
			//alert(r+","+t);
			if(r-1 >= 0){
				t = r-1;
				if(currentBoard[t][c] == tur){
					$('#'+t+"-"+c).switchClass(cur,other);
					currentBoard[t][c]=3-tur;
					addLog(other+" captures "+alpha+t);
					logs.push(other+" captures "+alpha+t);
				}
			}
			if(r+1<6){
				t = r+1;
				if(currentBoard[t][c] == tur){
					$('#'+t+"-"+c).switchClass(cur,other);	
					currentBoard[t][c]=3-tur;
					addLog(other+" captures "+alpha+t);
					logs.push(other+" captures "+alpha+t); 
				}
			}
			if(c-1>=0){
				t=c-1;
				if(currentBoard[r][t] == tur){
					//alert("yes");
					$('#'+r+"-"+t).switchClass(cur,other);
					currentBoard[r][t]=3-tur;
					alpha = alphabet[t];
					addLog(other+" captures "+alpha+r); 
					logs.push(other+" captures "+alpha+r);
				}
			}
			if(c+1<6){
				t=c+1;
				if(currentBoard[r][t] == tur){
					$('#'+r+"-"+t).switchClass(cur,other);
					currentBoard[r][t]=3-tur;
					alpha = alphabet[t];
					addLog(other+" captures "+alpha+r);
					logs.push(other+" captures "+alpha+r);

				}
			}
		}
		if(flag==0) {
			addLog(other+" paradrops "+alpha+r);
			logs.push(other+" paradrops "+alpha+r);
		}
		updateScore(tur);
		updateScore(3-tur);
		setStatus(cur);
		//scores to be updated. keep in mind that expansions decrease opponenents score
		return 1;
	}
	else {
		alert("theres a problem here "+temp);
		return 0;
	}
}

function updateScore(p){
	scorep = calcScore(p);
	//alert(scorep);
	$('#player'+p).html("<h3>"+scorep+"</h3>");
}

function addListeners() { 
	for (var i = 0; i < 6; i++) {
		for( var j=0; j < 6; j++) {

			$('#'+i+"-"+j).click(function(){
				var ch=0;
				x = $(this).attr("id");
				y = x.split("-");
				r = parseInt(y[0]);
				c = parseInt(y[1]);
				if(currentBoard[r][c] == -1){
					$(this).removeClass();
					$(this).addClass(cur);
					currentBoard[r][c]=turn;
					flag = 0;
					logval = ""+cur;
					alpha = alphabet[c];

					
					if(extending(currentBoard,turn,r,c)){
						flag=1;
						logval += " M1 Death Blitz "+alpha+r;
						addLog(logval);
						logs.push(logval);
						if(r-1 >= 0) {
							t = r-1;
							if(currentBoard[t][c] == 3-turn){
								ch=ch+1;
								$('#'+t+"-"+c).switchClass("potential",cur);
								currentBoard[t][c]=turn;
								addLog(cur+" captures "+alpha+t);
								logs.push(cur+" captures "+alpha+t);
							}
						}
						if(r+1<6) {
							t = r+1;
							if(currentBoard[t][c] == 3-turn){
								ch=ch+1;
								$('#'+t+"-"+c).switchClass("potential",cur);	
								currentBoard[t][c]= turn;
								addLog(cur+" captures "+alpha+t);
								logs.push(cur+" captures "+alpha+t);
							}
						}
						if(c-1>=0) {
							t=c-1;
							if(currentBoard[r][t] == 3-turn){
								ch=ch+1;
								$('#'+r+"-"+t).switchClass("potential",cur);
								currentBoard[r][t]=turn;
								alpha = alphabet[t];
								addLog(cur+" captures "+alpha+r);
								logs.push(cur+" captures "+alpha+r);

							}
						}
						if(c+1<6) {
							t=c+1;
							if(currentBoard[r][t] == 3-turn){
								ch=ch+1;
								$('#'+r+"-"+t).switchClass("potential",cur);
								currentBoard[r][t]=turn;
								alpha = alphabet[t];
								addLog(cur+" captures "+alpha+r);
								logs.push(cur+" captures "+alpha+r);
							}
						}
					}

					if(flag==0) {
						addLog(cur+" paradrops "+alpha+r);
						logs.push(cur+" paradrops "+alpha+r);
					}

					updateScore(turn);
					updateScore(3-turn);
					//alert(pmode);
					if(!isGameOver()){

						if(pmode[2-turn] != 0) {
							//alert("hain");
							setStatus(other);
							playOpponent(turn);
							if(isGameOver()){
								w = winner();
								if(w==3){
									setStatus("Green wins");
								}
								else if(w==2){
									setStatus("It's a draw");
								}
								else{
									setStatus("Blue wins");
								}
							}
						}
						else{
							turn = 3-turn;
							temp = cur;
							cur = other;
							other = temp;
						}
					}
					else{
						w = winner();
						if(w==3){
							setStatus("Green wins");
						}
						else if(w==2){
							setStatus("It's a draw");
						}
						else{
							setStatus("Blue wins");
						}
					}
				}
			});

			$('#'+i+"-"+j).mouseenter(function(){
				x = $(this).attr("id");
				y = x.split("-");
				r = parseInt(y[0]);
				c = parseInt(y[1]);

				if(currentBoard[r][c] == -1){
					$(this).removeClass("defaultback");
					$(this).addClass("pointed");

					if(extending(currentBoard,turn,r,c)){
						if(r-1 >= 0){
							t = r-1;
							if(currentBoard[t][c] == 3-turn)
								$('#'+t+"-"+c).switchClass(other,"potential");
						}
						if(r+1 < 6){
							t = r+1;
							if(currentBoard[t][c] == 3-turn)
								$('#'+t+"-"+c).switchClass(other,"potential");	
						}
						if(c-1 >= 0){
							t=c-1;
							if(currentBoard[r][t] == 3-turn)
								$('#'+r+"-"+t).switchClass(other,"potential");
						}
						if(c+1 < 6){
							t=c+1;
							if(currentBoard[r][t] == 3-turn)
								$('#'+r+"-"+t).switchClass(other,"potential");
						}
					}
					else{
						//alert("yello");
					}
				}
			});

			$('#'+i+"-"+j).mouseleave(function(){
				//$(this).removeClass('pointed');
				
				x = $(this).attr("id");
				y = x.split("-");
				r = parseInt(y[0]);
				c = parseInt(y[1]);

				if(currentBoard[r][c] == -1) {
					$(this).addClass("defaultback");
					$(this).removeClass("pointed");
					$(this).removeClass("potential");
					if(extending(currentBoard,turn,r,c)){
						if(r-1 >= 0){
							t = r-1;
							if(currentBoard[t][c] == 3-turn)
								$('#'+t+"-"+c).switchClass("potential",other);
						}
						if(r+1<6){
							t = r+1;
							if(currentBoard[t][c] == 3-turn)
								$('#'+t+"-"+c).switchClass("potential",other);	
						}
						if(c-1>=0){
							t=c-1;
							if(currentBoard[r][t] == 3-turn)
								$('#'+r+"-"+t).switchClass("potential",other);
						}
						if(c+1<6){
							t=c+1;
							if(currentBoard[r][t] == 3-turn)
								$('#'+r+"-"+t).switchClass("potential",other);
						}
					}
				}
			});
		}
	}	
}

function setBoard() {
	bt = $('#boardtype').html();
	if(bt === 'Random') {
		for(var i=0; i<6; i++){
			currentBoard[i] = new Array(6);
			scores[i] = new Array(6);
			for(var j=0; j<6; j++){
				currentBoard[i][j] = -1;
				scores[i][j] = Math.floor(Math.random()*99)+1;
			}
		}
		

	}
	else if(bt === "Keren"){
		scores = [ [1, 1,	1,	1,	1,	1],[1,	1,	1,	1,	1,	1],[1,	1,	1,	1,	1,	1],[1,	1,	1,	1,	1,	1],[1,	1,	1,	1,	1,	1],[1,	1,	1,	1,	1,	1]];
		currentBoard = [ [-1, -1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1]];
	}
	else if(bt === "Narvik"){
		scores = [[99,1,99,1,99,1],[1,99,1,99,1,99],[99,1,99,1,99,1],[1,99,1,99,1,99],[99,1,99,1,99,1],[1,99,1,99,1,99]];
		currentBoard = [ [-1, -1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1]];
	}

	else if(bt === "Sevastopol"){
		scores = [[1,1,1,1,1,1],[2,2,2,2,2,2],[4,4,4,4,4,4],[8,8,8,8,8,8],[16,16,16,16,16,16],[32,32,32,32,32,32]];
		currentBoard = [ [-1, -1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1]];
	}

	else if(bt === "Smolensk"){
		scores = [[66,76,28,66,11,9],[31,39,50,8,33,14],[80,76,39,59,2,48],[50,73,43,3,13,3],[99,45,72,87,49,4],[80,63,92,28,61,53]];
		currentBoard = [ [-1, -1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1]];
	}

	else if(bt === "Westerplatte"){
		scores = [[1,1,1,1,1,1],[1,3,4,4,3,1],[1,4,2,2,4,1],[1,4,2,2,4,1],[1,3,4,4,3,1],[1,1,1,1,1,1]];
		currentBoard = [ [-1, -1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1],[-1,	-1,	-1,	-1,	-1,	-1]];
	}
}

function setStatus(text) {
	$('#status').html(text);
}

function resetBoard(){
	setBoard();
	pscore[0]=0;
	pscore[1]=0;
	updateScore(1);
	updateScore(2);
	setStatus("Click Start to play");
	board = "";
	for (var i = 0; i < 6; i++) {
		board += "<tr><td style=\"background-color: transparent; border:none; font-size:20px; text-align: center; vertical-align: middle;\">"+i+"</td>";
		for( var j=0; j<6; j++) {
			board += "<td class=\"defaultback\" style=\"border: 5px solid #FFFFFF; border-radius:10px; text-align: center; vertical-align: middle;\"id=\""+i+"-"+j+"\"><span style=\"font-size:20px\">"+scores[i][j]+"</span></td>";
		}
		board += "</tr>";
	};
	$('#gameboard').html(board);
	for (var i = 0; i < 6; i++) {
		for( var j=0; j < 6; j++) {

			h = $('#'+i+"-"+j).width();
			$('#'+i+"-"+j).height(h);
		}
	}
}

function changeMode(p,m){
	clearTimeout(to1);
	clearTimeout(to2);
	if(pmode[p] != m){
		pmode[p] = m;
		if(p==1){
			$('#p'+p+'0').removeClass("green");
			$('#p'+p+'1').removeClass("green");
			$('#p'+p+'2').removeClass("green");
			$('#p'+p+m).addClass("green");
		}
		else{
			$('#p'+p+'0').removeClass("blue");
			$('#p'+p+'1').removeClass("blue");
			$('#p'+p+'2').removeClass("blue");	
			$('#p'+p+m).addClass("blue");
		}
		resetBoard();
		started = 0;
		$('#restart').hide().fadeOut('slow');
		$('#start').show().fadeIn('slow');
		logs = [];
		$('#logtable').html("");
		setStatus("CLick start to play");

	}

}

function p1MiniMax() {
	setStatus(cur);
	playOpponent(turn);
	//alert("hello");
	to1 = setTimeout(function(){
		//alert("sfvdsfg");
		if(isGameOver()){
			w = winner();
			if(w==3){
				//setStatus("Green wins");
			}
			else if(w==2){
				setStatus("It's a draw");
			}
			else{
				setStatus("Blue wins");
			}
		}
		else{
			turn = 3-turn;
			temp = cur;
			cur = other;
			other = temp;
			p2MiniMax();
		}
	},100);
}

function p2MiniMax() {
	setStatus(cur);
	playOpponent(turn);
	to2 = setTimeout(function(){
		if(isGameOver()){
			w = winner();
			if(w==3){
				setStatus("Green wins");
			}
			else if(w==2){
				setStatus("It's a draw");
			}
			else{
				setStatus("Blue wins");
			}
		}
		else{
			//alert("what")
			turn = 3-turn;
			temp = cur;
			cur = other;
			other = temp;
			p1MiniMax();
		}
	},100);
}

function startGame() {
	//alert(pmode);
	$('#start').hide().fadeOut('slow');
	$('#restart').show().fadeIn('slow');
	if(started == 0) {
		started = 1;
		turn = 1;
		cur = "blue";
		other = "green";
		setStatus("blue")
		if(pmode[0] == 0 || pmode[1] == 0)
			addListeners();
		if(pmode[0] != 0 && pmode[1]==0){
			turn = 2;
			cur="green";
			other="blue";
			setStatus("green");
			playOpponent(turn);
		}
		if(pmode[0] != 0 && pmode[1] != 0) {
			turn = 2;
			other="blue";
			cur="green";
			p1MiniMax();
		}
	}
	
}

function restartGame() {
	clearTimeout(to1);
	clearTimeout(to2);
	started = 0;
	resetBoard();
	startGame();
	logs = [];
	$('#logtable').html("");
	setStatus("Click start to play");

}

function activateDropdownListener() {
	$(".boardoption").click(function(){
		started=0;
		clearTimeout(to1);
		clearTimeout(to2);
		$("#boardtype").html($(this).html());
		$('#restart').hide().fadeOut('slow');
		$('#start').show().fadeIn('slow');
		logs = [];
		$('#logtable').html("");
		resetBoard();
	});
}
$(document).ready(function(){
	activateDropdownListener();
	resetBoard();
	$("#logtable").on('scroll', function(){
    	scrolled=true;
	});
});