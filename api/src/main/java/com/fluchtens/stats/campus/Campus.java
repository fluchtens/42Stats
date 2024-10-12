package com.fluchtens.stats.campus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Campus {
  @Id
  private int id;

  @Column(nullable = false, unique = true)
  private String name;

  @Column(nullable = false)
  private String country;

  @Column(nullable = false)
  private int userCount;

  @Column(nullable = false)
  private int studentCount;

  @Column(nullable = false)
  private double averageLevel;

  public Campus() {}

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCountry() {
    return this.country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public int getUserCount() {
    return this.userCount;
  }

  public void setUserCount(int userCount) {
    this.userCount = userCount;
  }

  public int getStudentCount() {
    return this.studentCount;
  }

  public void setStudentCount(int studentCount) {
    this.studentCount = studentCount;
  }

  public double getAverageLevel() {
    return this.averageLevel;
  }

  public void setAverageLevel(double averageLevel) {
    this.averageLevel = averageLevel;
  }
}
