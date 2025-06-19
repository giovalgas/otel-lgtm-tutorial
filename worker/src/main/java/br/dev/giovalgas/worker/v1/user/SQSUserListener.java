package br.dev.giovalgas.worker.v1.user;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user.usecase.CreateUserUseCase;
import io.awspring.cloud.sqs.annotation.SqsListener;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

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
