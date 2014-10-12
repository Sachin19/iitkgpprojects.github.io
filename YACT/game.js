var currentBoard = new Array(6);
var scores = new Array(6);
var pscore = new Array(2);
var pmode = new Array(2);
pmode[0]=0;
pmode[1]=1;
var turn = 1;
var cur="green", other="blue";
var started=0;
/*nextmove*/
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

function func(){
	c=0;
	for(var i=0; i<6; i++){
		for(var j=0; j<6; j++){
			if(currentBoard[i][j]==-1){
				c+=1;
			}
		}
	}
	return c;
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
function nextmoveRec(tboard, scores, tur, maxmin, level, player) {

	if(level > 3 || isBoardFull(tboard)) {
		return [utility(tboard,player, scores),-1,-1];
	}
	else {
		if(maxmin==0) {
			//alert("hello"+level);
			max1 = -4000;
			maxi = -1;
			maxj = -1;

			for(var i=0;i<36;i++) {

				var board = [];
				for(l=0;l<6;l++) {
					board[l] = tboard[l].slice(0);
				}
				r1 = parseInt(i/6);
				c1 = parseInt(i%6);
				
				if(board[r1][c1] == -1) {
					
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
					
					result = nextmoveRec(board, scores, 3-tur, 1-maxmin, level+1, player);

					if(result[0] > max1) {
						var temp = result[0];
						max1 = temp;
						maxi = r1;
						maxj = c1;
					}
				}
			}

			return [max1,maxi,maxj];
		}

		else{
			//alert("yello"+level);
			min1 = 4000;
			mini = -1;
			minj = -1;

			for(var i=0;i<36;i++) {
				var board = [];
				for(l=0;l<6;l++) {
					board[l] = tboard[l].slice(0);
				}
				r1 = parseInt(i/6);
				c1 = parseInt(i%6);

				if(board[r1][c1] == -1) {
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
					
					result = nextmoveRec(board, scores, 3-tur, 1-maxmin, level+1, player);
					
					if(result[0] < min1) {
						min1 = result[0];
						mini = r1;
						minj = c1;
					}
				}
			}
			
			return [min1,mini,minj];
		}
	}
	//alert("sdfds");
	
}

function nextmove(tboard,scores,turn) {
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
	//alert("hello");
	var temp = nextmoveRec(currentBoard, scores, tur, 0, 1, 3-tur);
	//alert(temp);
	//var x = nextmove(currentBoard,scores,turn);
	//alert(x);
	i=parseInt(temp[1]);
	j=parseInt(temp[2]);
	if(i<0 || j<0){
		alert(i+" "+j);
	}
	//alert(i+" "+j);
	//alert(currentBoard[i][j]);
	if(currentBoard[i][j]==-1){

		currentBoard[i][j]=3-tur;
		$('#'+i+"-"+j).removeClass("defaultback");
		$('#'+i+"-"+j).addClass(other);
		r=i;
		c=j;
		if(extending(currentBoard,3-tur,r,c)){
			t=c-1;
			//alert(r+","+t);
			if(r-1 >= 0){
				t = r-1;
				if(currentBoard[t][c] == tur){
					$('#'+t+"-"+c).switchClass(cur,other);
					currentBoard[t][c]=3-tur;
				}
			}
			if(r+1<6){
				t = r+1;
				if(currentBoard[t][c] == tur){
					$('#'+t+"-"+c).switchClass(cur,other);	
					currentBoard[t][c]=3-tur;
				}
			}
			if(c-1>=0){
				t=c-1;
				if(currentBoard[r][t] == tur){
					//alert("yes");
					$('#'+r+"-"+t).switchClass(cur,other);
					currentBoard[r][t]=3-tur;
				}
			}
			if(c+1<6){
				t=c+1;
				if(currentBoard[r][t] == tur){
					$('#'+r+"-"+t).switchClass(cur,other);
					currentBoard[r][t]=3-tur;
				}
			}
		}
		updateScore(tur);
		updateScore(3-tur);
		setStatus(cur);
		//scores to be updated. keep in mind that expansions decrease opponenents score
		return 1;
	}
	else return 0;
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

					if(extending(currentBoard,turn,r,c)){
						if(r-1 >= 0) {
							t = r-1;
							if(currentBoard[t][c] == 3-turn){
								ch=ch+1;
								$('#'+t+"-"+c).switchClass("potential",cur);
								currentBoard[t][c]=turn;
							}
						}
						if(r+1<6) {
							t = r+1;
							if(currentBoard[t][c] == 3-turn){
								ch=ch+1;
								$('#'+t+"-"+c).switchClass("potential",cur);	
								currentBoard[t][c]= turn;
							}
						}
						if(c-1>=0) {
							t=c-1;
							if(currentBoard[r][t] == 3-turn){
								ch=ch+1;
								$('#'+r+"-"+t).switchClass("potential",cur);
								currentBoard[r][t]=turn;
							}
						}
						if(c+1<6) {
							t=c+1;
							if(currentBoard[r][t] == 3-turn){
								ch=ch+1;
								$('#'+r+"-"+t).switchClass("potential",cur);
								currentBoard[r][t]=turn;
							}
						}
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
								if(w==1){
									setStatus("Green wins");
								}
								else if(w==2){
									setStatus("It a draw");
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
						if(w==1){
							setStatus("Green wins");
						}
						else if(w==2){
							setStatus("It a draw");
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

	board="";
	for (var i = 0; i < 6; i++) {
		board += "<tr>";
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
	if(pmode[p] != m){
		pmode[p] = m;
		if(p==0){
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
	}

}

function p1MiniMax() {
	//setStatus(cur);
	playOpponent(turn);
	//alert("hello");
	setTimeout(function(){
		//alert("sfvdsfg");
		if(isGameOver()){
			w = winner();
			if(w==1){
				//setStatus("Green wins");
			}
			else if(w==2){
				setStatus("It a draw");
			}
			else{
				setStatus("Blue wins");
			}
		}
		else{
			setStatus("heere");
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
	setTimeout(function(){
		if(isGameOver()){
			w = winner();
			if(w==1){
				setStatus("Green wins");
			}
			else if(w==2){
				setStatus("It a draw");
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
		setStatus("Green")
		if(pmode[0] == 0 || pmode[1] == 0)
			addListeners();
		if(pmode[0] != 0 && pmode[1]==0){
			turn = 2;
			cur="blue";
			other="green";
			setStatus("Green");
			playOpponent(turn);
		}
		if(pmode[0] == 1 && pmode[1] == 1) {
			turn = 2;
			cur="blue";
			other="green";
			p1MiniMax();
		}
	}
	
}

function restartGame() {
	started = 0;
	resetBoard();
	startGame();
}

function activateDropdownListener() {
	$(".boardoption").click(function(){
		started=0;
		$("#boardtype").html($(this).html());
		$('#restart').hide().fadeOut('slow');
		$('#start').show().fadeIn('slow');
		resetBoard();
	});
}
$(document).ready(function(){
	activateDropdownListener();
	resetBoard();
});