package br.dev.giovalgas.api.v1.user._model.dto;

import lombok.Data;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;

@Data
public class UserResponseDto {
    @NotNull
    private Long id;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private Short age;
    @NotNull
    private String fullAdress;
    @NotNull
    private LocalDate birthday;
}
