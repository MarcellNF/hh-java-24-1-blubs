package de.neuefische.backend.cat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CatControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    @WithMockUser
    void getCatById() throws Exception {
        CatDto catDto = new CatDto("Minka", "white");

        // CatDto wird in JSON umgewandelt
        String catDtoJson = objectMapper.writeValueAsString(catDto);

        // Katze wird in Datenbank gespeichert
        MvcResult result = mockMvc.perform(post("/api/cats")
                        .contentType("application/json")
                        .content(catDtoJson))
                .andExpect(status().isCreated())
                .andReturn();

        // Katze wird von JSON in Java-Objekt umgewandelt
        Cat actual = objectMapper.readValue(result.getResponse().getContentAsString(), Cat.class);
        String actualJson = objectMapper.writeValueAsString(actual);

        // Katze wird aus Datenbank abgerufen
        mockMvc.perform(get("/api/cats/" + actual.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json(actualJson));
    }

    @Test
    @DirtiesContext
    void getCatById_whenCatNotFound() throws Exception {
        mockMvc.perform(get("/api/cats/1"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Cat with id 1 not found"));
    }
}
