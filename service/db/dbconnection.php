<?php
class DbConnection {

    var $server_name = "127.0.0.1";
    var $user_name = "root";
    var $password = "root123";
    var $connection = Null;

    public function getDbConnection(){

        if($this->connection == Null){
            // Create connection
            $this->connection = new mysqli($this->server_name, $this->user_name, $this->password);

            // Check connection
            if ($this->connection->connect_error) {
                die("Connection failed: " . $this->connection->connect_error);
            }
        }
        return $this->connection;
    }

    public function closeConnection(){

        $this->connection = Null;

    }

}


?>