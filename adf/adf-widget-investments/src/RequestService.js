var app = angular.module('adf.widget.investments');
app.service('RequestService', RequestService)

function RequestService ($http){
	var _company = '';
	var _token = 'EYWa43Yiw7xreqxtDcYs';
	
	this.getCompanyByTicker = function(ticker){
		var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ticker+'.json?api_key='+ _token;
		return $http.get(url)
			.then(function(res){
				_company = res.data.dataset;
				return _company;
			})
	}
	
	this.getActiveCompany = function(){
		return _company;
	}
}