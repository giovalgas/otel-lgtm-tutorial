package br.dev.giovalgas.worker.v1.user.client;

import br.dev.giovalgas.worker.v1.user._model.dto.RandomUserMeDto;
import org.jetbrains.annotations.NotNull;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "randomUserClient", url = "https://randomuser.me")
public interface RandomUserMeClient {

    @NotNull
    @GetMapping("/api/")
    RandomUserMeDto getRandomUsers(@RequestParam(name = "results", defaultValue = "1") int results);
}
