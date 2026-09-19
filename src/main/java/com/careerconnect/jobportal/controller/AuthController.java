package com.careerconnect.jobportal.controller;
import com.careerconnect.jobportal.model.*; import com.careerconnect.jobportal.repository.*; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.stereotype.Controller; import org.springframework.ui.Model; import org.springframework.web.bind.annotation.*;
@Controller public class AuthController { private final PortalUserRepository users; private final JobSeekerProfileRepository profiles; private final PasswordEncoder encoder; public AuthController(PortalUserRepository u,JobSeekerProfileRepository p,PasswordEncoder e){users=u;profiles=p;encoder=e;}
 @GetMapping("/login") public String login(){return "login";} @GetMapping("/register") public String register(){return "register";}
 @PostMapping("/register") public String register(@RequestParam String fullName,@RequestParam String username,@RequestParam String email,@RequestParam String password,@RequestParam String confirmPassword,Model m){
  if(fullName.isBlank()||username.isBlank()||email.isBlank()||password.isBlank()||confirmPassword.isBlank()){m.addAttribute("error","Please fill in every field.");return "register";}
  if(!username.matches("[A-Za-z0-9_]{3,20}")){m.addAttribute("error","Username must contain 3–20 letters, numbers, or underscores.");return "register";}
  if(!email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")){m.addAttribute("error","Please enter a valid email address.");return "register";}
  if(password.length()<6){m.addAttribute("error","Password must contain at least 6 characters.");return "register";}
  if(!password.equals(confirmPassword)){m.addAttribute("error","Password and Confirm Password do not match.");return "register";}
  if(users.existsByUsername(username)||users.existsByEmail(email)){m.addAttribute("error","That username or email is already registered.");return "register";}
  PortalUser u=new PortalUser();u.setFullName(fullName.trim());u.setUsername(username.trim());u.setEmail(email.trim());u.setPassword(encoder.encode(password));u.setRole(Role.SEEKER);users.save(u);JobSeekerProfile p=new JobSeekerProfile();p.setUser(u);profiles.save(p);return "redirect:/login?registered";
 }}
