package de.neuefische.backend.cat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatService {
    private final CatRepository catRepository;

    public List<Cat> getAllCats() {
        return catRepository.findAll();
    }

    public Cat getCatById(String id) {
        return catRepository
                .findById(id)
                .orElseThrow(() -> new CatNotFoundException("Cat with id " + id + " not found"));
    }

    public Cat saveCat(CatDto catDto) {
        Cat cat = new Cat(null, catDto.name(), catDto.color());
        return catRepository.save(cat);
    }

    public Cat updateCatById(String id, CatDto catDto) {
        Cat cat = getCatById(id);
        cat.setName(catDto.name());
        cat.setColor(catDto.color());
        return catRepository.save(cat);
    }

    public String deleteCatById(String id){
        Cat cat = getCatById(id);
        catRepository.delete(cat);
        return "Cat deleted successfully";
    }
}
