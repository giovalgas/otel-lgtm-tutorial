package br.dev.giovalgas.worker.v1.user.repository;

import br.dev.giovalgas.worker.v1.user._model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
