package br.dev.giovalgas.api.v1.user._model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
@Schema(description = "DTO para solicitação de criação de usuários")
public class UserCreationRequestDto {
    @NotNull
    @Max(value = 5000, message = "The max user creation amount is 5000")
    @Schema(description = "Quantidade de usuários a serem criados", example = "10", minimum = "1", maximum = "5000")
    private Integer userAmount;
}
