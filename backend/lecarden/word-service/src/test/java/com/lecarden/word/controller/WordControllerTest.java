package com.lecarden.word.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.lecarden.word.common.exception.PageNumberException;
import com.lecarden.word.persistence.to.WordTO;
import com.lecarden.word.service.WordService;
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

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class WordControllerTest {

    private static final String WORD_BASE_URL = "/words";
    private WordService wordServiceMock;
    private MockMvc mockMvc;

    @Before
    public void setup() {
        wordServiceMock = Mockito.mock(WordService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new WordController(wordServiceMock)).build();
    }

    @Test
    public void shouldReturnWordsAccessibleForGivenUser() throws Exception {
        // given
        final Long userId = 1L;
        final String query = "query";
        final int pageNo = 1;
        final String url = WORD_BASE_URL + "/user-id/" + userId + "?query=" + query + "&page=" + pageNo;
        final List<WordTO> words = List.of(new WordTO());
        when(wordServiceMock.getWordsAccessibleForGivenUser(eq(userId), eq(query), eq(pageNo))).thenReturn(words);
        // when
        ResultActions resultActions = mockMvc.perform(get(url));
        // then
        resultActions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void shouldReturnBadRequestForGetAllWordsWhenPageIsSmallerThanOne() throws Exception {
        // given
        final Long userId = 1L;
        final String query = "query";
        final int pageNo = -1;
        final String url = WORD_BASE_URL + "/user-id/" + userId + "?query=" + query + "&page=" + pageNo;
        when(wordServiceMock.getWordsAccessibleForGivenUser(eq(userId), eq(query), eq(pageNo)))
                .thenThrow(new PageNumberException());
        // when
        ResultActions resultActions = mockMvc.perform(get(url));
        // then
        resultActions.andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnCategoriesForGivenUser() throws Exception {
        // given
        final Long userId = 1L;
        final String url = WORD_BASE_URL + "/user-id/" + userId + "/categories";
        final String[] categoriesArray = {"a", "b"};
        final List<String> categories = Arrays.asList(categoriesArray);
        when(wordServiceMock.getCategoriesByUserId(eq(userId))).thenReturn(categories);
        // when
        ResultActions resultActions = mockMvc.perform(get(url));
        // then
        resultActions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0]", is(categoriesArray[0])))
                .andExpect(jsonPath("$[1]", is(categoriesArray[1])));
    }

    @Test
    public void shouldReturnWordsFromGivenPacket() throws Exception {
        // given
        final Long packetId = 1L;
        final String url = WORD_BASE_URL + "/packet-id/" + packetId;
        final List<WordTO> words = List.of(getExampleOfWordTo());
        when(wordServiceMock.getWordsFromPacket(eq(packetId))).thenReturn(words);
        // when
        ResultActions resultActions = mockMvc.perform(get(url));
        // then
        resultActions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name", is(words.get(0).getName())))
                .andExpect(jsonPath("$[0].translation", is(words.get(0).getTranslation())))
                .andExpect(jsonPath("$[0].example", is(words.get(0).getExample())));
    }

    @Test
    public void shouldSaveWord() throws Exception {
        // given
        final WordTO wordTO = getExampleOfWordTo();
        when(wordServiceMock.saveWord(any())).thenReturn(wordTO);
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(wordTO);
        // when
        ResultActions resultActions = mockMvc.perform(post(WORD_BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("utf-8")
                .content(requestJson));
        // then
        resultActions.andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("name", is(wordTO.getName())))
                .andExpect(jsonPath("translation", is(wordTO.getTranslation())))
                .andExpect(jsonPath("example", is(wordTO.getExample())));
    }

    private WordTO getExampleOfWordTo() {
        return WordTO.builder()
                .id(1L)
                .name("name")
                .translation("translation")
                .languageId(1L)
                .example("example")
                .build();
    }
}
