package br.dev.giovalgas.api.v1.user.mapper;

import br.dev.giovalgas.api.v1.user._model.dto.UserResponseDto;
import br.dev.giovalgas.api.v1.user._model.entity.UserEntity;
import org.jetbrains.annotations.NotNull;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @NotNull
    UserResponseDto toUserDto(@NotNull final UserEntity entity);
}
