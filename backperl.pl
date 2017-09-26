#!"c:\xampp\perl\bin\perl.exe"

use CGI;
use DBI;

$query = new CGI;
print $query ->header;

my $searchValue = $query->param("searchValue");

$database = "perlmysqldb";
$host = "localhost";
$port = 3306;
my $dsn = "DBI:mysql:database=$database;host=$host";
my $dbh = DBI -> connect($dsn,"root","");

$query = "SELECT appointmentDate, appointmentTime, description FROM appointments WHERE description LIKE '%$searchValue%'";
$sth = $dbh -> prepare($query); 
$sth -> execute;
my $count = 0;
print "[";
 while(($appointmentDate,$appointmentTime, $description) = $sth -> fetchrow()){
     if($count > 0){
  print ",\n";
    }
  print "{\"date\":\"$appointmentDate\",\"time\":\"$appointmentTime\",\"desc\":\"$description\"}";
     $count++;   
 }
print "]";



