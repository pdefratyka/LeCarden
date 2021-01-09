package com.lecarden.result.persistence.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lecarden.result.persistence.constants.LearningMode;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "T_RESULT")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "PACKET_ID")
    private Long packetId;

    @Column(name = "SCORE")
    private Long score;

    @Column(name = "DATE")
    private LocalDateTime date;

    @Column(name = "LEARNING_MODE")
    private LearningMode learningMode;

    @OneToMany(mappedBy = "result", cascade = {CascadeType.REFRESH})
    @JsonManagedReference
    private List<WordResult> words;

    @PrePersist
    public void createDate() {
        this.date = LocalDateTime.now();
    }
}
