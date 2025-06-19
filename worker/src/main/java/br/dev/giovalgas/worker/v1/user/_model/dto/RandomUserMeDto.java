package br.dev.giovalgas.worker.v1.user._model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RandomUserMeDto {
    @NotNull
    private Result[] results;

    @Data
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Result {
        @NotNull
        private Name name;
        @NotNull
        private Dob dob;
        @NotNull
        private Location location;
    }

    @Data
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Name {
        @NotNull
        private String first;
        @NotNull
        private String last;
    }

    @Data
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Dob {
        @NotNull
        private LocalDate date;
        @NotNull
        private Integer age;
    }

    @Data
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Location {
        @NotNull
        private Street street;
        @NotNull
        private String city;
        @NotNull
        private String state;
        @NotNull
        private String country;
        @NotNull
        private String postcode;
   }

    @Data
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Street {
        @NotNull
        private Integer number;
        @NotNull
        private String name;
    }
}
