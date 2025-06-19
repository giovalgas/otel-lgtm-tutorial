package br.dev.giovalgas.api.v1.user.usecase;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.api.v1.user._model.dto.UserCreationRequestDto;
import br.dev.giovalgas.api.v1.user.producer.SQSUserProducer;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RequestUserCreationUseCase {
    @NotNull
    private final SQSUserProducer sqsUserProducer;

    public void execute(@NotNull final UserCreationRequestDto requestDto) {
        sqsUserProducer.sendMessage(
                UserCreationMessageDto
                        .builder()
                        .userAmount(requestDto.getUserAmount())
                        .build());
    }
}
