//kyc controller test
package com.socgen.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socgen.application.dto.KycDTO;
import com.socgen.application.service.KycService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(KycController.class)
public class KycControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private KycService kycService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllKycs() throws Exception {
        KycDTO kycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        Mockito.when(kycService.getAllKycs()).thenReturn(Collections.singletonList(kycDTO));

        mockMvc.perform(get("/api/kyc/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].customerName").value("John Doe"));
    }

    @Test
    public void testGetKycById() throws Exception {
        KycDTO kycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        Mockito.when(kycService.getKycById(1L)).thenReturn(Optional.of(kycDTO));

        mockMvc.perform(get("/api/kyc/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customerName").value("John Doe"));
    }

    @Test
    public void testCreateKyc() throws Exception {
        KycDTO kycDTO = new KycDTO(null, "John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        KycDTO savedKycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        Mockito.when(kycService.createKyc(Mockito.any(KycDTO.class))).thenReturn(savedKycDTO);

        mockMvc.perform(post("/api/kyc/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(kycDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    public void testUpdateKyc() throws Exception {
        KycDTO kycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        KycDTO updatedKycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        Mockito.when(kycService.updateKyc(1L, kycDTO)).thenReturn(updatedKycDTO);

        mockMvc.perform(put("/api/kyc/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(kycDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Approved"));
    }

    @Test
    public void testDeleteKyc() throws Exception {
        mockMvc.perform(delete("/api/kyc/delete/1"))
                .andExpect(status().isNoContent());
    }
}


//service test

package com.socgen.application.service;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.model.Kyc;
import com.socgen.application.repository.KycRepository;
import com.socgen.application.service.impl.KycServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class KycServiceTest {

    @Autowired
    private KycServiceImpl kycService;

    @MockBean
    private KycRepository kycRepository;

    @Test
    public void testGetAllKycs() {
        Kyc kyc = new Kyc("John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        Mockito.when(kycRepository.findAll()).thenReturn(Collections.singletonList(kyc));

        assertFalse(kycService.getAllKycs().isEmpty());
    }

    @Test
    public void testGetKycById() {
        Kyc kyc = new Kyc("John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        Mockito.when(kycRepository.findById(1L)).thenReturn(Optional.of(kyc));

        Optional<KycDTO> kycDTO = kycService.getKycById(1L);
        assertTrue(kycDTO.isPresent());
        assertEquals("John Doe", kycDTO.get().getCustomerName());
    }

    @Test
    public void testCreateKyc() {
        Kyc kyc = new Kyc("John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        Mockito.when(kycRepository.save(Mockito.any(Kyc.class))).thenReturn(kyc);

        KycDTO kycDTO = new KycDTO(null, "John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        KycDTO savedKycDTO = kycService.createKyc(kycDTO);
        assertNotNull(savedKycDTO);
        assertEquals("John Doe", savedKycDTO.getCustomerName());
    }

    @Test
    public void testUpdateKyc() {
        Kyc kyc = new Kyc("John Doe", "123 Main St", "Passport", "A1234567", "Pending");
        Mockito.when(kycRepository.findById(1L)).thenReturn(Optional.of(kyc));
        Mockito.when(kycRepository.save(Mockito.any(Kyc.class))).thenReturn(kyc);

        KycDTO kycDTO = new KycDTO(1L, "John Doe", "123 Main St", "Passport", "A1234567", "Approved");
        KycDTO updatedKycDTO = kycService.updateKyc(1L, kycDTO);
        assertNotNull(updatedKycDTO);
        assertEquals("Approved", updatedKycDTO.getStatus());
    }

    @Test
    public void testDeleteKyc() {
        kycService.deleteKyc(1L);
        Mockito.verify(kycRepository, Mockito.times(1)).deleteById
    }}


///user controller test


package com.socgen.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socgen.application.dto.RoleDTO;
import com.socgen.application.dto.UserDTO;
import com.socgen.application.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
        import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegisterUser() throws Exception {
        UserDTO userDTO = new UserDTO(null, "johndoe", "password", Collections.emptySet());
        UserDTO savedUserDTO = new UserDTO(1L, "johndoe", "password", Collections.emptySet());
        Mockito.when(userService.saveUser(Mockito.any(UserDTO.class))).thenReturn(savedUserDTO);

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    public void testAddRole() throws Exception {
        RoleDTO roleDTO = new RoleDTO(null, "ROLE_ADMIN");

        mockMvc.perform(post("/api/user/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(roleDTO)))
                .andExpect(status().isOk());
    }

    @Test
    public void testAddRoleToUser() throws Exception {
        mockMvc.perform(post("/api/user/role-to-user")
                        .param("username", "johndoe")
                        .param("roleName", "ROLE_ADMIN"))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginUser() throws Exception {
        UserDTO userDTO = new UserDTO(null, "johndoe", "password", Collections.emptySet());
        UserDTO storedUserDTO = new UserDTO(1L, "johndoe", "$2a$10$7QX/5iG9l8g/F1NmUNlvG.m3qxXJ0otz9ZnGuUbUOeJ/OT3Qd5p1G", Collections.emptySet()); // encrypted password

        Mockito.when(userService.findByUsername("johndoe")).thenReturn(Optional.of(storedUserDTO));
        Mockito.when(passwordEncoder.matches("password", storedUserDTO.getPassword())).thenReturn(true);

        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }
}


//user service test

package com.socgen.application.service;

import com.socgen.application.dto.RoleDTO;
import com.socgen.application.dto.UserDTO;
import com.socgen.application.model.Role;
import com.socgen.application.model.User;
import com.socgen.application.repository.RoleRepository;
import com.socgen.application.repository.UserRepository;
import com.socgen.application.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private RoleRepository roleRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    public void testFindByUsername() {
        User user = new User("johndoe", "password", Collections.emptySet());
        Mockito.when(userRepository.findByUsername("johndoe")).thenReturn(Optional.of(user));

        Optional<UserDTO> userDTO = userService.findByUsername("johndoe");
        assertTrue(userDTO.isPresent());
        assertEquals("johndoe", userDTO.get().getUsername());
    }

    @Test
    public void testSaveUser() {
        User user = new User("johndoe", "password", Collections.emptySet());
        Mockito.when(passwordEncoder.encode("password")).thenReturn("encryptedPassword");
        Mockito.when(userRepository.save(Mockito.any(User.class))).thenReturn(user);

        UserDTO userDTO = new UserDTO(null, "johndoe", "password", Collections.emptySet());
        UserDTO savedUserDTO = userService.saveUser(userDTO);
        assertNotNull(savedUserDTO);
        assertEquals("johndoe", savedUserDTO.getUsername());
    }

    @Test
    public void testSaveRole() {
        Role role = new Role("ROLE_ADMIN");
        Mockito.when(roleRepository.save(Mockito.any(Role.class))).thenReturn(role);

        RoleDTO roleDTO = new RoleDTO(null, "ROLE_ADMIN");
        userService.saveRole(roleDTO);
        Mockito.verify(roleRepository, Mockito.times(1)).save(Mockito.any(Role.class));
    }

    @Test
    public void testAddRoleToUser() {
        User user = new User("johndoe", "password", Collections.emptySet());
        Role role = new Role("ROLE_ADMIN");
        Mockito.when(userRepository.findByUsername("johndoe")).thenReturn(Optional.of(user));
        Mockito.when(roleRepository.findByName("ROLE_ADMIN")).thenReturn(Optional.of(role));

        userService.addRoleToUser("johndoe", "ROLE_ADMIN");

        assertTrue(user.getRoles().contains(role));
    }
}


