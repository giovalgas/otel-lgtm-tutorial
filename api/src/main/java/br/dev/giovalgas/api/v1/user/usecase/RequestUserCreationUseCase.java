package br.dev.giovalgas.api.v1.user.usecase;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.api.v1.user._model.dto.UserCreationRequestDto;
import br.dev.giovalgas.api.v1.user.producer.SQSUserProducer;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
public class RequestUserCreationUseCase {
    @NotNull
    private final SQSUserProducer sqsUserProducer;

    public void execute(@NotNull final UserCreationRequestDto requestDto) {
        IntStream
            .range(0, requestDto.getRepeat())
            .forEach(i -> sqsUserProducer.sendMessage(
                    UserCreationMessageDto
                            .builder()
                            .userAmount(requestDto.getUserAmount())
                            .build()));
    }
}
