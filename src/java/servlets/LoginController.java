/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Book;
import entity.Customer;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsoncreator.BookJsonBuilder;
import jsoncreator.CustomerJsonBuilder;
import jsoncreator.UserJsonBuilder;
import session.BookFacade;
import session.CustomerFacade;
import session.UserFacade;

/**
 *
 * @author user
 */
@WebServlet(name = "LoginController",  urlPatterns = {
    "/loginJson",
    "/logoutJson",
    
    
})
public class LoginController extends HttpServlet {
 
    @EJB private UserFacade userFacade;
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonArrayBuilder jab = Json.createArrayBuilder();
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        String json = "";
        String path = request.getServletPath();
        switch (path) {
            case "/loginJson":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String login = jsonObject.getString("login");
                String password = jsonObject.getString("password");
                
                if("".equals(login) || login == null
                       || "".equals(password) || password == null ){
                    job.add("authStatus", "false");
                    try(Writer writer =new StringWriter()) {
                        Json.createWriter(writer).write(job.build());
                        json = writer.toString(); 
                      }
                    break;
                }   
                User user = userFacade.findByLogin(login);
                if(user == null){
                    job.add("authStatus", "false");
                    try(Writer writer =new StringWriter()) {
                        Json.createWriter(writer).write(job.build());
                        json = writer.toString(); 
                      }
                    break;
                }
                if(!password.equals(user.getPassword())){
                    job.add("authStatus", "false");
                    try(Writer writer =new StringWriter()) {
                        Json.createWriter(writer).write(job.build());
                        json = writer.toString(); 
                      }
                    break;
                }
                session = request.getSession(true);
                session.setAttribute("user", user);
                UserJsonBuilder ujb = new UserJsonBuilder();
                job.add("authStatus", "true")
                        .add("user", ujb.createJsonObject(user))
                        .add("token", session.getId());
                
                try(Writer writer =new StringWriter()) {
                  Json.createWriter(writer).write(job.build());
                  json = writer.toString(); 
                }
                break;
            case "/logoutJson":
                json = "";
                if(session != null){
                    session.invalidate();
                }
                job.add("authStatus", "false")
                        .add("user", "null")
                        .add("token","null");
                try(Writer writer =new StringWriter()) {
                    Json.createWriter(writer).write(job.build());
                    json = writer.toString(); 
                    
                  }
                break;
               
        }
        
        try (PrintWriter out = response.getWriter()) {
          out.println(json);        
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
