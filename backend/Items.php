<?php

abstract class Items {
    protected $id;
    protected $name;
    protected $price;
    protected $item_type;
    public function __construct($id, $name,$price,$item_type){
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->item_type = $item_type;
    }
    abstract public function save($conn);
    public function getItems($conn){
        $sql = "SELECT * FROM items_information";
        $statement = $conn->prepare($sql);
        if($statement->execute()){
            return true;
        }else{
            echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
            exit();
        }
    }
    public function getId(){
        return $this->id;
    }
    public function getName(){
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }
    public function getPrice(){
        return $this->price;
    }
    public function setPrice($price){
        $this->price = $price;
    }
    public function getType(){
        return $this->item_type;
    }
    public function setType($item_type){
        $this->item_type = $item_type;
    }
}
