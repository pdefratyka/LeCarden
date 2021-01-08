package com.lecarden.word.persistence.repository;

import com.lecarden.word.persistence.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Long> {
}
