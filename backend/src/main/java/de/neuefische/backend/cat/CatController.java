package de.neuefische.backend.cat;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cats")
@RequiredArgsConstructor
public class CatController {
    private final CatService catService;

    @GetMapping
    public List<Cat> getAllCats() {
        return catService.getAllCats();
    }

    @GetMapping("/{id}")
    public Cat getCatById(@PathVariable String id) {
        return catService.getCatById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cat saveCat(@RequestBody CatDto catDto) {
        return catService.saveCat(catDto);
    }

    @PutMapping("/{id}")
    public Cat updateCatById(@PathVariable String id, @RequestBody CatDto catDto) {
        return catService.updateCatById(id, catDto);
    }

    @DeleteMapping("/{id}")
    public String deleteCatById(@PathVariable String id) {
        return catService.deleteCatById(id);
    }

    @ExceptionHandler(CatNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleCatNotFoundException(CatNotFoundException exception) {
        return exception.getMessage();
    }
}
