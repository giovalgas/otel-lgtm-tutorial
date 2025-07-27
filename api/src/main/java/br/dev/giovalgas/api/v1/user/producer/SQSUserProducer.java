package br.dev.giovalgas.api.v1.user.producer;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import io.awspring.cloud.sqs.operations.SqsTemplate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SQSUserProducer {
    @NotNull
    private final SqsTemplate sqsTemplate;
    @Value("${spring.cloud.aws.sqs.queue-name}")
    private String queueName;

    public void sendMessage(@NotNull final UserCreationMessageDto message) {
        log.info("Enviando mensagem fila no SQS: {}, com quantidade: {}", queueName, message.userAmount());
        sqsTemplate.sendAsync(to -> {
            to.queue(queueName);
            to.payload(message);
        });
    }
}
