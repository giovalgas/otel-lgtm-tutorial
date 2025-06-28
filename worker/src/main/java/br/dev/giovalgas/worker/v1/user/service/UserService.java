package br.dev.giovalgas.worker.v1.user.service;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user._model.dto.RandomUserMeDto;
import br.dev.giovalgas.worker.v1.user.client.RandomUserMeClient;
import dev.failsafe.Failsafe;
import dev.failsafe.RetryPolicy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    @NotNull
    private RandomUserMeClient randomUserMeClient;

    public RandomUserMeDto getRandomUsers(@NotNull final UserCreationMessageDto payload) {
        final RetryPolicy<ResponseEntity<RandomUserMeDto>> retryPolicy = RetryPolicy.<ResponseEntity<RandomUserMeDto>>builder()
                .handleResultIf(result -> !result.getStatusCode().is2xxSuccessful() ||
                                result.getBody() == null ||
                                result.getBody().getResults().length < payload.userAmount())
                .withBackoff(Duration.ofMillis(500), Duration.ofSeconds(5), 2.0)
                .withMaxRetries(3)
                .onRetry(e -> log.warn("Tentando consultar API novamente..."))
                .onFailure(e -> log.error("Todas as tentativas falharam.", e.getException()))
                .onSuccess(e -> log.info("API Consultada com sucesso!"))
                .build();

        return Failsafe.with(retryPolicy)
                .get(() -> {
                    log.info("Chamando a API de usuarios aleatorios...");
                    return randomUserMeClient.getRandomUsers(payload.userAmount());
                }).getBody();
    }

}
