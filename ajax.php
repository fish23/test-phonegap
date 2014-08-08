<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

Class RequestException extends Exception
{
}

Class Request
{
	const METHOD_GET  = 'get';
	const METHOD_POST = 'post';

	const DATA_CLASS  = "class";
	const DATA_CMD    = "cmd";
	const DATA_PARAMS = "params";

	private $isRecived = false;
	private $data;
	private $method;

	private $dataKeys = array("class", "cmd", "params");

	public function __construct()
	{
file_put_contents('log', $_GET);
		if(empty($_POST) || empty($_GET)) return;
		
		if(!empty($_POST))
		{
			$this->method    = self::METHOD_POST;
			$this->setData($_POST);
		}
		else
		{
			$this->type      = self::METHOD_GET;
			$this->setData($_GET);
		}
		$this->isRecived = true;
	}

	private function setData($data)
	{
		if(!is_array($data) || count($data) < 1) throw new RequestException("Invalid request data recived!");
		foreach($this->dataKeys as $key)
		{
			if(!array_key_exists($key, $data)) throw new RequestException("Invalid request data recived, missing key '" . $key . "'!");
		}
		$this->data = $data;
	}

	public function isRecived()
	{
		return $this->isRecived;
	}

	public function getData()
	{
		return $this->data;
	}

	public function getMethod()
	{
		return $this->method;
	}

}

Class ResponseException extends Exception
{
}

Class Response
{
	const METHOD_JSON = "json";

	private $method;
	private $data;

	private $methods = array(
		self::METHOD_JSON => "application/json"
	);

	public function __construct($method = false, $data = false)
	{
		if(false !== $method && array_key_exists($method, $this->methods))
		{
			$this->method = $method;
		}

	}

	public function setData($data)
	{
		if(!is_array($data)) throw new ResponseException("Invalid data type");
		$this->data = $data;
	}

	public function send($data = false)
	{
		if(false !== $data) $this->data = $data;
		if(!is_array($this->data)) throw new ResponseException("Invalid type or no data! Response send failed!");
		$this->_sendHeader();
		$this->_sendData();
		exit;
	}

	private function _sendHeader()
	{
		header("Content-Type: " . $this->methods[$this->method]);
		header("Cache-Control: no-cache, must-revalidate");
		header("Expires: ".gmdate("D, d M Y H:i:s")." GMT");
	}

	private function _sendData()
	{
		if($this->method === self::METHOD_JSON)
		{
			echo json_encode($this->data);
		}
	}
}

Class AppException extends Exception
{
}

Class App
{
	private $request;
	private $response;

	private $data;
	private $class;
	private $command;

	public function __construct()
	{
		$this->request  = new Request();
		$this->response = new Response("json");
	}

	public function process()
	{
		try
		{
			if(!$request->isRecived()) throw new AppException("No data recived!");

			$this->data  = $request->getData();
			$this->checkClass();
			$this->checkCommand();
			$this->response->setData($this->class->$this->command($this->data[Request::DATA_PARAMS]));
		}
		catch(ResponseException $e)
		{
			$this->response->send(array("error" => "ResponseException: " . $e->getMessage()));
		}
		catch(AppException $e)
		{
			$this->response->send(array("error" => "AppException: " . $e->getMessage()));
		}
	}

	private function checkClass()
	{
		$class = $this->data[Request::DATA_CLASS];
		if(!class_exists($class)) throw new AppException("Class '" . $class . "' not found!");
		$this->class = new $class();
	}

	private function checkCommand()
	{
		$command = $this->data[Request::DATA_CMD];
		if(!method_exists($this->class, $command)) throw new AppException("Class '" . $this->class . "' command '" . $command . "' not found!");
		$reflection = new ReflectionMethod($this->class, $command);
		if (!$reflection->isPublic()) throw new AppException("Class '" . $this->class . "' command '" . $command . "' is not public!");
		$this->command = $command;
	}

}

abstract Class AbstractAppModule
{
	protected $params;

	public function __construct($params)
	{
		$this->params = $params;
	}
}


Class AppUser extends AbstractAppModule
{
	const KEY_USER     = "user";
	const KEY_PASSWORD = "password";

	private $loginDemo = array(
		"userInfo" => array(
			"id"      => 1,
			"name"    => "Alena",
			"surname" => "Novakova",
			"street"  => "ul. 5. kvetna 17",
			"city"    => "Praha 4",
			"zip"     => "140 00",
			"phone"   => "+420 777 111 222",
			"email"   => "abc@mail.com"
		),
		"offers" => array(),
		"news"   => array(),
	);

	public function login()
	{
		if(!array_key_exists(self::KEY_USER, $this->params) || !array_key_exists(self::KEY_PASSWORD, $this->params))
		{
			throw new AppException(__CLASS__ . ":" . __METHOD__ . ": missing input params!");
		}
		$news   = new News();
		$offers = new Offers();
		$data   = $this->loginDemo;
		$data["offers"] = $offers->get();
		$data["news"]   = $news->get();
	}
}

Class News
{
	private $demo = array(
		array(
			"title"  => "Zprava dne",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		),
		array(
			"title"  => "Zprava",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		),
		array(
			"title"  => "Zprava",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		),
		array(
			"title"  => "Zprava",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		),
		array(
			"title"  => "Zprava",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		),
		array(
			"title"  => "Zprava",
			"perex"  => "A jeji relativne dlouhy popisek",
			"text"   => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur placerat faucibus vulputate. Donec vitae ligula nec nulla fermentum ultrices in et elit. Praesent aliquet nunc a neque suscipit imperdiet. Duis interdum libero sit amet justo convallis laoreet. Praesent dignissim rhoncus fermentum. Duis vel augue cursus, pellentesque leo lacinia, pulvinar massa. Phasellus eget lacus nulla. Aenean non nisi magna. In et orci vel dui ornare porta. Aliquam risus risus, lacinia vitae enim a, feugiat auctor lectus. In tempor tortor ut lobortis laoreet. Vestibulum posuere aliquet libero, non vulputate dui mollis ut. Etiam placerat mollis varius. Etiam pellentesque, eros ut viverra ultrices, tortor neque imperdiet sapien, facilisis adipiscing nisl orci ac velit. Suspendisse potenti Vestibulum vitae sem nulla."
		)
	);

	public function __construct()
	{
	}

	public function get()
	{
		return $this->demo;
	}
}

Class Offers
{
	private $demo = array(
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9002236311036"
		),
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9002236311041"
		),
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9006576311041"
		),
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9006576311074"
		),
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9006576331052"
		),
		array(
			"title" => "Nejnovejsi nabidka",
			"text"  => "A jeji relativne dlouhy popisek\nmozna cena",
			"ean13" => "9007276131052"
		)
	);

	public function __construct()
	{
	}

	public function get()
	{
		return $this->demo;
	}
}

$app = new App();
$app->process();