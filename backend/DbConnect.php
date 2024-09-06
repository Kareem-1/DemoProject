<?php
	class DbConnect {
		private $server = 'sql12.freemysqlhosting.net';
		private $dbname = 'sql12729930';
		private $user = 'sql12729930';
		private $pass = 't4AT5ahY83';

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
