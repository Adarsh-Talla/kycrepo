//controller
package com.socgen.application.controller;

import com.socgen.application.dto.UserDTO;
import com.socgen.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        UserDTO savedUser = userService.saveUser(userDTO);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/role")
    public ResponseEntity<Void> addRole(@RequestBody RoleDTO roleDTO) {
        userService.saveRole(roleDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/role-to-user")
    public ResponseEntity<Void> addRoleToUser(@RequestParam String username, @RequestParam String roleName) {
        userService.addRoleToUser(username, roleName);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userDTO) {
        Optional<UserDTO> user = userService.findByUsername(userDTO.getUsername());
        if (user.isPresent() && passwordEncoder.matches(userDTO.getPassword(), user.get().getPassword())) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(401).build();
    }
}

//userserviceImpl

package com.socgen.application.service.impl;

import com.socgen.application.dto.RoleDTO;
import com.socgen.application.dto.UserDTO;
import com.socgen.application.model.Role;
import com.socgen.application.model.User;
import com.socgen.application.repository.RoleRepository;
import com.socgen.application.repository.UserRepository;
import com.socgen.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Optional<UserDTO> findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(this::convertEntityToDto);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = convertDtoToEntity(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return convertEntityToDto(savedUser);
    }

    @Override
    public void saveRole(RoleDTO roleDTO) {
        Role role = new Role(roleDTO.getName());
        roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        Optional<User> user = userRepository.findByUsername(username);
        Optional<Role> role = roleRepository.findByName(roleName);
        if (user.isPresent() && role.isPresent()) {
            user.get().getRoles().add(role.get());
            userRepository.save(user.get());
        }
    }

    private UserDTO convertEntityToDto(User user) {
        Set<RoleDTO> roles = user.getRoles().stream()
                .map(role -> new RoleDTO(role.getId(), role.getName()))
                .collect(Collectors.toSet());
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), roles);
    }

    private User convertDtoToEntity(UserDTO userDTO) {
        Set<Role> roles = userDTO.getRoles().stream()
                .map(roleDTO -> new Role(roleDTO.getName()))
                .collect(Collectors.toSet());
        return new User(userDTO.getUsername(), userDTO.getPassword(), roles);
    }
}


//userservice
package com.socgen.application.service;

import com.socgen.application.dto.UserDTO;

import java.util.Optional;

public interface UserService {
    Optional<UserDTO> findByUsername(String username);
    UserDTO saveUser(UserDTO userDTO);
    void saveRole(RoleDTO roleDTO);
    void addRoleToUser(String username, String roleName);
}

//rolerepo
package com.socgen.application.repository;

import com.socgen.application.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
//userrepo
package com.socgen.application.repository;

import com.socgen.application.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
//user.java
package com.socgen.application.model;

import javax.persistence.*;
        import java.util.Set;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    // Constructors, getters, and setters

    public User() {}

    public User(String username, String password, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // Getters and setters omitted for brevity
}
//role java

package com.socgen.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Constructors, getters, and setters

    public Role() {}

    public Role(String name) {
        this.name = name;
    }

    // Getters and setters omitted for brevity
}


//userDTO

package com.socgen.application.dto;

import java.util.Set;

public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private Set<RoleDTO> roles;

    // Constructors, getters, and setters

    public UserDTO() {}

    public UserDTO(Long id, String username, String password, Set<RoleDTO> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // Getters and setters omitted for brevity
}


//role DTO

package com.socgen.application.dto;

public class RoleDTO {

    private Long id;
    private String name;

    // Constructors, getters, and setters

    public RoleDTO() {}

    public RoleDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters and setters omitted for brevity
}
