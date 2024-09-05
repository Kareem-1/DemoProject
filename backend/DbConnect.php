<?php
	class DbConnect {
		private $server = 'sql312.infinityfree.com';
		private $dbname = 'if0_37248096_Items';
		private $user = 'if0_37248096';
		private $pass = 'mN0JEqcm3ISDLKv';

		public function connect() {
			try {
				$conn = new PDO("mysql:host=" .$this->server .";dbname=" . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (PDOException $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
