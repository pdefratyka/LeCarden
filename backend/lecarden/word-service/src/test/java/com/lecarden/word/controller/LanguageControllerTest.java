package com.lecarden.word.controller;

import com.lecarden.word.persistence.to.LanguageTO;
import com.lecarden.word.service.LanguageService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class LanguageControllerTest {

    private static final String LANGUAGE_BASE_URL = "/languages";
    private LanguageService languageServiceMock;
    private MockMvc mockMvc;

    @Before
    public void setup() {
        languageServiceMock = Mockito.mock(LanguageService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new LanguageController(languageServiceMock)).build();
    }

    @Test
    public void shouldReturnAllLanguages() throws Exception {
        // given
        final String foreignLanguage = "EN";
        final String knownLanguage = "PL";
        final Long id = 1L;
        List<LanguageTO> languageTO = List.of(new LanguageTO(id, foreignLanguage, knownLanguage));
        when(languageServiceMock.getAllLanguages()).thenReturn(languageTO);
        // when
        ResultActions resultActions = mockMvc.perform(get(LANGUAGE_BASE_URL));
        // then
        resultActions.andDo(print())//
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].foreignLanguage", is(foreignLanguage)))
                .andExpect(jsonPath("$[0].knownLanguage", is(knownLanguage)))
                .andExpect(jsonPath("$[0].id", is(id.intValue())));
    }
}
