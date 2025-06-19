package br.dev.giovalgas.messaging._model.dto;

import lombok.Builder;
import org.jetbrains.annotations.NotNull;

@Builder
public record UserCreationMessageDto(@NotNull Integer userAmount) { }
