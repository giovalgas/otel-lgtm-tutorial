package br.dev.giovalgas.api.v1.user.usecase;

import br.dev.giovalgas.api.v1.user._model.dto.UserResponseDto;
import br.dev.giovalgas.api.v1.user.mapper.UserMapper;
import br.dev.giovalgas.api.v1.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FindAllUsersUseCase {
    @NotNull
    private final UserRepository userRepository;
    @NotNull
    private final UserMapper userMapper;

    @NotNull
    @Transactional
    public Page<UserResponseDto> execute(@NotNull final Pageable pageable) {
        return userRepository
                .findAll(pageable)
                .map(userMapper::toUserDto);
    }
}
