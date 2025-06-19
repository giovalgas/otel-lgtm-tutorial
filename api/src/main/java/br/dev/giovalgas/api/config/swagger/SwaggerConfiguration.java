package br.dev.giovalgas.api.config.swagger;

import org.jetbrains.annotations.NotNull;
import org.springdoc.core.properties.SwaggerUiConfigProperties;
import org.springdoc.core.properties.SwaggerUiOAuthProperties;
import org.springdoc.core.providers.ObjectMapperProvider;
import org.springdoc.webmvc.ui.SwaggerIndexTransformer;
import org.springdoc.webmvc.ui.SwaggerWelcomeCommon;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Bean
    @NotNull
    public SwaggerIndexTransformer swaggerIndexTransformer(
            @NotNull final SwaggerUiConfigProperties swaggerUiConfig,
            @NotNull final SwaggerUiOAuthProperties swaggerUiOAuthProperties,
            @NotNull final SwaggerWelcomeCommon swaggerWelcomeCommon,
            @NotNull final ObjectMapperProvider objectMapperProvider) {

        return new SwaggerCustomCssInjector(swaggerUiConfig, swaggerUiOAuthProperties, swaggerWelcomeCommon, objectMapperProvider);
    }
}
