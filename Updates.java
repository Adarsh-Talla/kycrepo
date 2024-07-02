package com.socgen.application.controller;

import com.socgen.application.dto.UserDTO;
import com.socgen.application.model.Role;
import com.socgen.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.saveUser(userDTO));
    }

    @PostMapping("/role-to-user")
    public ResponseEntity<Void> addRoleToUser(@RequestParam String username, @RequestParam Role role) {
        userService.addRoleToUser(username, role.name());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userDTO) {
        return userService.findByUsername(userDTO.getUsername())
                .filter(user -> userService.isPasswordMatch(userDTO.getPassword(), user.getPassword()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}


package com.socgen.application.controller;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/kyc")
public class KycController {

    private final KycService kycService;

    @Autowired
    public KycController(KycService kycService) {
        this.kycService = kycService;
    }

    // Create KYC (User)
    @PostMapping
    public ResponseEntity<KycDTO> createKyc(@RequestBody KycDTO kycDTO, Authentication authentication) {
        // Assuming the authenticated user is submitting their own KYC
        kycDTO.setUserId(authentication.getName()); // Set the userId from the authenticated user's name (or ID)
        return ResponseEntity.ok(kycService.saveKyc(kycDTO));
    }

    // Update KYC (Admin/User)
    @PutMapping
    public ResponseEntity<KycDTO> updateKyc(@RequestBody KycDTO kycDTO, Authentication authentication) {
        // Check if the user is admin or the owner of the KYC record
        if (isAdmin(authentication) || isOwner(authentication, kycDTO.getId())) {
            return ResponseEntity.ok(kycService.updateKyc(kycDTO));
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    // Delete KYC (Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKyc(@PathVariable Long id, Authentication authentication) {
        // Check if the user is admin
        if (isAdmin(authentication)) {
            kycService.deleteKyc(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    // Get KYC by ID (Admin/User)
    @GetMapping("/{id}")
    public ResponseEntity<KycDTO> getKycById(@PathVariable Long id, Authentication authentication) {
        // Check if the user is admin or the owner of the KYC record
        if (isAdmin(authentication) || isOwner(authentication, id)) {
            return ResponseEntity.ok(kycService.getKycById(id));
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    // Get all KYCs (Admin)
    @GetMapping
    public ResponseEntity<List<KycDTO>> getAllKycs(Authentication authentication) {
        // Check if the user is admin
        if (isAdmin(authentication)) {
            return ResponseEntity.ok(kycService.getAllKycs());
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    // Helper method to check if the authenticated user is an admin
    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    // Helper method to check if the authenticated user is the owner of the KYC record
    private boolean isOwner(Authentication authentication, Long kycId) {
        KycDTO kycDTO = kycService.getKycById(kycId);
        return kycDTO.getUserId().equals(authentication.getName()); // Compare with authenticated user's name (or ID)
    }
}



package com.socgen.application.service.impl;

import com.socgen.application.dto.UserDTO;
import com.socgen.application.model.Role;
import com.socgen.application.model.User;
import com.socgen.application.repository.UserRepository;
import com.socgen.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<UserDTO> findByUsername(String username) {
        return userRepository.findByUsername(username).map(this::mapToDTO);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User user = new User(userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()), userDTO.getRoles());
        return mapToDTO(userRepository.save(user));
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Role role = Role.valueOf(roleName);
        user.getRoles().add(role);
    }

    @Override
    public boolean isPasswordMatch(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    private UserDTO mapToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getRoles());
    }
}


package com.socgen.application.controller;

import com.socgen.application.dto.UserDTO;
import com.socgen.application.model.Role;
import com.socgen.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.saveUser(userDTO));
    }

    @PostMapping("/role-to-user")
    public ResponseEntity<Void> addRoleToUser(@RequestParam String username, @RequestParam Role role) {
        userService.addRoleToUser(username, role.name());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserDTO userDTO) {
        return userService.findByUsername(userDTO.getUsername())
                .filter(user -> userService.isPasswordMatch(userDTO.getPassword(), user.getPassword()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
