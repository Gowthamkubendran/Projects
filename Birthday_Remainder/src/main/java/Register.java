import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/Register")  // Ensure correct servlet mapping
public class Register extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
response.setContentType("text/html");
        out.println("<html><body>");
        out.println("<h2>Register Form</h2>");
        out.println("<form method='post' action='Register'>");
        out.println("Name: <input type='text' name='name'><br>");
        out.println("UserID: <input type='text' name='userid'><br>");
        out.println("Password: <input type='password' name='password'><br>");
        out.println("<input type='submit' value='Register'>");
        out.println("</form>");
        out.println("</body></html>");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        PrintWriter out = response.getWriter();
        String name=request.getParameter("name");
        String userID = request.getParameter("userid");
        String pw = request.getParameter("password");

        
    try{
         Class.forName("com.mysql.cj.jdbc.Driver");
        String databaseName="defaultdb";
            String host="mysql-24b6d43d-kubendranrani50-9114.g.aivencloud.com";
            String port="13951";
             String dbUser = "avnadmin";
            String dbPass = "AVNS_SI4yzcRDkCi4RP7QXfK";
           Connection con = DriverManager.getConnection( "jdbc:mysql://" + host + ":" + port + "/" + databaseName +"?ssl-mode=REQUIRED",
    dbUser, dbPass
);
          Statement statement = con.createStatement();
            
            // Check if username already exists
            String checkQuery = "SELECT * FROM users WHERE userid = ?";
            PreparedStatement checkStmt = con.prepareStatement(checkQuery);
            checkStmt.setString(1, userID);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                out.println("<html><body>");
                out.println("<script>");
                out.println("alert('Username already exists. Please log in.');");
                out.println("window.location.href='Login';");
                out.println("</script>");
                out.println("</body></html>");
            } else {
                // Insert new user into database
                String insertQuery = "INSERT INTO users (name, userid, password) VALUES (?, ?, ?)";
                PreparedStatement insertStmt = con.prepareStatement(insertQuery);
                insertStmt.setString(1,name);
                insertStmt.setString(2, userID);
                insertStmt.setString(3, pw);
                insertStmt.executeUpdate();

                out.println("<html><body>");
                out.println("<script>");
                out.println("alert('Successfully Registered!');");
                out.println("window.location.href='Login';");
                out.println("</script>");
                out.println("</body></html>");
                insertStmt.close();
            }

            checkStmt.close();
            
            con.close();
        } catch (Exception e) {
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
            e.printStackTrace();
        }
    }

    @Override
    public String getServletInfo() {
        return "Servlet for user registration";
    }
}
