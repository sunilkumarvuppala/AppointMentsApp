#!"c:\xampp\perl\bin\perl.exe"

use CGI;
use DBI;
use JSON;
      
$query = new CGI;
my $dateInput = $query->param("dateInput");
my $timeInput = $query->param("timeInput");
my $descInput = $query->param("descInput");
print $query ->header;

$database = "perlmysqldb";
$host = "localhost";
$port = 3306;
my $dsn = "DBI:mysql:database=$database;host=$host";
my $dbh = DBI -> connect($dsn,"root","");
$queryInput = "INSERT INTO appointments VALUES ('$dateInput', '$timeInput', '$descInput');";
$sth = $dbh -> prepare($queryInput); 
$sth -> execute;