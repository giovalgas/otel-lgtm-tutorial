package br.dev.giovalgas.api.v1.user._model.dto;

import lombok.Builder;
import org.jetbrains.annotations.NotNull;

@Builder
public record UserCreationMessageDto (@NotNull Integer userAmount) { }
