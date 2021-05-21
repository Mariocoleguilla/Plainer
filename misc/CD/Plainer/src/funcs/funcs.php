<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
/*************************Year*************************/
if (isset($_GET['yearRequest'])) {
    echo $_SESSION['year'];
}
if (isset($_GET['yearChange'])) {
    $_SESSION['year'] = $_GET['yearChange'];
    echo $_GET['yearChange'];
}
/*************************Year*************************/
/*************************Month*************************/
if (isset($_GET['monthRequest'])) {
    echo $_SESSION['month'];
}
if (isset($_GET['monthChange'])) {
    $_SESSION['month'] = $_GET['monthChange'];
    echo $_GET['monthChange'];
}
/*************************Month*************************/
/*************************View*************************/
if (isset($_GET['viewRequest'])) {
    echo $_SESSION['view'];
}
if (isset($_GET['viewChange'])) {
    $_SESSION['view'] = $_GET['viewChange'];
}
/*************************View*************************/
/*************************First Entry*************************/
if (isset($_GET['firstEntryRequest'])) {
    echo $_SESSION['firstEntry'];
}
/*************************First Entry*************************/
/*************************Admin*************************/
if (isset($_GET['adminRequest'])) {
    echo $_SESSION['admin'];
}
if (isset($_GET['adminLogged'])) {
    $_SESSION['admin'] = "true";
}
if (isset($_GET['logout'])) {
    $_SESSION['admin'] = "false";
}
/*************************Admin*************************/
/*************************BBDD Check and Creation*************************/
if (isset($_GET['checkBBDD'])) {
    try {
        $conn = new PDO("mysql:host=$servername", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->query("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'plainer'");
        echo $stmt->fetchColumn();
        $conn = null;
    }
    catch(PDOException $e) {
        echo "Conexión fallida: " . $e->getMessage();
    }
}
if (isset($_GET['createBBDD'])) {
    $advices = "";
    try {
        $conn = new PDO("mysql:host=$servername", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $sql = "CREATE DATABASE plainer";
            //Se usa exec() porque no retorna valores
            if ($conn->exec($sql) == 1) {
                $advices .= "Base de datos creada con éxito\n";
            }
            $sql = "CREATE TABLE plainer.events (
                        id INT(6) AUTO_INCREMENT PRIMARY KEY,
                        date VARCHAR(30) NOT NULL,
                        event VARCHAR(200) NOT NULL,
                        hours VARCHAR(500) NOT NULL,
                        color VARCHAR(20) NOT NULL
                    )";
            if ($conn->exec($sql) == 1) {
                $advices .= "Tabla events creada con éxito\n";
            }
            $sql = "CREATE TABLE plainer.users (
                user VARCHAR(30) NOT NULL,
                password VARCHAR(255) NOT NULL
            )";
            if ($conn->exec($sql) == 1) {
                $advices .= "Tabla users creada con éxito\n";
            }
            try {
                $hashPassword = password_hash("admin", PASSWORD_DEFAULT);
                $sql = "INSERT INTO plainer.users (user, password)
                VALUES(\"admin\", '" . $hashPassword . "')";
                if ($conn->exec($sql) > 0) {
                    $advices .= "Usuario añadido con éxito\n";
                }
            } catch (PDOException $error) {
                $advices .= "Error: " . $sql . "\n" . $error->getMessage() . "\n";
            }
        } catch(PDOException $e) {
            $advices .= "Fallo al crear la base de datos " . $e->getMessage() . "\n";
        }
        $conn = null;

    } catch(PDOException $e) {
        $advices .= "Conexión fallida: " . $e->getMessage() . "\n";
    }
    echo $advices;
}
/*************************BBDD Check and Creation*************************/
/*************************BBDD Query*************************/
if (isset($_GET['queryAll'])) {
    $dates = array();
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM events";
        $events = $conn->query($sql);
        foreach($events as $row) {
            array_push($dates, array(
                "id" => $row['id'],
                "date" => $row['date'],
                "event" => $row['event'],
                "hours" => $row['hours'],
                "color" => $row['color']
            ));
        }
        echo json_encode($dates);

    } catch(PDOException $e) {
        echo "Conexión fallida: " . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['queryDay'])) {
    $data = array();
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM events WHERE date = '" . $_GET['queryDay'] . "'";
        $day = $conn->query($sql);
        foreach($day as $row) {
            array_push($data, array(
                "id" => $row['id'],
                "date" => $row['date'],
                "event" => $row['event'],
                "hours" => $row['hours'],
                "color" => $row['color']
            ));
        }
        echo json_encode($data);

    } catch(PDOException $e) {
        echo "Conexión fallida: " . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['queryUser'])) {
    $loginObj = json_decode($_GET['queryUser']);
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT password FROM users WHERE user = '" . $loginObj->user . "'";
        $login = $conn->query($sql);
        $result = $login->fetch(PDO::FETCH_ASSOC);
        if (password_verify($loginObj->password, $result['password'])) {
            echo "1";
        } else {
            echo "0";
        }

    } catch(PDOException $e) {
        echo "Conexión fallida: " . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['insertEvent'])) {
    $objInsertion = json_decode($_GET['insertEvent']);
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO events (date, event, hours, color)
                VALUES ('" . $objInsertion->date . "', '" . $objInsertion->event . "', '" . $objInsertion->hours . "', '" . $objInsertion->color . "')";
        $conn->exec($sql);

    } catch(PDOException $e) {
        echo $sql . "\n" . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['deleteEvent'])) {
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "DELETE FROM events WHERE id=" . $_GET['deleteEvent'];
        $conn->exec($sql);

    } catch(PDOException $e) {
        echo $sql . "\n" . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['editEvent'])) {
    $objUpdate = json_decode($_GET['editEvent']);
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "UPDATE events SET event = '" . $objUpdate->event . "', hours='" . $objUpdate->hours . "', color='" . $objUpdate->color . "' WHERE id=" . $objUpdate->id;
        $conn->exec($sql);

    } catch(PDOException $e) {
        echo $sql . "\n" . $e->getMessage();
    }
    $conn = null;
}
if (isset($_GET['eventsQuery'])) {
    $objEventsQuery = json_decode($_GET['eventsQuery']);
    $eventsData = array();
    try {
        $conn = new PDO("mysql:host=$servername;dbname=plainer", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT * FROM events WHERE date >= CAST('" . $objEventsQuery->from . "' AS UNSIGNED)
                AND date <= CAST('" . $objEventsQuery->to . "' AS UNSIGNED) ORDER BY CAST(date AS UNSIGNED) ASC";
        $eventsQuery = $conn->query($sql);
        foreach($eventsQuery as $row) {
            array_push($eventsData, array(
                "id" => $row['id'],
                "date" => $row['date'],
                "event" => $row['event'],
                "hours" => $row['hours'],
                "color" => $row['color']
            ));
        }
        echo json_encode($eventsData);

    } catch(PDOException $e) {
        echo $sql . "\n" . $e->getMessage();
    }
    $conn = null;
}
/*************************BBDD Query*************************/
?>