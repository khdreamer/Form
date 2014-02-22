'use strict';

var defaultBlock = {
    type: "text",
    question: "unknow question",
    description: "unknown description",
    options: []
};

var defaultPage = {
    title: "Untitled",
    blocks: [ JSON.parse(JSON.stringify(defaultBlock)) ]
};

angular.module('mean.design').controller('DesignController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Design', 
    function ($scope, $stateParams, $location, Global, Design) {
    
    $scope.global = Global;
    $scope.pages = [ defaultPage ];

    $scope.create = function() {
        var design = new Design({
            title: this.title
        });
        design.$save(function(response) {
            $location.path('design/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(design) {
        if (design) {
            design.$remove();

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
        });
    };

    $scope.findOne = function() {
        Articles.get({
            articleId: $stateParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };

    $scope.toggleEdit = function(){



    }

    $scope.addBlock = function(number, type, description, options){

        // add a block
        console.log("add block");

        var p = $scope.pages[number];
        p.blocks.push(JSON.parse(JSON.stringify(defaultBlock)) );

    };

    $scope.addPage = function(number){

        // add a page
        console.log(defaultPage);

        // $scope.pages.splice(number+1, 0, _.clone(defaultPage)) ;
        console.log(defaultPage);
        // $scope.pages.push(_.clone(defaultPage)) ;
        // need to change all number after it

    };

}]);

angular.module('mean.design').directive('word', function(){
    return {
        scope: {
            content: "="
        },
        restrict: 'E',
        link: function(scope, element, attrs) {
            console.log(scope.content);
        },
        template: "<input value='{{content}}'></input><br>"

    }
});
