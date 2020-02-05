/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;

/**
 *
 * @author user
 */
@Entity
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String caption;
    private String author;
    private int publisedYear;
    private String cover;
    private String text;
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Date date;
    private boolean active;

    public Book() {
    }

    public Book(String caption, String author, int publisedYear, String cover, String text) {
        this.caption = caption;
        this.author = author;
        this.publisedYear = publisedYear;
        this.cover = cover;
        this.text = text;
        this.date = new Date();
        this.active = true;
    }
    

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getPublisedYear() {
        return publisedYear;
    }

    public void setPublisedYear(int publisedYear) {
        this.publisedYear = publisedYear;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Book{" + "id=" + id + ", caption=" + caption + ", author=" + author + ", publisedYear=" + publisedYear + ", cover=" + cover + ", text=" + text + ", date=" + date + ", active=" + active + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.id);
        hash = 59 * hash + Objects.hashCode(this.caption);
        hash = 59 * hash + Objects.hashCode(this.author);
        hash = 59 * hash + this.publisedYear;
        hash = 59 * hash + Objects.hashCode(this.cover);
        hash = 59 * hash + Objects.hashCode(this.text);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Book other = (Book) obj;
        if (this.publisedYear != other.publisedYear) {
            return false;
        }
        if (!Objects.equals(this.caption, other.caption)) {
            return false;
        }
        if (!Objects.equals(this.author, other.author)) {
            return false;
        }
        if (!Objects.equals(this.cover, other.cover)) {
            return false;
        }
        if (!Objects.equals(this.text, other.text)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

   
    
}
