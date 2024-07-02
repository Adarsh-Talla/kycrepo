package com.socgen.application.model;

public enum KycType {
    PASSPORT,
    DRIVER_LICENSE,
    ID_CARD
}


package com.socgen.application.model;

public enum KycStatus {
    PENDING,
    APPROVED,
    REJECTED
}

package com.socgen.application.model;

import javax.persistence.*;

@Entity
public class Kyc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private KycType kycType;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    private String documentDetails;

    public Kyc() {}

    public Kyc(KycType kycType, KycStatus kycStatus, String documentDetails) {
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



package com.socgen.application.dto;

import com.socgen.application.model.KycStatus;
import com.socgen.application.model.KycType;

public class KycDTO {

    private Long id;
    private KycType kycType;
    private KycStatus kycStatus;
    private String documentDetails;

    public KycDTO() {}

    public KycDTO(Long id, KycType kycType, KycStatus kycStatus, String documentDetails) {
        this.id = id;
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



package com.socgen.application.repository;

import com.socgen.application.model.Kyc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KycRepository extends JpaRepository<Kyc, Long> {
}


package com.socgen.application.service;

import com.socgen.application.dto.KycDTO;
import java.util.List;

public interface KycService {
    KycDTO saveKyc(KycDTO kycDTO);
    KycDTO updateKyc(KycDTO kycDTO);
    void deleteKyc(Long id);
    List<KycDTO> getAllKycs();
    KycDTO getKycById(Long id);
}


package com.socgen.application.service.impl;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.model.Kyc;
import com.socgen.application.repository.KycRepository;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class KycServiceImpl implements KycService {

    private final KycRepository kycRepository;

    @Autowired
    public KycServiceImpl(KycRepository kycRepository) {
        this.kycRepository = kycRepository;
    }

    @Override
    public KycDTO saveKyc(KycDTO kycDTO) {
        Kyc kyc = new Kyc(kycDTO.getKycType(), kycDTO.getKycStatus(), kycDTO.getDocumentDetails());
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
    public List<KycDTO> getAllKycs() {
        return kycRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public KycDTO getKycById(Long id) {
        return kycRepository.findById(id).map(this::mapToDTO).orElseThrow(() -> new RuntimeException("KYC not found"));
    }

    private KycDTO mapToDTO(Kyc kyc) {
        return new KycDTO(kyc.getId(), kyc.getKycType(), kyc.getKycStatus(), kyc.getDocumentDetails());
    }
}


package com.socgen.application.controller;

import com.socgen.application.dto.KycDTO;
import com.socgen.application.service.KycService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<KycDTO> createKyc(@RequestBody KycDTO kycDTO) {
        return ResponseEntity.ok(kycService.saveKyc(kycDTO));
    }

    @PutMapping
    public ResponseEntity<KycDTO> updateKyc(@RequestBody KycDTO kycDTO) {
        return ResponseEntity.ok(kycService.updateKyc(kycDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKyc(@PathVariable Long id) {
        kycService.deleteKyc(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<KycDTO>> getAllKycs() {
        return ResponseEntity.ok(kycService.getAllKycs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<KycDTO> getKycById(@PathVariable Long id) {
        return ResponseEntity.ok(kycService.getKycById(id));
    }
}
