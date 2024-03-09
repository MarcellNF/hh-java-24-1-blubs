package de.neuefische.backend.cat;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatRepository extends MongoRepository<Cat, String> {
}
