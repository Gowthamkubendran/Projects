import java.sql.*;
import java.text.SimpleDateFormat;
import java.io.*;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;


import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import static javax.ws.rs.client.Entity.html;

@WebServlet("/DbEntry")
public class DbEntry extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
       
            String birthdaypersonname = request.getParameter("t1");
            String day=request.getParameter("day");
            int da=Integer.parseInt(day);
            String month=da+"-"+request.getParameter("month");
            
           
            Class.forName("com.mysql.cj.jdbc.Driver");
              String databaseName="defaultdb";
            String host="mysql-24b6d43d-kubendranrani50-9114.g.aivencloud.com";
            String port="13951";
            String dbUser = "avnadmin";
            String dbPass = "AVNS_SI4yzcRDkCi4RP7QXfK";
              Connection con = DriverManager.getConnection( "jdbc:mysql://" + host + ":" + port + "/" + databaseName +"?ssl-mode=REQUIRED",
    dbUser, dbPass
);

            
            String userID="";
            String username="";
           HttpSession session = request.getSession(false); // don't create new session
          if (session != null) {
         Object userIdObj = session.getAttribute("userID");
          Object usernameObj = session.getAttribute("name");
          if (userIdObj != null) {
        userID = userIdObj.toString(); 
        username=usernameObj.toString();
    } else{
          System.out.print("userId is not found");
          }
          }else{
          System.out.println("session is not found");
          }

            String query = "INSERT INTO birthdays (userid,name,birthdaypersonname,date) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, userID);
            ps.setString(2, username);
            ps.setString(3, birthdaypersonname);
            ps.setString(4,month);

           
            int rows = ps.executeUpdate();

            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            if (rows > 0) {
                out.println("<h3>Record inserted successfully!</h3>");
                LocalDate date=LocalDate.now();
                LocalDate postdate=date.plusDays(1);
               notifyEmail(date,con,response);
               notifyEmail(postdate,con,response);
                
// Month name (e.g., "January")
                
            }else {
                out.println("<h3>Insertion failed.</h3>");
            }
            ps.close();
            con.close();

        
        
    } catch (Exception e) {
            e.printStackTrace();}

}
    public static void notifyEmail(LocalDate date,Connection con,HttpServletResponse response) throws SQLException, UnsupportedEncodingException, IOException{
         HashMap<String,List<String>> map=new HashMap<>();
           PrintWriter out = response.getWriter();
        int d= date.getDayOfMonth();
     String monthName = date.getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                 monthName=d+"-"+monthName;
                String qry="select * from birthdays where date= '"+monthName+"'";
                Statement st=con.createStatement();
                ResultSet rs=st.executeQuery(qry);
                while(rs.next()){
                String id=rs.getString(2);
                if(map.containsKey(id)){
                    map.get(id).add(rs.getString(4));
                }else{
                 List<String> li=new ArrayList<>();
                 li.add(rs.getString(4));
                      map.put(id,li);
                }
                }
                for(String key: map.keySet()){
                       out.println("<html><body>");
                out.println("<h3>Sending email to: " + key + "</h3>");

                 out.println("<h3>Content: "+ String.join(",", map.get(key))+"</h3>");
                }
                LocalDate today=LocalDate.now();
                String cont="";
                String content="";
              if(today.equals(date)){
                  cont+="Today ";
              }else{
                    cont+="Tomorrow ";
                }
                   for (String entry : map.keySet()) {
                     String key = entry;
        List<String> birthdayFriends = map.get(entry);

        // GenerGenerate HTML content
                String htmlContent = buildBirthdayHtmlMessage(cont, birthdayFriends);
                       
                        
              
                       System.out.println("Sending email to: " + key);
System.out.println("Content: " + content);

                new EmailUtil().sendEmail(key,"Birthday Remainder !",htmlContent);
                }
            
    }
    
    
private static String buildBirthdayHtmlMessage(String prefix, List<String> friends) {
    String friendsList = String.join(", ", friends);
    String plural = friends.size() > 1 ? "s" : "";

    return "<html>" +
           "<body style='font-family: Arial, sans-serif; color: #333;'>" +
               "<div style='border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9; max-width: 600px;'>" +
                   "<h2 style='color: #4CAF50;'>🎉 " + prefix + "</h2>" +
                   "<p style='font-size: 16px;'>" +
                       "It's the birthday of your <strong>friend" + plural + "</strong>: " +
                       "<span style='color: #2196F3; font-weight: bold;'>" + friendsList + "</span>." +
                   "</p>" +
                   "<p style='font-size: 15px;'>Make their day <strong style='color: #E91E63;'>extra special</strong> with a warm message or a call! 🎂</p>" +
               "</div>" +
           "</body>" +
           "</html>";
}



}
