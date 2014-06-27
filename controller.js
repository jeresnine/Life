function MainController($scope){
	$scope.board = new Array();
	for(var i = 0; i < 10; i++){
		$scope.board[i] = new Array();
		for(var j = 0; j < 10; j++){
			$scope.board[i][j] = true;
		}
	}

};