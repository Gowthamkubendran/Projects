
import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/Login")
public class Login extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        
        
        
        try {
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession(false);

            if (session != null && session.getAttribute("userID") != null) {
                response.sendRedirect("home.jsp");return;
            } else {
                Cookie[] cookies = request.getCookies();
                String userIdFromCookie = null;
                String nameFromCookie=null;

                if (cookies != null) {
                    for (Cookie c : cookies) {
                        if ("userID".equals(c.getName())) {
                            String decodedUserID = URLDecoder.decode(c.getValue(), StandardCharsets.UTF_8.toString());
                            userIdFromCookie = decodedUserID;
                        }
                        if("name".equals(c.getName())){
                              String decodedValue = URLDecoder.decode(c.getValue(), StandardCharsets.UTF_8.toString());
                            nameFromCookie=decodedValue;
                        }
                        
                    }
                }

                if (userIdFromCookie != null) {
                    session = request.getSession();
                    session.setAttribute("userID", userIdFromCookie);
                    session.setAttribute("name",nameFromCookie);
                    response.sendRedirect("home.jsp");
                    return;
                } 
            }
                    
                
      
       // PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        out.println("<html><body>");
        out.println("<h2>Login Form</h2>");
        out.println("<form method='post' action='Login'>");
        out.println("Username: <input type='text' name='username'><br>");
        out.println("Password: <input type='password' name='password'><br>");
        out.println("<input type='submit' value='Login'>");
        out.println("</form>");
        out.println("<a href='Register'>Register</a>");
        out.println("</body></html>");
        
                
    
            }catch(Exception e){
        e.printStackTrace();
}
    }
    

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String userID = request.getParameter("username");
        String pw = request.getParameter("password");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
             String databaseName="defaultdb";
            String host="mysql-24b6d43d-kubendranrani50-9114.g.aivencloud.com";
            String port="13951";
             

            String dbUser = "avnadmin";
            String dbPass = "AVNS_SI4yzcRDkCi4RP7QXfK";
                      Connection con = DriverManager.getConnection( "jdbc:mysql://" + host + ":" + port + "/" + databaseName +"?ssl-mode=REQUIRED",
    dbUser, dbPass
);
            String query = "SELECT * FROM users WHERE userid = ? AND password = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, userID);
            ps.setString(2, pw);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                HttpSession session = request.getSession();
                session.setAttribute("userID", userID);
                session.setAttribute("name",rs.getString(1));
                String encodedUserID = URLEncoder.encode(userID, StandardCharsets.UTF_8.toString());
                String encodedValue = URLEncoder.encode(rs.getString(1), StandardCharsets.UTF_8.toString());
                Cookie loginCookie = new Cookie("userID", encodedUserID);
                loginCookie.setMaxAge(365 * 24 * 60 * 60);
                loginCookie.setHttpOnly(true);
                loginCookie.setPath("/");
                response.addCookie(loginCookie);
                Cookie nameCookie = new Cookie("name", encodedValue);
                nameCookie.setMaxAge(365 * 24 * 60 * 60);
                nameCookie.setHttpOnly(true);
                nameCookie.setPath("/");
                response.addCookie(nameCookie);

                response.sendRedirect("home.jsp");
            } else {
                out.println("<html><body>");
                out.println("<script>");
                out.println("alert('Invalid username or password!');");
                out.println("window.location.href='Login';");
                out.println("</script>");
                out.println("</body></html>");
            }

            rs.close();
            ps.close();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<h3>Error occurred: '" + e.getMessage() + "'</h3>");
        }
    }

    @Override
    public String getServletInfo() {
        return "Login servlet that authenticates users";
    }
}
