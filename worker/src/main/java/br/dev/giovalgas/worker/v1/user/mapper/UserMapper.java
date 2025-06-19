package br.dev.giovalgas.worker.v1.user.mapper;

import br.dev.giovalgas.worker.v1.user._model.dto.RandomUserMeDto;
import br.dev.giovalgas.worker.v1.user._model.entity.UserEntity;
import org.jetbrains.annotations.NotNull;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @NotNull
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "firstName", source = "name.first")
    @Mapping(target = "lastName", source = "name.last")
    @Mapping(target = "age", source = "dob.age")
    @Mapping(target = "birthday", source = "dob.date")
    @Mapping(target = "fullAddress", source = "location", qualifiedByName = "toFullAddress")
    UserEntity toEntity(@NotNull final RandomUserMeDto.Result dto);

    @Named("toFullAddress")
    default String toFullAddress(RandomUserMeDto.Location location) {
        return String.format("%d %s, %s, %s, %s, %s",
                location.getStreet().getNumber(),
                location.getStreet().getName(),
                location.getCity(),
                location.getState(),
                location.getCountry(),
                location.getPostcode());
    }
}
