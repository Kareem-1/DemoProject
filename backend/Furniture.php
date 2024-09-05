<?php

class Furniture extends Items
{
    private $dimensions;

    public function __construct($id, $name, $price, $dimensions)
    {
        parent::__construct($id, $name, $price, 'Furniture');
        $this->dimensions = $dimensions;
    }

    public function save($conn)
    {
        $sql = "INSERT INTO items_information(id, name, price, item_type, dimensions)
        values(:id, :name, :price, :item_type, :dimensions)";
        $statement = $conn->prepare($sql);
        $statement->bindParam(':id', $this->id);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':price', $this->price);
        $statement->bindParam(':item_type', $this->item_type);
        $statement->bindParam(':dimensions', $this->dimensions);
        if ($statement->execute()) {
            return true;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
            exit();
        }
    }

    public function getDimensions(){
        return $this->dimensions;
    }
    public function setDimensions($dimensions){
        $this->dimensions = $dimensions;
    }
}