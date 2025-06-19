package br.dev.giovalgas.api.v1.user.producer;

import br.dev.giovalgas.api.v1.user._model.dto.UserCreationMessageDto;
import io.awspring.cloud.sqs.operations.SqsTemplate;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SQSUserProducer {
    @NotNull
    private final SqsTemplate sqsTemplate;
    @Value("${spring.cloud.aws.sqs.queue-name}")
    private String queueName;

    public void sendMessage(@NotNull final UserCreationMessageDto messageDto) {
        sqsTemplate.send(to -> {
            to.queue(queueName);
            to.payload(messageDto);
        });
    }
}
