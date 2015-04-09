var scotchTodo = angular.module('scotchTodo', []);

function mainController ($scope, $http) {
    $scope.formData = {};

    // Al abrir la página, pedir todos los todos y mostrarlos
    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                // Limpia el formulario
                $scope.formData = {};

                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function (id) {
        http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}