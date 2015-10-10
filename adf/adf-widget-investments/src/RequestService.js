app.service('RequestService', RequestService)

function RequestService ($http){
	var _company = '';
	
	this.getCompanyByTicker = function(ticker){
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ticker+'.json';
		return $http.get(url)
			.then(function(res){
				console.log(res);
				_company = res.data.dataset;
				return _company;
			})
	}
	
	this.getActiveCompany = function(){
		return _company;
	}
}