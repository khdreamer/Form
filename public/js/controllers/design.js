'use strict';

var defaultBlock = {
    type: "text",
    question: "Question 1",
    description: "Add some description about this question",
    options: []
};

var defaultPage = {
    title: "Untitled",
    blocks: [ _.clone(defaultBlock) ]
};

angular.module('mean.designs').controller('DesignController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Designs', 
    function ($scope, $stateParams, $location, Global, Designs) {
    
    $scope.global = Global;
    $scope.edit = false;
    $scope.pages = [ defaultPage ];

    $scope.create = function() {
        var design = new Designs({
            pages: this.pages
        });
        console.log("design: " + JSON.stringify(design));
        design.$save(function(response) {
            console.log(response);
            $location.path('designs/' + response._id);
        });

        var b_cpy = _.clone(defaultBlock);
        b_cpy.options = [];
        this.pages = [ {
            title: "Untitled",
            blocks: [ b_cpy ]
        } ];

    };

    $scope.remove = function(design) {
        if (design) {
            design.$remove();

            for (var i in $scope.design) {
                if ($scope.design[i] === design) {
                    $scope.design.splice(i, 1);
                }
            }
        }
        else {
            console.log("remove");
            $scope.design.$remove(function(response){
                $location.path('designs');
            });
        }
    };

    $scope.update = function() {
        var design = $scope.design;
        design.pages = $scope.pages;
        if (!design.updated) {
            design.updated = [];
        }
        design.updated.push(new Date().getTime());

        design.$update(function() {
            $location.path('designs/' + design._id);
        });
    };

    $scope.find = function() {
        Designs.query(function(designs) {
            $scope.designs = designs;
        });
    };

    $scope.findOne = function() {
        console.log($stateParams.designId);
        Designs.get({
            designId: $stateParams.designId
        }, function(design) {
            console.log("design " + JSON.stringify(design));
            $scope.design = design;
            $scope.pages = design.pages;
        });
    };

    $scope.addBlock = function(p_idx){

        // add a block
        var p = $scope.pages[p_idx];
        var b_cpy = _.clone(defaultBlock);
        b_cpy.question = "Question " + (p.blocks.length + 1);
        b_cpy.options = [];
        p.blocks.push(b_cpy);

    };

    $scope.addPage = function(index){

        // add a page
        var b_cpy = _.clone(defaultBlock);
        b_cpy.options = [];

        $scope.pages.splice(index+1, 0, {
            title: "Untitled",
            blocks: [ b_cpy ]
        });

    };

    $scope.addOption = function(p_idx, b_idx){

        console.log("add option");
        var options = $scope.pages[p_idx].blocks[b_idx].options;
        options.push("Option" + (options.length+1) );
        $scope.option = options[0];

    }

}]);

angular.module('mean.designs').directive('word', function(){
    return {
        scope: {
            word: "=word"
        },
        restrict: 'A',
        link: function(scope, element, attrs) {

            scope.$watch("word", function(newV, oldV){

                if(newV == true)
                    element.removeClass("word-edit");
                else
                    element.addClass("word-edit");

            });
            
        }
    }
});
