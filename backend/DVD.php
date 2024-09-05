<?php

class DVD extends Items
{
    private $size;

    public function __construct($id, $name, $price, $size)
    {
        parent::__construct($id, $name, $price, 'DVD');
        $this->size = $size;
    }

    public function save($conn)
    {
        $sql = "INSERT INTO items_information(id, name, price, item_type, size)
        values(:id, :name, :price, :item_type, :size)";
        $statement = $conn->prepare($sql);
        $statement->bindParam(':id', $this->id);
        $statement->bindParam(':name', $this->name);
        $statement->bindParam(':price', $this->price);
        $statement->bindParam(':item_type', $this->item_type);
        $statement->bindParam(':size', $this->size);
        if ($statement->execute()) {
            return true;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database insert failed']);
            exit();
        }
    }
    public function getSize(){
        return $this->size;
    }
    public function setSize($size){
        $this->size = $size;
    }
}
