package br.dev.giovalgas.worker.v1.user.usecase;

import br.dev.giovalgas.messaging._model.dto.UserCreationMessageDto;
import br.dev.giovalgas.worker.v1.user._model.dto.RandomUserMeDto;
import br.dev.giovalgas.worker.v1.user._model.entity.UserEntity;
import br.dev.giovalgas.worker.v1.user.mapper.UserMapper;
import br.dev.giovalgas.worker.v1.user.repository.UserRepository;
import br.dev.giovalgas.worker.v1.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class CreateUserUseCase {
    @NotNull
    private final UserRepository userRepository;
    @NotNull
    private final UserMapper userMapper;
    @NotNull
    private final UserService userService;

    @Transactional
    public void execute(@NotNull final UserCreationMessageDto payload) {
        final RandomUserMeDto response = userService.getRandomUsers(payload);
        final List<UserEntity> entities = Arrays.stream(response
                .getResults())
                .map(userMapper::toEntity)
                .toList();

        userRepository.saveAllAndFlush(entities);
        log.info("Usuarios salvos no banco de dados com sucesso!");
    }
}
