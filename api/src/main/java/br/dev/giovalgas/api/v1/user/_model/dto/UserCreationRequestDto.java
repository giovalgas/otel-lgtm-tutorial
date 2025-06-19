package br.dev.giovalgas.api.v1.user._model.dto;

import jakarta.validation.constraints.Max;
import lombok.Data;
import org.jetbrains.annotations.NotNull;

@Data
public class UserCreationRequestDto {
    @NotNull
    @Max(value = 5000, message = "The max user creation amount is 5000")
    private Integer userAmount;
}
