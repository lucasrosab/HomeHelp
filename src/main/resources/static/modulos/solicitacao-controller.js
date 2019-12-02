app.controller("SolicitacaoController", function($scope, $http, $location, $rootScope){
	
	$scope.hidraulica = {};
	$scope.reparo = {};
	$scope.acabamento = {};
	$scope.eletricista = {};
	$rootScope.solicitacoes = [];
	$rootScope.cliLogado;
	
	$scope.hidraulica.dia = RetornaDataAtual();
	$scope.reparo.dia = RetornaDataAtual();
	$scope.acabamento.dia = RetornaDataAtual();
	$scope.eletricista.dia = RetornaDataAtual();
	
	$scope.hidraulica.endereco = $rootScope.cliLogado.cliente.endereco
	$scope.reparo.endereco = $rootScope.cliLogado.cliente.endereco
	$scope.acabamento.endereco = $rootScope.cliLogado.cliente.endereco
	$scope.eletricista.endereco = $rootScope.cliLogado.cliente.endereco
	
	
	//-----------------------------------------------------------------------------------------------//
	//Carregar todas as solicitacões no geral
	carregarTodasSolicitacoes = function(){
		
		 $http({method: 'GET', url: 'http://localhost:8080/solicitar/todas'})
		 .then(function successCallback(response) {
			 $rootScope.solicitacoes = response.data
		 }, function errorCallback(response) {

		 });
	};
	
	carregarTodasSolicitacoes();
	
	//Solicitar Hidráulica 
	$scope.solicitarHidraulica = function(){
		$scope.hidraulica.cliente = {id: $rootScope.cliLogado.cliente.id};
		$scope.hidraulica.categoria = "Hidraulica"
		
		$http({method: 'POST',url: 'http://localhost:8080/solicitar/nova',data:$scope.hidraulica})
	    .then(function successCallback(response) {
	    	redirectSolicitacao('#HidraulicaModal');
	    }, function errorCallback(response) {
	    	
	    });
	}	 
	
	//Solicitar Reparos 
	$scope.solicitarReparos = function(){
		$scope.reparo.cliente = {id: $rootScope.cliLogado.cliente.id};
		$scope.reparo.categoria = "Reparo"
		
		$http({method: 'POST',url: 'http://localhost:8080/solicitar/nova',data:$scope.reparo})
	    .then(function successCallback(response) {
	    	redirectSolicitacao('#ReparosModal');
	    }, function errorCallback(response) {
	    		    	
	    });
	}	
	
	//Solicitar Acabamento 
	$scope.solicitarAcabamento = function(){
		$scope.acabamento.cliente = {id: $rootScope.cliLogado.cliente.id};
		$scope.acabamento.categoria = "Acabamento"
		
		$http({method: 'POST',url: 'http://localhost:8080/solicitar/nova',data:$scope.acabamento})
	    .then(function successCallback(response) {
	    	redirectSolicitacao('#AcabamentoModal');
	    }, function errorCallback(response) {
	    	
	    });
	}
	
	//Solicitar Eletricista 
	$scope.solicitarEletricista = function(){
		$scope.eletricista.cliente = {id: $rootScope.cliLogado.cliente.id};
		$scope.eletricista.categoria = "Eletricista"
		
		$http({method: 'POST',url: 'http://localhost:8080/solicitar/nova',data:$scope.eletricista})
	    .then(function successCallback(response) {
	    	redirectSolicitacao('#EletricistaModal');
	    }, function errorCallback(response) {
	    	
	    });

	}	
	
	$scope.cancelarAlteracaoPrestador = function(){
		$scope.prestador = {}
	}
	
	 
	//Excluir Prestador
	//Ao chamar essa funcao, passar o valor como parametro para a exclusao 
	$scope.excluirPrestador= function(prestador){
	 $http({method: 'DELETE',url: 'http://localhost:8080/prestador' + prestador.id})
	    .then(function successCallback(response) {
	   	 pos = $scope.prestadores.indexOf(cliente)
	   	 $scope.prestadores.splice(pos, 1);
	    }, function errorCallback(response) {
	   	 
	    });
	}
	//-----------------------------------------------------------------------------------------------//
	// Funções e Validações
	
    //Função para carregar o tipo de mensagem ao cadastrar
    function mensagem(mensagem, status) {
        $scope.mensagem = mensagem
        $scope.status = status
        $('.toast').toast({ delay: 3000 });
        $('.toast').toast('show');
    }
    
    $scope.mudarEmail = function() {
		$('#HidraulicaModal').modal('hide')
	    $('body').removeClass('modal-open');
		$('.modal-backdrop').remove(); 
		$location.path('/cliente/dados-pessoais')
    }
    
    function RetornaDataAtual(){
    	var dNow = new Date();
    	var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
    	return localdate;
    }
    
    function redirectSolicitacao(id) {
		$(id).modal('hide')
	    $('body').removeClass('modal-open');
		$('.modal-backdrop').remove(); 
    	$location.path('/cliente/solicitacoes')
    }

    $("#txtHorarioHidro").mask("23:59", {
        placeholder: "__:__",
        selectOnFocus: true,
        clearIfNotMatch: true,
        translation: {
            2: {
                pattern: /[0-2]/
            },
            3: {
                pattern: /[0-9]/
            },
            5: {
                pattern: /[0-5]/
            },
            9: {
                pattern: /[0-9]/
            }
        }
    });    
   
    $("#HorarioReparos").mask("23:59", {
        placeholder: "__:__",
        selectOnFocus: true,
        clearIfNotMatch: true,
        translation: {
            2: {
                pattern: /[0-2]/
            },
            3: {
                pattern: /[0-9]/
            },
            5: {
                pattern: /[0-5]/
            },
            9: {
                pattern: /[0-9]/
            }
        }
    });
    
    $("#HorarioAcabamento").mask("23:59", {
        placeholder: "__:__",
        selectOnFocus: true,
        clearIfNotMatch: true,
        translation: {
            2: {
                pattern: /[0-2]/
            },
            3: {
                pattern: /[0-9]/
            },
            5: {
                pattern: /[0-5]/
            },
            9: {
                pattern: /[0-9]/
            }
        }
    });
    
    $("#HorarioEletricista").mask("23:59", {
        placeholder: "__:__",
        selectOnFocus: true,
        clearIfNotMatch: true,
        translation: {
            2: {
                pattern: /[0-2]/
            },
            3: {
                pattern: /[0-9]/
            },
            5: {
                pattern: /[0-5]/
            },
            9: {
                pattern: /[0-9]/
            }
        }
    });
    
})