package br.dev.giovalgas.worker.v1.user.usecase;

import br.dev.giovalgas.worker.v1.user._model.dto.RandomUserMeDto;
import br.dev.giovalgas.worker.v1.user._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user._model.entity.UserEntity;
import br.dev.giovalgas.worker.v1.user.client.RandomUserMeClient;
import br.dev.giovalgas.worker.v1.user.mapper.UserMapper;
import br.dev.giovalgas.worker.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CreateUserUseCase {
    @NotNull
    private final RandomUserMeClient randomUserMeClient;
    @NotNull
    private final UserRepository userRepository;
    @NotNull
    private final UserMapper userMapper;

    @Transactional
    public void execute(@NotNull final UserCreationMessageDto payload) {
        final List<UserEntity> entities = Arrays.stream(randomUserMeClient
                .getRandomUsers(payload.userAmount())
                .getResults())
                .map(userMapper::toEntity)
                .toList();

        userRepository.saveAllAndFlush(entities);
    }
}
