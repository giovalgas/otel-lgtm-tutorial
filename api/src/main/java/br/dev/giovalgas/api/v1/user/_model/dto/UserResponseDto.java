package br.dev.giovalgas.api.v1.user._model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;

@Data
@Schema(description = "DTO para resposta de informações de usuário")
public class UserResponseDto {
    @NotNull
    @Schema(description = "Identificador único do usuário", example = "1")
    private Long id;

    @NotNull
    @Schema(description = "Primeiro nome do usuário", example = "João")
    private String firstName;

    @NotNull
    @Schema(description = "Sobrenome do usuário", example = "Silva")
    private String lastName;

    @NotNull
    @Schema(description = "Idade do usuário", example = "30")
    private Short age;

    @NotNull
    @Schema(description = "Endereço completo do usuário", example = "Rua das Flores, 123, São Paulo - SP")
    private String fullAddress;

    @NotNull
    @Schema(description = "Data de nascimento do usuário", example = "1993-05-15")
    private LocalDate birthday;
}
