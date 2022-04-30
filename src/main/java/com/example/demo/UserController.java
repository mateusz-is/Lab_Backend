package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    private final Map<Integer, UserEntity> users;
    private final ObjectMapper objectMapper;
    @Autowired
    private UserService userService;

    public UserController()
    {
        users = new HashMap<>();
        users.put(0,new UserEntity("Adam", 22, 0));
        users.put(1,new UserEntity("Ewa", 23,1));
        users.put(1,new UserEntity("Józef", 40,1));
        objectMapper = new ObjectMapper();
    }
    @RequestMapping("/users")
    @ResponseBody
    public String users() throws JsonProcessingException {
        return objectMapper.writeValueAsString(users);
    }


    @RequestMapping("/users/{id}/get")
    @ResponseBody
    public String user (@PathVariable int id) throws JsonProcessingException {
        return objectMapper.writeValueAsString(users.get(id));
    }
    @RequestMapping("/users/{id}/remove")
    public String deleteUser (@PathVariable int id) {
        users.remove(id);
        return ("User "+id+" removed!");
    }
    @RequestMapping("/users/add")
    public String addUser (@RequestParam(name="name") String name, @RequestParam(name="age") int age) {
        users.put(users.size(), new UserEntity(name,age));
        return String.format("User %s with age %d created", name, age);
    }

    @RequestMapping("/api/users")
    @ResponseBody
    public UsersPage apiUsers (@RequestParam(name="page-number", defaultValue="1") Integer pageNumber,
                               @RequestParam(name="page-size", defaultValue = "20") Integer pageSize)
    {
        return userService.getUsers(pageNumber, pageSize, users);
    }

    @RequestMapping(
            value = "/api/user/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public UserEntity createUser(@RequestBody UserEntity user) {

        return userService.createUser(users, user);
    }

    @RequestMapping("/api/users/{id}")
    @ResponseBody
    public UserEntity getUserById (@PathVariable int id) {
        return userService.getUser(users,id);
    }

    @RequestMapping(
            value = "/api/users/{id}/update",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseBody
    public UserEntity updateUser(@RequestBody UserEntity user, @PathVariable int id) {

        return userService.updateUser(users, user, id);
    }

    @RequestMapping("/api/users/{id}/remove")
    @ResponseBody
    public HttpStatus removeUserById (@PathVariable int id) {
        return userService.removeUser(users,id);
    }
}