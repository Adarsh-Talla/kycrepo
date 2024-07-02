package com.socgen.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Kyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String address;
    private String documentType;
    private String documentNumber;
    private String status;

    // Constructors, getters, and setters

    public Kyc() {}

    public Kyc(String customerName, String address, String documentType, String documentNumber, String status) {
        this.customerName = customerName;
        this.address = address;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


//repository

package com.socgen.application.repository;

import com.socgen.application.model.Kyc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KycRepository extends JpaRepository<Kyc, Long> {
    // Custom query methods can be defined here if needed
}


//dto
src
└── main
    └── java
        └── com
            └── socgen
                └── application
                    └── dto
                        └── KycDTO.java
package com.socgen.application.dto;

public class KycDTO {

    private Long id;
    private String customerName;
    private String address;
    private String documentType;
    private String documentNumber;
    private String status;

    // Constructors, getters, and setters

    public KycDTO() {}

    public KycDTO(Long id, String customerName, String address, String documentType, String documentNumber, String status) {
        this.id = id;
        this.customerName = customerName;
        this.address = address;
        this.documentType = documentType;
        this.documentNumber = documentNumber;
        this.status = status;
    }

    // Getters and setters omitted for brevity
}
//service
package com.socgen.application.service;

import com.socgen.application.dto.KycDTO;

import java.util.List;
import java.util.Optional;

public interface KycService {
    List<KycDTO> getAllKycs();
    Optional<KycDTO> getKycById(Long id);
    KycDTO createKyc(KycDTO kycDTO);
    KycDTO updateKyc(Long id, KycDTO kycDTO);
    void deleteKyc(Long id);
}


//serviceImpl
package com.socgen.application.service.impl;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.model.Kyc;
import com.socgen.application.repository.KycRepository;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class KycServiceImpl implements KycService {

    @Autowired
    private KycRepository kycRepository;

    @Override
    public List<KycDTO> getAllKycs() {
        return kycRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<KycDTO> getKycById(Long id) {
        return kycRepository.findById(id).map(this::convertEntityToDto);
    }

    @Override
    public KycDTO createKyc(KycDTO kycDTO) {
        Kyc kyc = convertDtoToEntity(kycDTO);
        Kyc savedKyc = kycRepository.save(kyc);
        return convertEntityToDto(savedKyc);
    }

    @Override
    public KycDTO updateKyc(Long id, KycDTO kycDTO) {
        Optional<Kyc> optionalKyc = kycRepository.findById(id);
        if (optionalKyc.isPresent()) {
            Kyc kyc = optionalKyc.get();
            kyc.setCustomerName(kycDTO.getCustomerName());
            kyc.setAddress(kycDTO.getAddress());
            kyc.setDocumentType(kycDTO.getDocumentType());
            kyc.setDocumentNumber(kycDTO.getDocumentNumber());
            kyc.setStatus(kycDTO.getStatus());
            Kyc updatedKyc = kycRepository.save(kyc);
            return convertEntityToDto(updatedKyc);
        }
        return null;
    }

    @Override
    public void deleteKyc(Long id) {
        kycRepository.deleteById(id);
    }

    private KycDTO convertEntityToDto(Kyc kyc) {
        return new KycDTO(kyc.getId(), kyc.getCustomerName(), kyc.getAddress(),
                kyc.getDocumentType(), kyc.getDocumentNumber(), kyc.getStatus());
    }

    private Kyc convertDtoToEntity(KycDTO kycDTO) {
        return new Kyc(kycDTO.getCustomerName(), kycDTO.getAddress(),
                kycDTO.getDocumentType(), kycDTO.getDocumentNumber(), kycDTO.getStatus());
    }
}

//controller
package com.socgen.application.controller;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kyc")
public class KycController {

    @Autowired
    private KycService kycService;

    @GetMapping("/all")
    public List<KycDTO> getAllKycs() {
        return kycService.getAllKycs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<KycDTO> getKycById(@PathVariable Long id) {
        Optional<KycDTO> kyc = kycService.getKycById(id);
        return kyc.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public KycDTO createKyc(@RequestBody KycDTO kycDTO) {
        return kycService.createKyc(kycDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<KycDTO> updateKyc(@PathVariable Long id, @RequestBody KycDTO kycDTO) {
        KycDTO updatedKyc = kycService.updateKyc(id, kycDTO);
        return updatedKyc != null ? ResponseEntity.ok(updatedKyc) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteKyc(@PathVariable Long id) {
        kycService.deleteKyc(id);
        return ResponseEntity.noContent().build();
    }
}



