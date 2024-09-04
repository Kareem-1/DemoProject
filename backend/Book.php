<?php

class Book extends Items {
    private $weight;

    public function __construct($id, $name, $price, $weight)
    {
        parent::__construct($id, $name, $price, 'Book');
        $this->weight = $weight;
    }

    public function save($conn)
    {
        $sql = "INSERT INTO items_information(id, name, price, item_type, weight)
        values(:id, :name, :price, :item_type, :weight)";
        $statement = $conn->prepare($sql);
        $statement->bindParam(':id', $this->id);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':price', $this->price);
        $statement->bindParam(':item_type', $this->item_type);
        $statement->bindParam(':weight', $this->weight);
        if ($statement->execute()) {
            return true;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
            exit();
        }
    }
    public function getWeight(){
        return $this->weight;
    }
    public function setWeight($weight){
        $this->weight = $weight;
    }
}