package de.neuefische.backend.cat;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class CatServiceTest {
    private final CatRepository catRepository = mock(CatRepository.class);
    private final CatService catService = new CatService(catRepository);

    @Test
    void getAllCats() {
        // GIVEN
        List<Cat> expected = List.of();
        // WHEN
        when(catRepository.findAll()).thenReturn(expected);
        List<Cat> actual = catService.getAllCats();
        // THEN
        verify(catRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllCats_whenCatsInDb() {
        // GIVEN
        List<Cat> expected = List.of(
                new Cat("1", "Mink", "black"),
                new Cat("2", "Minka", "white")
        );
        // WHEN
        when(catRepository.findAll()).thenReturn(expected);
        List<Cat> actual = catService.getAllCats();
        // THEN
        verify(catRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getCatById_whenCatFound() {
        // GIVEN
        String id = "1";
        Cat expected = new Cat("1", "Mink", "black");
        // WHEN
        when(catRepository.findById(id)).thenReturn(Optional.of(expected));
        Cat actual = catService.getCatById(id);
        // THEN
        verify(catRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void getCatById_whenCatNotFound() {
        // GIVEN
        String id = "1";
        // THEN
        assertThrows(CatNotFoundException.class, () -> catService.getCatById(id));
    }

    @Test
    void saveCat() {
        // GIVEN
        CatDto catDto = new CatDto("Mink", "black");
        Cat expected = new Cat("1", "Mink", "black");
        // WHEN
        when(catRepository.save(any(Cat.class))).thenReturn(expected);
        Cat actual = catService.saveCat(catDto);
        // THEN
        verify(catRepository).save(any(Cat.class));
        assertEquals(expected, actual);
    }

    @Test
    void updateCatById() {
        // GIVEN
        String id = "1";
        Cat cat = new Cat("1", "Mink", "black");
        CatDto catDto = new CatDto("Mink", "white");
        Cat expected = new Cat("1", "Mink", "white");
        // WHEN
        when(catRepository.findById("1")).thenReturn(Optional.of(cat));
        when(catRepository.save(any(Cat.class))).thenReturn(expected);
        Cat actual = catService.updateCatById(id, catDto);
        // THEN
        verify(catRepository).findById(id);
        verify(catRepository).save(any(Cat.class));
        assertEquals(expected, actual);
    }

    @Test
    void updateCatById_whenCatNotFound() {
        // GIVEN
        String id = "1";
        CatDto catDto = new CatDto("Mink", "white");
        // THEN
        assertThrows(CatNotFoundException.class, () -> catService.updateCatById(id, catDto));
    }

    @Test
    void deleteCatById() {
        // GIVEN
        String id = "1";
        Cat cat = new Cat("1", "Mink", "black");
        String expected = "Cat deleted successfully";
        // WHEN
        when(catRepository.findById(id)).thenReturn(Optional.of(cat));
        String actual = catService.deleteCatById(id);
        // THEN
        verify(catRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void deleteCatById_whenCatNotFound() {
        // GIVEN
        String id = "1";
        // THEN
        assertThrows(CatNotFoundException.class, () -> catService.deleteCatById(id));
    }
}