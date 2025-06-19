package br.dev.giovalgas.api.v1.user;

import br.dev.giovalgas.api.v1.user._model.dto.UserCreationRequestDto;
import br.dev.giovalgas.api.v1.user._model.dto.UserResponseDto;
import br.dev.giovalgas.api.v1.user.usecase.FindAllUsersUseCase;
import br.dev.giovalgas.api.v1.user.usecase.RequestUserCreationUseCase;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserResource {
    @NotNull
    private final FindAllUsersUseCase findAllUsersUseCase;
    @NotNull
    private final RequestUserCreationUseCase requestUserCreationUseCase;

    @GetMapping
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(@NotNull @PageableDefault(20) final Pageable pageable) {
        return ResponseEntity.ok(findAllUsersUseCase.execute(pageable));
    }

    @PostMapping
    public ResponseEntity<Void> requestUserCreation(@NotNull @RequestBody final UserCreationRequestDto requestDto) {
        requestUserCreationUseCase.execute(requestDto);
        return ResponseEntity.accepted().build();
    }
}
