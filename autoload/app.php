
<?php

    $data = file_get_contents("php://input");
    $methods = $_SERVER['REQUEST_METHOD'];
    $header = apache_request_headers();  



    function autoload($class){

        $firs = [
            dirname(__FILE__)
        ];

    }


    spl_autoload_register('autoload');



    class api {

        use getInstance;

        public function __construct()
        {
            
        }
    }