'use strict';

var defaultBlock = {
    type: "text",
    question: "unknow question",
    description: "unknown description",
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
            $scope.article.$remove();
            $location.path('designs');
        }
    };

    $scope.update = function() {
        var design = $scope.design;
        if (!design.updated) {
            design.updated = [];
        }
        design.updated.push(new Date().getTime());

        design.$update(function() {
            $location.path('designs/' + design._id);
        });
    };

    $scope.find = function() {
        Designs.query(function(design) {
            $scope.design = design;
        });
    };

    $scope.findOne = function() {
        console.log($stateParams.designId);
        Designs.get({
            designId: $stateParams.designId
        }, function(design) {
            $scope.design = design;
        });
    };

    $scope.addBlock = function(index, type, description, options){

        // add a block
        var p = $scope.pages[index];
        var b_cpy = _.clone(defaultBlock);
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
                    element.addClass("word-edit");
                else
                    element.removeClass("word-edit");

            });
            
        }
    }
});
