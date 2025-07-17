<%@page import="java.io.PrintWriter"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Start Page</title>
</head>
<body>
   <h1>Welcome, <%= session.getAttribute("name") %>!</h1>
  
    <form action="DbEntry" method="post">
        <label>Name :</label>
        <input type="text" name="t1"><br>
        
          
       <label for="day">Select a Day:</label>
        <input type="number" name="day"/>
       
       <label for="month">Select a month:</label>
<select id="month" name="month">
  <option value="January">January</option>
  <option value="February">February</option>
  <option value="March">March</option>
  <option value="April">April</option>
  <option value="May">May</option>
  <option value="June">June</option>
  <option value="July">July</option>
  <option value="August">August</option>
  <option value="September">September</option>
  <option value="October">October</option>
  <option value="November">November</option>
  <option value="December">December</option>
</select>
       <br>
        <input type="submit" value="Submit">
    </form>
   
</body>
</html>
