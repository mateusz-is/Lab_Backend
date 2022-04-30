package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    private final Map<Integer, UserEntity> users;
    private final ObjectMapper objectMapper;

    public UserController()
    {
        users = new HashMap<>();
        users.put(0,new UserEntity("Franciszek", 20));
        users.put(1,new UserEntity("Ewa", 23));
        users.put(1,new UserEntity("Adam", 18));
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
        return ("User: "+id+" removed!");
    }
    @RequestMapping("/users/add")
    @ResponseBody
    public String addUser (@RequestParam(name="name") String name, @RequestParam(name="age") int age) throws JsonProcessingException {
        users.put(users.size(), new UserEntity(name,age));
        UserEntity user = users.get(users.size()-1);
        return objectMapper.writeValueAsString(user);
    }
}
