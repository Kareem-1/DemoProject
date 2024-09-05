<?php

abstract class Items
{
    protected $id;
    protected $name;
    protected $price;
    protected $item_type;
    public function __construct($id, $name, $price, $item_type)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->item_type = $item_type;
    }
    abstract public function save($conn);

    public function deleteItems($conn, $seperated)
    {
        $query = "DELETE FROM items_information WHERE id IN ($seperated);";
        $statement = $conn->prepare($query);
        if ($statement->execute()) {
            echo json_encode(['status' => '200', 'message' => 'SUCCESS']);
            exit();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'FAILED']);
            exit();
        }
    }
    public function getItems($conn)
    {
        $sql = "SELECT * FROM items_information";
        $statement = $conn->prepare($sql);
        if ($statement->execute()) {
            $items = $statement->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'data' => $items]);
            exit();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database GET failed']);
            exit();
        }
    }
    public function checkExists($conn, $id)
    {
        $sql = "SELECT id FROM items_information WHERE id = :id LIMIT 1";
        $statement = $conn->prepare($sql);
        $statement->bindParam(':id', $id);
        $statement->execute();

        return $statement->rowCount() > 0;
    }

    public function getId()
    {
        return $this->id;
    }
    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }
    public function getPrice()
    {
        return $this->price;
    }
    public function setPrice($price)
    {
        $this->price = $price;
    }
    public function getType()
    {
        return $this->item_type;
    }
    public function setType($item_type)
    {
        $this->item_type = $item_type;
    }
}
