package br.dev.giovalgas.api.v1.user.repository;

import br.dev.giovalgas.api.v1.user._model.entity.UserEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @NotNull
    @Query("select u from UserEntity u order by u.birthday desc")
    Page<UserEntity> findAll(@NotNull final Pageable pageable);
}
