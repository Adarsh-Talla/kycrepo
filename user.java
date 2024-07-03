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
///randommm stuff

//code starts here
package com.socgen.application.dto;

import com.socgen.application.model.KycStatus;
import com.socgen.application.model.KycType;

public class KycDTO {

    private Long id;
    private String userId;
    private KycType kycType;
    private KycStatus kycStatus;
    private String documentDetails;

    public KycDTO() {}

    public KycDTO(Long id, String userId, KycType kycType, KycStatus kycStatus, String documentDetails) {
        this.id = id;
        this.userId = userId;
        this.kycType = kycType;
        this.kycStatus = kycStatus;
        this.documentDetails = documentDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public KycType getKycType() {
        return kycType;
    }

    public void setKycType(KycType kycType) {
        this.kycType = kycType;
    }

    public KycStatus getKycStatus() {
        return kycStatus;
    }

    public void setKycStatus(KycStatus kycStatus) {
        this.kycStatus = kycStatus;
    }

    public String getDocumentDetails() {
        return documentDetails;
    }

    public void setDocumentDetails(String documentDetails) {
        this.documentDetails = documentDetails;
    }
}


package com.socgen.application.service;

import com.socgen.application.dto.KycDTO;

import java.util.List;

public interface KycService {
    KycDTO saveKyc(KycDTO kycDTO);
    KycDTO updateKyc(KycDTO kycDTO);
    void deleteKyc(Long id);
    KycDTO getKycById(Long id);
    List<KycDTO> getAllKycs();
}



package com.socgen.application.service.impl;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.model.Kyc;
import com.socgen.application.repository.KycRepository;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KycServiceImpl implements KycService {

    private final KycRepository kycRepository;

    @Autowired
    public KycServiceImpl(KycRepository kycRepository) {
        this.kycRepository = kycRepository;
    }

    @Override
    public KycDTO saveKyc(KycDTO kycDTO) {
        Kyc kyc = new Kyc(kycDTO.getUserId(), kycDTO.getKycType(), kycDTO.getKycStatus(), kycDTO.getDocumentDetails());
        return mapToDTO(kycRepository.save(kyc));
    }

    @Override
    public KycDTO updateKyc(KycDTO kycDTO) {
        Kyc kyc = kycRepository.findById(kycDTO.getId()).orElseThrow(() -> new RuntimeException("KYC not found"));
        kyc.setKycType(kycDTO.getKycType());
        kyc.setKycStatus(kycDTO.getKycStatus());
        kyc.setDocumentDetails(kycDTO.getDocumentDetails());
        return mapToDTO(kycRepository.save(kyc));
    }

    @Override
    public void deleteKyc(Long id) {
        kycRepository.deleteById(id);
    }

    @Override
    public KycDTO getKycById(Long id) {
        Kyc kyc = kycRepository.findById(id).orElseThrow(() -> new RuntimeException("KYC not found"));
        return mapToDTO(kyc);
    }

    @Override
    public List<KycDTO> getAllKycs() {
        return kycRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private KycDTO mapToDTO(Kyc kyc) {
        return new KycDTO(kyc.getId(), kyc.getUserId(), kyc.getKycType(), kyc.getKycStatus(), kyc.getDocumentDetails());
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


package com.socgen.application.model;

import javax.persistence.*;

@Entity
public class Kyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId; // The ID of the user who submitted this KYC

    @Enumerated(EnumType.STRING)
    private KycType kycType;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    private String documentDetails;

    public Kyc() {}

    public Kyc(String userId, KycType kycType, KycStatus kycStatus, String documentDetails) {
        this.userId = userId;
        this.kycType = kycType;
        this.kycStatus = kycStatus;
        this.documentDetails = documentDetails;
    }

    // getters and setters
}

package com.socgen.application.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .anyRequest().permitAll(); // Disable all security restrictions
    }
}

package com.socgen.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests.anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/ignore1", "/ignore2"); // Adjust paths as needed
    }
}


