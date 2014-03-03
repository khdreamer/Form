'use strict';

var defaultBlock = {
    type: "text",
    question: "Question 1",
    description: "Add some description about this question",
    sel_options: []
};

var defaultPage = {
    title: "Untitled",
    blocks: [ _.clone(defaultBlock) ]
};

angular.module('mean.designs').controller('DesignController', 
    ['$scope', '$stateParams', '$location', 'Global', 'Designs', 'Answer',
    function ($scope, $stateParams, $location, Global, Designs, Answer) {
    
    $scope.global = Global;
    $scope.edit = false;

    var b_cpy = _.clone(defaultBlock);
    b_cpy.sel_options = [];
    $scope.pages = [ {
        title: "Untitled",
        blocks: [ b_cpy ]
    } ];
    $scope.form_name = "New Form";

    $scope.create = function() {
        var design = new Designs({
            pages: this.pages,
            form_name: this.form_name
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
            console.log("remove");
            $scope.design.$remove(function(response){
                $location.path('designs');
            });
        }
    };

    $scope.update = function() {
        var design = $scope.design;
        design.pages = $scope.pages;
        design.form_name = $scope.form_name;
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
            $scope.colors = randomColors($scope.designs.length);
        });
    };

    $scope.findOne = function(callback) {
        console.log($stateParams.designId);
        Designs.get({
            designId: $stateParams.designId
        }, function(design) {
            console.log("design " + JSON.stringify(design));
            $scope.design = design;
            $scope.pages = design.pages;
            $scope.form_name = design.form_name;

            if(callback) callback();

        }, function(httpResponse){
            $location("designs");
        });
    };

    // create and edit pages

    $scope.addBlock = function(p_idx){

        // add a block
        var p = $scope.pages[p_idx];
        var b_cpy = _.clone(defaultBlock);
        b_cpy.question = "Question " + (p.blocks.length + 1);
        b_cpy.sel_options = [];
        p.blocks.push(b_cpy);

    };

    $scope.addPage = function(index){

        // add a page
        var b_cpy = _.clone(defaultBlock);
        b_cpy.sel_options = [];

        $scope.pages.splice(index+1, 0, {
            title: "Untitled",
            blocks: [ b_cpy ]
        });

    };

    $scope.addOption = function(p_idx, b_idx){

        console.log("add option");
        var sel_options = $scope.pages[p_idx].blocks[b_idx].sel_options;
        if(!sel_options) sel_options = [];
        sel_options.push("Option" + (sel_options.length+1) );
        $scope.option = sel_options[0];

    }

    // list

    $scope.goToDesign = function(id){

        console.log(id);
        $location.path('designs/' + id);

    }

    // answer

    $scope.viewDesign = function(){

        $scope.findOne(function(){

            // init answer stuff
            for($scope.answer = []; 
                $scope.answer.length < $scope.design.pages.length;
                $scope.answer.push([]));
            $scope.page_num = 0;
            $scope.p = $scope.pages[$scope.page_num];
            $scope.max = $scope.pages.length - 1;

        });
            
    }

    $scope.nextPage = function(){

        $scope.page_num++;
        $scope.p = $scope.pages[$scope.page_num];

    }

    $scope.lastPage = function(){

        $scope.page_num--;
        $scope.p = $scope.pages[$scope.page_num];

    }

    $scope.getResponse = function(){

        var ans = new Answer({
            content: this.answer
        });
        console.log("Get answer: " +　JSON.stringify($scope.answer));
        ans.$save({designId: $stateParams.designId}, function(response) {
            console.log(response);
            $location.path('thank');
        });
        
    }

    $scope.showResponse = function(){

        $scope.findOne(function(){

            // flatten answers
            $scope.answers = [];
            $scope.design.answers.forEach(function(el){

                $scope.answers.push({
                    created: new Date(el.created),
                    content: _.flatten(el.content)
                });

            });
            // flatten questions
            $scope.questions = [];
            $scope.design.pages.forEach(function(page){
                page.blocks.forEach(function(b){

                    $scope.questions.push(b.question);

                });
            });

        });        
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

function randomColors(num){

    var colors = [];
    var h = Math.floor( (Math.random() * 360) + 1 );
    var sl = ", 55%, 60%)";
    colors.push("hsl(" + h + sl);
    for(var i = 0; i < num-1; i++){

        h += (360/num);
        colors.push("hsl(" + h + sl);

    }

    return colors;

}






