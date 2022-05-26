package com.example.demo;

public class UserEntity {
    public int Id;
    public String Name;
    public int Age;


    public UserEntity(String name, int age) {
        Name=name;
        Age=age;
    }
    public UserEntity(String name, int age,int id) {
        Id = id;
        Name = name;
        Age = age;
    }
}
