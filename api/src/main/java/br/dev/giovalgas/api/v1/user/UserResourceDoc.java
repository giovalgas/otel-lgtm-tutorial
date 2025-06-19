package br.dev.giovalgas.api.v1.user;

import br.dev.giovalgas.api.v1.user._model.dto.UserCreationRequestDto;
import br.dev.giovalgas.api.v1.user._model.dto.UserResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Usuários", description = "API para gerenciamento de usuários")
public interface UserResourceDoc {

    @Operation(
            summary = "Listar todos os usuários",
            description = "Retorna uma lista paginada de todos os usuários cadastrados no sistema",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de usuários retornada com sucesso",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Page.class)
                            )
                    )
            }
    )
    ResponseEntity<Page<UserResponseDto>> getAllUsers(
            @Parameter(description = "Informações de paginação (página, tamanho, ordenação)")
            @NotNull Pageable pageable
    );

    @Operation(
            summary = "Solicitar criação de usuários",
            description = "Solicita a criação de uma quantidade específica de usuários. " +
                    "O processo de criação é assíncrono e será processado em segundo plano.",
            responses = {
                    @ApiResponse(
                            responseCode = "202",
                            description = "Solicitação de criação de usuários aceita"
                    )
            }
    )
    ResponseEntity<Void> requestUserCreation(
            @Parameter(
                    description = "Dados para criação de usuários",
                    required = true,
                    schema = @Schema(implementation = UserCreationRequestDto.class)
            )
            @NotNull @RequestBody UserCreationRequestDto requestDto
    );
}