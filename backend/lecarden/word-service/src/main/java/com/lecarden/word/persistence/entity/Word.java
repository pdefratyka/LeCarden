package com.lecarden.word.persistence.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_WORD")
public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "TRANSLATION", nullable = false, length = 50)
    private String translation;

    @Column(name = "PLURAL", length = 50)
    private String plural;

    @Column(name = "CATEGORY", length = 50)
    private String category;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "IMAGE_URL")
    private String imageUrl;

    @Column(name = "AUDIO_URL")
    private String audioUrl;

    @Column(name = "EXAMPLE")
    private String example;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "LANGUAGE_ID", insertable = false, updatable = false)
    @JsonBackReference
    private Language language;

    @Column(name = "LANGUAGE_ID")
    private Long languageId;

    @Column(name = "BUILT_IN")
    private Boolean builtIn;

    @Column(name = "CREATE_DATE")
    private LocalDateTime createDate;

    @Column(name = "UPDATE_DATE")
    private LocalDateTime updateDate;

    @PrePersist
    public void createDate() {
        this.createDate = LocalDateTime.now();
        this.updateDate = createDate;
    }

    @PreUpdate
    public void updateDate() {
        this.updateDate = LocalDateTime.now();
    }
}
