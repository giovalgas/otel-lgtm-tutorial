package br.dev.giovalgas.worker.v1.user;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user.usecase.CreateUserUseCase;
import io.awspring.cloud.sqs.annotation.SqsListener;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SQSUserListener {
    @NotNull
    private final CreateUserUseCase createUserUseCase;

    @SqsListener("${spring.cloud.aws.sqs.queue-name}")
    public void listen(@NotNull final UserCreationMessageDto payload) {
        createUserUseCase.execute(payload);
    }
}
