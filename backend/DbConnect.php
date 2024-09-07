<?php


class DbConnect
{

	private $server;
	private $dbname;
	private $user;
	private $pass;

	public function __construct($url, $databasename, $username, $password)
	{
		$this->server = $url;
		$this->dbname = $databasename;
		$this->user = $username;
		$this->pass = $password;
		echo $this->server . " " .  $this->dbname . " " . $this->pass;

	}
	public function connect()
	{
		try {
			$conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->dbname, $this->user, $this->pass);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return $conn;
		} catch (PDOException $e) {
			echo "Database Error: " . $e->getMessage();
		}
	}

}
