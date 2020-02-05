/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsonCreator;

import entity.Book;
import java.math.BigDecimal;
import javax.json.Json;
import javax.json.JsonObject;

/**
 *
 * @author user
 */
public class BookJsonBuilder {
    public JsonObject createObjectBuilder(Book book){
        return Json.createObjectBuilder().add("book", Json.createObjectBuilder()]
            .add("id",book.getId()))
            .add("caption",book.getClass())
            .add("author",book.getAuthor())
                    .add("",book.get)
    }
}
