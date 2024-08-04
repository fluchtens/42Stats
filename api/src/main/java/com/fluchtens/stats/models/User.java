package com.fluchtens.stats.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class User {
  @Id
  private int id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false, unique = true)
  private String login;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column(nullable = true)
  private String image;

  @Column(nullable = false)
  private String poolMonth;

  @Column(nullable = false)
  private String poolYear;

  @Column(nullable = false)
  private double level;

  @Column(nullable = false)
  private boolean blackholed;

  @ManyToOne()
  @JoinColumn(nullable = false)
  private Campus campus;

  public User() {}

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getLogin() {
    return this.login;
  }

  public void setLogin(String login) {
    this.login = login;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getImage() {
    return this.image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getPoolMonth() {
    return this.poolMonth;
  }

  public void setPoolMonth(String poolMonth) {
    this.poolMonth = poolMonth;
  }

  public String getPoolYear() {
    return this.poolYear;
  }

  public void setPoolYear(String poolYear) {
    this.poolYear = poolYear;
  }

  public double getLevel() {
    return this.level;
  }

  public void setLevel(double level) {
    this.level = level;
  }

  public boolean getBlackholed() {
    return this.blackholed;
  }

  public void setBlackholed(boolean blackholed) {
    this.blackholed = blackholed;
  }

  public Campus getCampus() {
    return this.campus;
  }

  public void setCampus(Campus campus) {
    this.campus = campus;
  }

  public boolean isValid() {
    if (this.email == null || this.email.isEmpty())
      return false;
    else if (this.login == null || this.login.isEmpty())
      return false;
    else if (this.firstName == null || this.firstName.isEmpty())
      return false;
    else if (this.lastName == null || this.lastName.isEmpty())
      return false;
    else if (this.poolMonth == null || this.poolMonth.isEmpty())
      return false;
    else if (this.poolYear == null || this.poolYear.isEmpty())
      return false;
    return true;
  }
}
