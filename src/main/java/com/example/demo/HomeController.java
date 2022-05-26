package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping("/")
    @ResponseBody
    public String index() {
        return "Hello World!";
    }

    @RequestMapping("/example")
    public String custom() {
        return "custom";
    }

//    @RequestMapping("/test/{name}-{age}")
//    @ResponseBody
//
//    public String index() {
//        @privateVariable String name,
//        return "Hello World!";
//    }


}