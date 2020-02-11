/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.User;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsoncreator.UserJsonBuilder;
import session.UserFacade;

/**
 *
 * @author user
 */
@WebServlet(name = "LoginController", urlPatterns = {
    "/loginJson",

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
        String json = "";
        String path = request.getServletPath();
        switch (path) {
            case "/loginJson":
                JsonObjectBuilder job = Json.createObjectBuilder();
                JsonReader reader = Json.createReader(request.getInputStream());
                JsonObject jo = reader.readObject();
                String login = jo.getString("login");
                String password = jo.getString("password");
                User user = userFacade.findByLogin(login);
                if(user == null || !password.equals(user.getPassword())){
                    job.add("loginStatus", "false");
                    
                }else{
                    HttpSession session = request.getSession(true);
                    session.setAttribute("user", user);
                    UserJsonBuilder ujb = new UserJsonBuilder();
                    job.add("user", ujb.createJsonObject(user))
                        .add("loginStatus","true")
                        .add("token", session.getId());
                }
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
