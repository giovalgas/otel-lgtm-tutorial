package br.dev.giovalgas.worker.v1.user;

import br.dev.giovalgas.worker.v1.user._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user.usecase.CreateUserUseCase;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.awspring.cloud.sqs.annotation.SqsListener;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SQSUserListener {
    @NotNull
    private final CreateUserUseCase createUserUseCase;
    @NotNull
    private final ObjectMapper objectMapper;

    @SqsListener("${spring.cloud.aws.sqs.queue-name}")
    public void listen(@NotNull final String payload) throws JsonProcessingException {
        final UserCreationMessageDto userCreationMessageDto = objectMapper.readValue(payload, UserCreationMessageDto.class);
        createUserUseCase.execute(userCreationMessageDto);
    }
}
