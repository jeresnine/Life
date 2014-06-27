function MainController($scope, $timeout){

	$scope.board = new Array();
	for(var i = 0; i < 40; i++){
		$scope.board[i] = new Array();
		for(var j = 0; j < 40; j++){
			$scope.board[i][j] = false;
		}
	}

	$scope.startLife = function startLife(){
		$scope.isActive = !$scope.isActive;
		if($scope.isActive)
			$scope.onTick();
	};

	$scope.onTick = function onTick(){
		$scope.tempBoard = new Array();
		for(var i = 0; i < 40; i++){
			$scope.tempBoard[i] = new Array();
			for(var j = 0; j < 40; j++){
				$scope.tempBoard[i][j] = $scope.board[i][j];
			}
		}
		for(var i = 0; i < 40; i++){
			for(var j = 0; j < 40; j++){
				$scope.setStatus(i,j);
			}
		}
		$scope.board = $scope.tempBoard;
		if($scope.isActive)
			$scope.promise = $timeout($scope.onTick, 500);
	};

	$scope.setStatus = function setStatus(i,j){

		var liveNeighbors = 0;

		//determine cell above
		if(i == 0) liveNeighbors += $scope.board[i+39][j] ? 1 : 0;
		else liveNeighbors += $scope.board[i-1][j] ? 1 : 0;

		//determine cell below
		if(i == 39) liveNeighbors += $scope.board[i-39][j] ? 1 : 0;
		else liveNeighbors += $scope.board[i+1][j] ? 1 : 0;

		//determine cell to the left
		if(j == 0) liveNeighbors += $scope.board[i][j+39] ? 1 : 0;
		else liveNeighbors += $scope.board[i][j-1] ? 1 : 0;

		//determine cell to the right
		if(j == 39) liveNeighbors += $scope.board[i][j-39] ? 1 : 0;
		else liveNeighbors += $scope.board[i][j+1] ? 1 : 0;

		//determine cell to the top left
		if(i == 0 && j == 0) liveNeighbors += $scope.board[i+39][j+39] ? 1 : 0;
		else if(i == 0) liveNeighbors += $scope.board[i+39][j-1] ? 1 : 0;
		else if(j == 0) liveNeighbors += $scope.board[i-1][j+39] ? 1 : 0;
		else liveNeighbors += $scope.board[i-1][j-1] ? 1 : 0;

		//determine cell to the top right
		if(i == 0 && j == 39) liveNeighbors += $scope.board[i+39][j-39] ? 1 : 0;
		else if(i == 0) liveNeighbors += $scope.board[i+39][j+1] ? 1 : 0;
		else if(j == 39) liveNeighbors += $scope.board[i-1][j-39] ? 1 : 0;
		else liveNeighbors += $scope.board[i-1][j+1] ? 1 : 0;

		//determine cell to the bottom left
		if(i == 39 && j == 0) liveNeighbors += $scope.board[i-39][j+39] ? 1 : 0;
		else if(i == 39) liveNeighbors += $scope.board[i-39][j-1] ? 1 : 0;
		else if(j == 0) liveNeighbors += $scope.board[i+1][j+39] ? 1 : 0;
		else liveNeighbors += $scope.board[i+1][j-1] ? 1 : 0;

		//determine cell to the bottom right
		if(i == 39 && j == 39) liveNeighbors += $scope.board[i-39][j-39] ? 1 : 0;
		else if(i == 39) liveNeighbors += $scope.board[i-39][j+1] ? 1 : 0;
		else if(j == 39) liveNeighbors += $scope.board[i+1][j-39] ? 1 : 0;
		else liveNeighbors += $scope.board[i+1][j+1] ? 1 : 0;
		

		if($scope.board[i][j] && (liveNeighbors < 2 || liveNeighbors > 3))
			$scope.tempBoard[i][j] = false;
		else if(!$scope.board[i][j] && liveNeighbors == 3)
			$scope.tempBoard[i][j] = true;

	};

};